import { Request, Response } from "express";
import { TicketPayload, TicketStatusUpdate, TicketReplyPayload } from "../types";
import { submitNewTicketQuery, getTicketsQuery, updateTicketStatusQuery, addTicketReplyQuery, getTicketRepliesQuery } from '../queries/ticketQueries';


const submitTicket = (req: Request, res: Response) => {
    try {
        const ticketPayload: TicketPayload = req.body;

        submitNewTicketQuery(ticketPayload);

        res.json({ success: true, message: "Ticket submitted successfully!" });
    } catch (error) {
        res.json({success: false, message: "Failed to Create Ticket"})
    }
  };
  
const retrieveTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await getTicketsQuery();
        res.json(tickets);
    } catch (error) {
        res.status(500).send();
    }
}

const updateTicketStatus = (req: Request, res: Response) => {
    try {
        const updateTicketStatusPayload: TicketStatusUpdate = req.body;
        updateTicketStatusQuery(updateTicketStatusPayload.id, updateTicketStatusPayload.status);

        res.json({success: true, message: "Updated Ticket Status Successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to Update Ticket Status"});
    }
}

const addTicketReply = (req: Request, res: Response) => {
    try {
        const ticketId = parseInt(req.params.ticketId);
        const replyContent: TicketReplyPayload = req.body;

        addTicketReplyQuery(ticketId, replyContent);
        updateTicketStatusQuery(ticketId, "in_progress")

        res.json({success: true, message: "Successfully replied to ticket"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to reply to ticket"});
    }
}

const getTicketReplies = async (req: Request, res: Response) => {
    try {
        const ticketId = parseInt(req.params.ticketId);
        
        const ticketReplies = await getTicketRepliesQuery(ticketId);

        res.json(ticketReplies);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}

  module.exports = { submitTicket, retrieveTickets, updateTicketStatus, addTicketReply, getTicketReplies };