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
exports.getTicketRepliesQuery = exports.addTicketReplyQuery = exports.updateTicketStatusQuery = exports.getTicketsQuery = exports.submitNewTicketQuery = void 0;
const { createPool, sql } = require("@vercel/postgres");
require("dotenv").config();
const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});
function submitNewTicketQuery(ticketPayload) {
    const { name, email, description } = ticketPayload;
    try {
        return pool.query("INSERT INTO tickets(name, email, description) VALUES($1, $2, $3)", [name, email, description]);
    }
    catch (error) {
        console.log(error);
    }
}
exports.submitNewTicketQuery = submitNewTicketQuery;
function getTicketsQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rows } = yield pool.query("SELECT * FROM tickets ORDER BY created_at DESC");
            return rows;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getTicketsQuery = getTicketsQuery;
function updateTicketStatusQuery(ticketId, newStatus) {
    try {
        return pool.query("UPDATE tickets SET status = $1 WHERE id = $2", [newStatus, ticketId]);
    }
    catch (error) {
        console.log(error);
    }
}
exports.updateTicketStatusQuery = updateTicketStatusQuery;
function addTicketReplyQuery(ticketId, ticketReply) {
    try {
        return pool.query("INSERT INTO ticket_replies(ticket_id, content) VALUES($1, $2)", [ticketId, ticketReply.text]);
    }
    catch (error) {
        console.log(error);
    }
}
exports.addTicketReplyQuery = addTicketReplyQuery;
function getTicketRepliesQuery(ticketId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { rows } = yield pool.query("SELECT * FROM ticket_replies WHERE ticket_id = $1 ORDER BY created_at ASC", [ticketId]);
            return rows;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getTicketRepliesQuery = getTicketRepliesQuery;
