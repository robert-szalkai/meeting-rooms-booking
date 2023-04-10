export interface Room {
    id: number;
    title: string;
    description: string;
    lastBooked?: string;
    capacity?: number;
}
