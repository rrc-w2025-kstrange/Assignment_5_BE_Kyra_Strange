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



router.post('/', validateRequest(eventSchemas.create), createEvent);
/**
 * @openapi
 * /api/v1/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Events retrieved"
 *               count: 2
 *               data:
 *                 - $ref: '#/components/schemas/Event'
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllEvents);
router.get('/:id', validateRequest(eventSchemas.getById), getEventById);
router.put('/:id', validateRequest(eventSchemas.update), updateEvent);
router.delete('/:id', validateRequest(eventSchemas.delete), deleteEvent);

export default router;
