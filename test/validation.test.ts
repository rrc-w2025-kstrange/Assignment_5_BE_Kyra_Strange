import { eventSchemas } from "../src/api/v1/validation/eventsSchemas";

describe("Event Validation Schema", () => {
    
    // Test 1: Valid Data (Using a date in 2027 to pass the "greater than now" rule)
    it("should validate a perfectly formatted event object", () => {
        // Arrange
        const validEvent = { 
            name: "Concert", 
            date: "2027-12-31T20:00:00Z", 
            capacity: 100 
        };
        
        // Act 
        const { error } = eventSchemas.create.body.validate(validEvent);
        
        // Assert
        expect(error).toBeUndefined();
    });

    // Test 2: Invalid Date Format
    it("should return an error if the date is not a valid ISO string", () => {
        // Arrange
        const invalidDate = { 
            name: "Concert", 
            date: "31-12-2024", 
            capacity: 100 
        };
        
        // Act
        const { error } = eventSchemas.create.body.validate(invalidDate);
        
        // Assert
        expect(error).toBeDefined();
        expect(error?.message).toContain("ISO 8601");
    });

    // Test 3: Missing Required Fields
    it("should return an error if name is missing", () => {
        // Arrange
        const missingName = { 
            date: "2027-12-31T20:00:00Z", 
            capacity: 100 
        };
        
        // Act
        const { error } = eventSchemas.create.body.validate(missingName);
        
        // Assert
        expect(error).toBeDefined();
        expect(error?.details[0].path).toContain("name");
    });

    // Test 4: Capacity Limit 
    it("should return an error if capacity is negative", () => {
        // Arrange
        const negativeCapacity = { 
            name: "Workshop", 
            date: "2027-05-01T10:00:00Z", 
            capacity: -1 
        };
        
        // Act
        const { error } = eventSchemas.create.body.validate(negativeCapacity);
        
        // Assert
        expect(error).toBeDefined();
    });
});