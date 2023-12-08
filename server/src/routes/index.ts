import express from "express";

const { submitTicket, retrieveTickets, updateTicketStatus, addTicketReply, getTicketReplies } = require("../controllers/ticketController");
const router = express.Router();

router.get("/tickets/:ticketId/replies", getTicketReplies)
router.get("/tickets", retrieveTickets);
router.post("/create-ticket", submitTicket);
router.post("/update-ticket-status", updateTicketStatus);
router.post("/tickets/:ticketId/replies", addTicketReply);


module.exports = router;
