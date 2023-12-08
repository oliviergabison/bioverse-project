export interface Ticket {
    name: string;
    email: string;
    description: string;
    status: string;
    created_at: string;
    id: number;
  }

  export type TicketStatus = "new" | "in_progress" | "resolved";