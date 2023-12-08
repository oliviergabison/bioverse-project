const { createPool, sql } = require("@vercel/postgres");
import { TicketPayload, TicketReplyPayload, TicketStatus } from "../types";
require("dotenv").config();


const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
  });


export function submitNewTicketQuery(ticketPayload: TicketPayload) {
    const { name, email, description } = ticketPayload;
    try {
        return pool.query("INSERT INTO tickets(name, email, description) VALUES($1, $2, $3)", [name, email, description]);
    } catch (error) {
        console.log(error);
    }
}

export async function getTicketsQuery() {
    try {
        const { rows } = await pool.query("SELECT * FROM tickets ORDER BY created_at DESC");
        return rows;
    } catch(error) {
        console.log(error);
    }
}

export function updateTicketStatusQuery(ticketId: number, newStatus: TicketStatus) {
    try {
        return pool.query("UPDATE tickets SET status = $1 WHERE id = $2", [newStatus, ticketId])
    } catch (error) {
        console.log(error);
    }
}

export function addTicketReplyQuery(ticketId: number, ticketReply: TicketReplyPayload) {
    try {
        return pool.query("INSERT INTO ticket_replies(ticket_id, content) VALUES($1, $2)", [ticketId, ticketReply.text]);
    } catch (error) {
        console.log(error);
    }
}

export async function getTicketRepliesQuery(ticketId: number) {
    try {
        const { rows } = await pool.query("SELECT * FROM ticket_replies WHERE ticket_id = $1 ORDER BY created_at ASC", [ticketId])
        return rows;
    } catch (error) {
        console.log(error);
    }
}