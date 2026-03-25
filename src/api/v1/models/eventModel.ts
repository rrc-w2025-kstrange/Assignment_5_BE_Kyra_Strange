export interface Event {
    id: string | undefined;
    name: string | undefined;
    date: Date | undefined; 
    capacity: number | undefined;
    registrationCount: number | undefined;
    status: string | undefined;
    category: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
}