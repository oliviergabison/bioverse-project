"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { submitTicket, retrieveTickets, updateTicketStatus, addTicketReply, getTicketReplies } = require("../controllers/ticketController");
const router = express_1.default.Router();
router.get("/tickets/:ticketId/replies", getTicketReplies);
router.get("/tickets", retrieveTickets);
router.post("/create-ticket", submitTicket);
router.post("/update-ticket-status", updateTicketStatus);
router.post("/tickets/:ticketId/replies", addTicketReply);
module.exports = router;
//# sourceMappingURL=index.js.map