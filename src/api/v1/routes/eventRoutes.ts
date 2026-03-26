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
 *     description: Retrieve a list of all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             example:
 *               [
 *                 {
 *                   id: "1",
 *                   name: "Concert",
 *                   date: "2026-04-01",
 *                   location: "Winnipeg"
 *                 }
 *               ]
 *       500:
 *         description: Server error
 */
router.get('/', getAllEvents);
router.get('/:id', validateRequest(eventSchemas.getById), getEventById);
router.put('/:id', validateRequest(eventSchemas.update), updateEvent);
router.delete('/:id', validateRequest(eventSchemas.delete), deleteEvent);

export default router;
