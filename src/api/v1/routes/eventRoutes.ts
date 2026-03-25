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
router.get('/', getAllEvents);
router.get('/:id', validateRequest(eventSchemas.getById), getEventById);
router.put('/:id', validateRequest(eventSchemas.update), updateEvent);
router.delete('/:id', validateRequest(eventSchemas.delete), deleteEvent);

export default router;
