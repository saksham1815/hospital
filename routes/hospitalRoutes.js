import express from "express";
import { getHospitalsNearLocation } from "../controllers/hospitalController.js";

const hospitalRouter = express.Router();

hospitalRouter.get("/hospitals/near", getHospitalsNearLocation);

export default hospitalRouter;
