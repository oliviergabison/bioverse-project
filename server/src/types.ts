export interface TicketPayload {
    name: string;
    email: string;
    description: string;
}

export interface TicketStatusUpdate {
    id: number;
    status: TicketStatus;
}

export interface TicketReplyPayload {
    text: string;
}

export type TicketStatus = "new" | "in_progress" | "resolved";