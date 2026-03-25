import { Event } from "../models/eventModel";
import { addEvent, getEventById, getAllEvents, updateEvent, deleteEvent } from "../repositories/firestoreRepository";
import { validateRequest } from "../middleware/validate";
import { EventCreateRequest } from "../models/eventCreateRequestModel";
import { EventDTO } from "../models/eventDTO";


/**
 * Fetches all events from the database.
 * @returns An array of event data or undefined if none are found.
 */
export const getAllEventsService = async (): Promise<Array<EventDTO> | undefined> => {
    // Logic to process all items from the database
    return await getAllEvents();
};


/**
 * Finds a specific event by its unique ID.
 * @param id - The custom ID of the event (e.g., 'evt_000001').
 * @returns A formatted event object.
 */
export const getEventByIdService = async (id: string): Promise<Event> => {
    // Logic to process all items from the database
    let entity = await getEventById(id)
    return {
        id: entity?.id,
        name: entity?.name,
        date: entity?.date,
        capacity: entity?.capacity,
        registrationCount: entity?.registrationCount,
        status: entity?.status,
        category: entity?.category,
        createdAt: entity?.createdAt,
        updatedAt: entity?.updatedAt,
    }
};

/**
 * Creates a new event record in the database.
 * @param event - The data for the new event (name, date, capacity).
 * @returns The created event object including its generated ID.
 */
export const createNewEvent = async (event: EventCreateRequest): Promise<Event> => {
    return await addEvent(event);  
};

/**
 * Updates an existing event's information.
 * @param id - The ID of the event to change.
 * @param event - The new data to save.
 */
export const updateEventById = async (id: string, event: EventCreateRequest): Promise<void> => {
    // Logic to update an item in the database
    await updateEvent(id, event);
    return;
};

/**
 * Removes an event from the database.
 * First checks if the event exists, and throws an error if it doesn't.
 * @param id - The ID of the event to delete.
 * @throws Error - "Not Found" if the event ID is invalid.
 */
export const deleteEventById = async (id: string): Promise<void> => {
    const existing = await getEventById(id);
    
    if (!existing) {
        throw new Error("Not Found");
    }

    await deleteEvent(id);
};