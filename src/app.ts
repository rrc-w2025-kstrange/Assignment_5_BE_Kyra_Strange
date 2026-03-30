import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import eventRoutes from "./api/v1/routes/eventRoutes";
import setupSwagger from "./config/swagger";
import { getHelmetConfig } from "./config/helmetConfig";
import cors from "cors";
import {getCorsOptions}  from "./config/corsConfig"; 


// Initialize Express application
const app: Express = express();

app.use(getHelmetConfig());

app.use(cors(getCorsOptions()));
app.use(express.json());


// Route handler
app.use("/api/v1/events", eventRoutes);

// Define a route
app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

setupSwagger(app);

export default app;