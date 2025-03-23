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
exports.userRouter = void 0;
const express_1 = require("express");
const types_1 = require("../types");
const db_1 = require("../db"); // Ensure this path is correct
const router = (0, express_1.Router)();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Parse request body correctly
    const parsedData = types_1.signUpSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect Inputs",
            errors: parsedData.error.errors // Send validation errors for debugging
        });
        return;
    }
    const { username, password, name } = parsedData.data;
    // Check if the user already exists
    const userExists = yield db_1.prismaClient.user.findFirst({
        where: { email: username }
    });
    if (userExists) {
        res.status(409).json({
            message: "User Already Exists"
        });
        return;
    }
    // Create new user
    yield db_1.prismaClient.user.create({
        data: {
            email: username,
            password, // Hash this in production
            name
        }
    });
    res.status(201).json({
        message: "Please verify the account"
    });
}));
exports.userRouter = router;
