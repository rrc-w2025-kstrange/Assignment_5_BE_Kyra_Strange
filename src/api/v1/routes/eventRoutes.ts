import { Router } from 'express';
import { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent
} from '../controllers/eventController';
import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventsSchemas";

const router: Router = Router();

/**
 * @openapi
 * /api/v1/events:
 *   post:
 *     summary: Create a new event
 *     description: Use this endpoint to add a new event with a name, date, capacity, and optional fields. Validation will check that all required fields are filled and meet the minimum requirements.
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - capacity
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Tech Conference"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-04-01T10:00:00Z"
 *               capacity:
 *                 type: integer
 *                 minimum: 5
 *                 example: 100
 *               registrationCount:
 *                 type: integer
 *                 minimum: 0
 *                 example: 0
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 example: "active"
 *               category:
 *                 type: string
 *                 enum: [conference, workshop, meetup, seminar, general]
 *                 example: "conference"
 *     responses:
 *       201:
 *         description: Event successfully created and returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event created"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation errors for missing or incorrect fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   oneOf:
 *                     - example: 'Validation error: "name" is required'
 *                     - example: 'Validation error: "name" cannot be empty'
 *                     - example: 'Validation error: "name" length must be at least 3 characters long'
 *                     - example: 'Validation error: "date" is required'
 *                     - example: 'Validation error: "date" must be a valid ISO date'
 *                     - example: 'Validation error: "date" must be greater than "now"'
 *                     - example: 'Validation error: "capacity" is required'
 *                     - example: 'Validation error: "capacity" must be a number'
 *                     - example: 'Validation error: "capacity" must be an integer'
 *                     - example: 'Validation error: "capacity" must be greater than or equal to 5'
 *                     - example: 'Validation error: "registrationCount" must be less than or equal to ref:capacity'
 *                     - example: 'Validation error: "status" must be one of [active, cancelled, completed]'
 *                     - example: 'Validation error: "category" must be one of [conference, workshop, meetup, seminar, general]'
 *       500:
 *         description: Something went wrong on the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to create event"
 */
router.post('/', validateRequest(eventSchemas.create), createEvent);

/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve a list of all events, including count and details. 
 *     tags:
 *       - Events
 *     responses:
 *       200:
 *         description: Successfully retrieved events list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Events retrieved"
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/', getAllEvents);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   get:
 *     summary: Get a single event by ID
 *     description: Retrieve a specific event using its unique ID. Returns event details if found, otherwise returns 404.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "evt_001"
 *         description: The unique ID of the event
 *     responses:
 *       200:
 *         description: Successfully retrieved the event
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found with the given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event not found"
 */
router.get('/:id', validateRequest(eventSchemas.getById), getEventById);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   put:
 *     summary: Update an existing event
 *     description: Update details of an existing event. You can change name, date, capacity, status, or category. At least one field is required in the request body.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "evt_001"
 *         description: The unique ID of the event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: "Updated Tech Conference"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-05-01T10:00:00Z"
 *               capacity:
 *                 type: integer
 *                 minimum: 5
 *                 example: 120
 *               status:
 *                 type: string
 *                 enum: [active, cancelled, completed]
 *                 example: "active"
 *               category:
 *                 type: string
 *                 enum: [conference, workshop, meetup, seminar, general]
 *                 example: "conference"
 *     responses:
 *       200:
 *         description: Event successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Validation errors for incorrect fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   oneOf:
 *                     - example: "\"name\" length must be at least 3 characters long"
 *                     - example: "\"date\" must be in iso format"
 *                     - example: "\"capacity\" must be a number"
 *                     - example: "\"capacity\" must be greater than or equal to 5"
 *                     - example: "\"status\" must be one of [active, cancelled, completed]"
 *                     - example: "\"category\" must be one of [conference, workshop, meetup, seminar, general]"
 *                     - example: "\"category\" must be one of [conference, workshop, meetup, seminar, general]"                  
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event not found"
 */
router.put('/:id', validateRequest(eventSchemas.update), updateEvent);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     description: Remove an event by its unique ID. Returns a confirmation message if deleted, otherwise returns 404.
 *     tags:
 *       - Events
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           example: "evt_001"
 *         description: The unique ID of the event
 *     responses:
 *       200:
 *         description: Event successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Entity evt_001 was deleted"
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event not found"
 */
router.delete('/:id', validateRequest(eventSchemas.delete), deleteEvent);

export default router;