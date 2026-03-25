import { Request, Response } from "express";
import { getAllEventsService, getEventByIdService, createNewEvent, updateEventById, deleteEventById } from "../services/eventService";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import { EventCreateRequest } from "../models/eventCreateRequestModel";
import { EventDTO } from "../models/eventDTO";


export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await getAllEventsService();

        res.status(HTTP_STATUS.OK).json({
            message: "Events retrieved",
            count: events?.length || 0,
            data: events
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
            message: "Internal Server Error" 
        });
    }
}

export const getEventById = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        let results = await getEventByIdService(id);

        res.status(HTTP_STATUS.OK).json(successResponse(results, "Event retrieved"));
    } catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found"});
    }
}

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await createNewEvent(req.body as EventCreateRequest);

        res.status(HTTP_STATUS.CREATED).json({
            message: "Event created", 
            data: result            
        });
    } catch (error: any) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
            message: "Failed to create event" 
        });
    }
};

export const updateEvent = async (req: Request, res: Response): Promise<any> => {
    try {
        const id: string = req.params.id;
        const updateEvent = req.body;

        await updateEventById(id, updateEvent);

        const updatedResource = await getEventByIdService(id);

        if (!updatedResource) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
        }

        return res.status(HTTP_STATUS.OK).json(updatedResource);
        
    } catch (error: any) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Event not found" });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        let id: string = req.params.id;
        await deleteEventById(id); 
        
        res.status(HTTP_STATUS.OK).json({ message: `Entity ${id} was deleted` });
    } catch (error: any) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ 
            message: "Event not found" 
        });
    }
};