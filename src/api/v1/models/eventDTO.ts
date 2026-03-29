/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - date
 *         - capacity
 *         - registrationCount
 *         - status
 *         - category
 *       properties:
 *         id:
 *           type: string
 *           example: "evt_001"
 *         name:
 *           type: string
 *           minLength: 3
 *           example: "Tech Conference"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-04-01T10:00:00Z"
 *         capacity:
 *           type: integer
 *           minimum: 5
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           example: 0
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: "active"
 *         category:
 *           type: string
 *           enum: [conference, workshop, meetup, seminar, general]
 *           example: "conference"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-29T12:30:00Z"
 */
export interface EventDTO {
    id: string;
    name: string;
    date: Date; 
    capacity: number;
    registrationCount: number;
    status: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}