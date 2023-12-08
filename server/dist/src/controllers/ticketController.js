"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketReplies = exports.addTicketReply = exports.updateTicketStatus = exports.retrieveTickets = exports.submitTicket = void 0;
const ticketQueries_1 = require("../queries/ticketQueries");
const submitTicket = (req, res) => {
    try {
        const ticketPayload = req.body;
        (0, ticketQueries_1.submitNewTicketQuery)(ticketPayload);
        res.json({ success: true, message: "Ticket submitted successfully!" });
    }
    catch (error) {
        res.json({ success: false, message: "Failed to Create Ticket" });
    }
};
exports.submitTicket = submitTicket;
const retrieveTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield (0, ticketQueries_1.getTicketsQuery)();
        res.json(tickets);
    }
    catch (error) {
        res.status(500).send();
    }
});
exports.retrieveTickets = retrieveTickets;
const updateTicketStatus = (req, res) => {
    try {
        const updateTicketStatusPayload = req.body;
        (0, ticketQueries_1.updateTicketStatusQuery)(updateTicketStatusPayload.id, updateTicketStatusPayload.status);
        res.json({ success: true, message: "Updated Ticket Status Successfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to Update Ticket Status" });
    }
};
exports.updateTicketStatus = updateTicketStatus;
const addTicketReply = (req, res) => {
    try {
        const ticketId = parseInt(req.params.ticketId);
        const replyContent = req.body;
        (0, ticketQueries_1.addTicketReplyQuery)(ticketId, replyContent);
        (0, ticketQueries_1.updateTicketStatusQuery)(ticketId, "in_progress");
        res.json({ success: true, message: "Successfully replied to ticket" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to reply to ticket" });
    }
};
exports.addTicketReply = addTicketReply;
const getTicketReplies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketId = parseInt(req.params.ticketId);
        const ticketReplies = yield (0, ticketQueries_1.getTicketRepliesQuery)(ticketId);
        res.json(ticketReplies);
    }
    catch (error) {
        console.log(error);
        res.status(500).send();
    }
});
exports.getTicketReplies = getTicketReplies;
