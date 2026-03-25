import Joi from "joi";

// Events operation schemas organized by request part
export const eventSchemas = {
    // POST /event - Create new event
    create: {
        body: Joi.object({
            name: Joi.string().min(3).required().messages({
                "any.required": 'Validation error: "name" is required',
                "string.empty": 'Validation error: "name" cannot be empty',
                "string.min": 'Validation error: "name" length must be at least 3 characters long',
            }),
            date: Joi.date().iso().min("2025-12-25T09:00:00.000Z").required().messages({
                "any.required": 'Validation error: "date" is required',
                "string.isoDate": 'Validation error: "date" must be a valid ISO date',
                "date.min": 'Validation error: "date" must be greater than "now"',
            }),
            capacity: Joi.number().integer().min(5).required().messages({
                "any.required": 'Validation error: "capacity" is required',
                "number.base": 'Validation error: "capacity" must be a number',
                "number.integer": 'Validation error: "capacity" must be an integer',
                "number.min": 'Validation error: "capacity" must be greater than or equal to 5',
            }),
            registrationCount: Joi.number().integer().min(0).default(0).max(Joi.ref('capacity')).messages({
                "number.max": 'Validation error: "registrationCount" must be less than or equal to ref:capacity',
            }),
            status: Joi.string().valid("active", "cancelled", "completed").default("active").messages({
                "any.only": 'Validation error: "status" must be one of [active, cancelled, completed]',
            }),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").default("general").messages({
                "any.only": 'Validation error: "category" must be one of [conference, workshop, meetup, seminar, general]',
            }),
        }),
    },

    // GET /event/:id - Get single event
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": 'Validation error: "id" is required',
            }),
        }),
    },

    // PUT /event/:id - Update event
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": 'Validation error: "id" is required',
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(3).optional(),
            date: Joi.string().isoDate().optional(),
            capacity: Joi.number().integer().min(5).optional(),
            status: Joi.string().valid("active", "cancelled", "completed").optional(),
            category: Joi.string().valid("conference", "workshop", "meetup", "seminar", "general").optional(),
        }).min(1),
    },

    // DELETE /event/:id - Delete event
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": 'Validation error: "id" is required',
            }),
        }),
    },

    // GET /event - List events with filtering
    list: {
        query: Joi.object({
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(10),
            category: Joi.string().optional(),
            status: Joi.string().optional(),
            sortBy: Joi.string().valid("createdAt", "date", "name").default("createdAt"),
            sortOrder: Joi.string().valid("asc", "desc").default("desc"),
        }),
    },
};