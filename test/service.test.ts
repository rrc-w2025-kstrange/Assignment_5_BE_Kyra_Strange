import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { 
    createNewEvent, 
    getAllEventsService, 
    getEventByIdService, 
    updateEventById, 
    deleteEventById 
} from "../src/api/v1/services/eventService";

jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Event Service Functions", () => {

    // 1. Create 
    it("should correctly call the repository to create an event", async () => {
        const mockInput = { name: "Tech Talk", date: new Date("2027-10-10T10:00:00Z"), capacity: 50 };
        const mockSavedEvent = { id: "evt_000001", ...mockInput };
        (firestoreRepository.addEvent as jest.Mock).mockResolvedValue(mockSavedEvent);

        const result = await createNewEvent(mockInput);

        expect(result).toEqual(mockSavedEvent);
        expect(firestoreRepository.addEvent).toHaveBeenCalledWith(mockInput);
    });

    // 2. Get All
    it("should return an array of events from the repository", async () => {
        // Arrange
        const mockList = [{ id: "evt_1", name: "Event 1" }, { id: "evt_2", name: "Event 2" }];
        (firestoreRepository.getAllEvents as jest.Mock).mockResolvedValue(mockList);

        // Act
        const result = await getAllEventsService();

        // Assert
        expect(result).toEqual(mockList);
        expect(firestoreRepository.getAllEvents).toHaveBeenCalled();
    });

    // 3. Get By ID
    it("should return a single event when given a valid ID", async () => {
        // Arrange
        const mockEvent = { id: "evt_1", name: "Specific Event" };
        (firestoreRepository.getEventById as jest.Mock).mockResolvedValue(mockEvent);

        // Act
        const result = await getEventByIdService("evt_1");

        // Assert
        expect(result).toEqual(mockEvent);
        expect(firestoreRepository.getEventById).toHaveBeenCalledWith("evt_1");
    });

    // 4. Update
    it("should call the repository update with correct ID and data", async () => {
        // Arrange
        const updateData = { 
            name: "Updated Name",
            date: new Date("2027-10-10T10:00:00Z"),
            capacity: 100
        };
        (firestoreRepository.updateEvent as jest.Mock).mockResolvedValue(true);

        // Act
        await updateEventById("evt_1", updateData);

        // Assert
        expect(firestoreRepository.updateEvent).toHaveBeenCalledWith("evt_1", updateData);
    });

    // 5. Delete
    it("should call the repository delete with the correct ID", async () => {
        // Arrange
        (firestoreRepository.deleteEvent as jest.Mock).mockResolvedValue(true);

        // Act
        await deleteEventById("evt_1");

        // Assert
        expect(firestoreRepository.deleteEvent).toHaveBeenCalledWith("evt_1");
    });
});