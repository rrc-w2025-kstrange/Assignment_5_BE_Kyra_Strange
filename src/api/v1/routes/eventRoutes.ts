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
 *     summary: Retrieve all events
 *     tags:
 *       - Events
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
router.get('/', getAllEvents);
router.get('/:id', validateRequest(eventSchemas.getById), getEventById);
router.put('/:id', validateRequest(eventSchemas.update), updateEvent);
router.delete('/:id', validateRequest(eventSchemas.delete), deleteEvent);

export default router;
