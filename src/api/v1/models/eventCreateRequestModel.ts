export interface EventCreateRequest {
    name: string;
    date: Date; 
    capacity: number;
    registrationCount?: number;
    status?: string;
    category?: string;
}