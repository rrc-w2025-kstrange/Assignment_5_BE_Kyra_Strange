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
 *     description: Creates a new event with details such as name, date, and capacity. 
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
 *         description: Event created successfully
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
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Validation error: \"name\" cannot be empty"
 *       500:
 *         description: Failed to create event
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
 *     summary: Retrieve all events
 *     description: Retrieves a list of events. 
 *     tags:
 *       - Events
 *     parameters: 
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: "conference"
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           example: "active"
 *     responses:
 *       200:
 *         description: Events retrieved successfully
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
 *     summary: Retrieve a single event by ID
 *     description: Retrieves a specific event using its unique ID. 
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
 *         description: Event retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Event retrieved"
 *                 data:
 *                   $ref: '#/components/schemas/Event'
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
router.get('/:id', validateRequest(eventSchemas.getById), getEventById);

/**
 * @openapi
 * /api/v1/events/{id}:
 *   put:
 *     summary: Update an existing event
 *     description: Updates event details such as name, date, or capacity. 
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
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
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
 *     summary: Delete an existing event
 *     description: Deletes an event using its unique ID.
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
 *         description: Event deleted successfully
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