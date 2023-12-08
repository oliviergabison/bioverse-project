const express = require("express");
const router = express.Router();
import { submitTicket, retrieveTickets, updateTicketStatus, addTicketReply, getTicketReplies } from "../controllers/ticketController";

router.get("/tickets/:ticketId/replies", getTicketReplies)
router.get("/tickets", retrieveTickets);
router.post("/create-ticket", submitTicket);
router.post("/update-ticket-status", updateTicketStatus);
router.post("/tickets/:ticketId/replies", addTicketReply);


module.exports = router;
