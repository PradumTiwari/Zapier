"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    // Check if it starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    // Extract the JWT (remove "Bearer " prefix)
    const token = authHeader.split(" ")[1];
    const payload = jsonwebtoken_1.default.verify(token, config_1.JWTPASSWORD);
    try {
        const payload = jsonwebtoken_1.default.verify(token, config_1.JWTPASSWORD);
        //@ts-ignore
        req.id = payload.id;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid Token"
        });
    }
}
