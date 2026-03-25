import { db } from "../../../config/firebaseConfig";
import { DocumentReference, QuerySnapshot } from "firebase-admin/firestore";
import { Event } from "../models/eventModel";
import { EventDTO } from "../models/eventDTO";
import { EventCreateRequest } from "../models/eventCreateRequestModel";

/**
 * Adds a new event to Firestore using a transaction to generate a custom ID.
 * The ID is based on a counter in the 'metadata' collection
 * * @param event - The event details provided by the service.
 * @returns A Promise that resolves to the fully created Event object.
 */
export const addEvent = async (event: EventCreateRequest): Promise<Event> => {
    const counterRef = db.collection("metadata").doc("eventCounter");
    const eventsCollection = db.collection("Events");
    
    return await db.runTransaction(async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        const currentCount = counterDoc.exists ? counterDoc.data()?.count : 0;
        const nextCount = currentCount + 1;
        const customId = `evt_${nextCount.toString().padStart(6, '0')}`;
        const docRef = eventsCollection.doc(customId);

        const eventEntity: Event = {
            id: customId,
            name: event.name,
            date: event.date,
            capacity: event.capacity,
            registrationCount: event.registrationCount || 0,
            status: event.status || "active",
            category: event.category || "general",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        transaction.set(docRef, eventEntity);
        transaction.set(counterRef, { count: nextCount });

        return eventEntity;
    });
};

/**
 * Retrieves a single event document by its Firestore document ID.
 * * @param id - The custom ID string 
 * @returns The Event data if found, otherwise undefined.
 */
export const getEventById = async (id: string): Promise<Event | undefined> => {
    const docRef: DocumentReference = db.collection("Events").doc(id);

    // Use the `get()` method to retrieve the document
    const doc = await docRef.get();

    // Check if the document exists
    if (doc.exists) {
        // `doc.data()` returns an object with all fields in the document
        let data = doc.data();

        return {
          id: doc.id,
          name: data!.name,
          date: typeof data!.date.toDate === 'function' ? data!.date.toDate().toISOString() : data!.date,
          capacity: data!.capacity,
          registrationCount: data!.registrationCount,
          status: data!.status,
          category: data!.category,
          createdAt: data!.createdAt.toDate().toISOString(),
          updatedAt: data!.updatedAt.toDate().toISOString(),
        } as Event;
      } else {
        console.log("No such document!");
    }
};

/**
 * Fetches all events from the 'Events' collection, ordered by creation date.
 * Includes a safety helper to handle different date formats in the database.
 * * @returns An array of Event Data Transfer Objects (DTOs).
 */
export const getAllEvents = async (): Promise<Array<EventDTO> | undefined> => {
    try {
        const snapshot: QuerySnapshot = await db.collection("Events").orderBy("createdAt", "asc").get();
        const events: EventDTO[] = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            
            const formatSafeDate = (dateAny: any) => {
                if (dateAny && typeof dateAny.toDate === 'function') {
                    return dateAny.toDate().toISOString();
                }
                return new Date(dateAny).toISOString();
            };

            events.push({
                id: doc.id,
                name: data.name,
                date: formatSafeDate(data.date), 
                capacity: data.capacity,
                registrationCount: data.registrationCount,
                status: data.status,
                category: data.category,
                createdAt: formatSafeDate(data.createdAt),
                updatedAt: formatSafeDate(data.updatedAt),
            });
        });

        return events;
    } catch (error) {
        console.error("Repository Error in getAllEvents:", error);
        return []; 
    }
};

/**
 * Updates an event document with new data and sets a new 'updatedAt' timestamp.
 * * @param id - The ID of the document to update.
 * @param event - The new field values.
 */
export const updateEvent = async (id: string, event: EventCreateRequest): Promise<void> => {
    const docRef: DocumentReference = db.collection("Events").doc(id);

    await docRef.update({
        name: event.name,
        date: event.date, 
        capacity: event.capacity,
        updatedAt: new Date(),
    });
    return;
};

/**
 * Deletes an event document permanently from the collection.
 * * @param id - The ID of the document to delete.
 */
export const deleteEvent = async (id: string): Promise<void> => {
    const docRef: DocumentReference = db.collection("Events").doc(id);

    // Use the `delete()` method to remove the document from Firestore
    await docRef.delete();
};