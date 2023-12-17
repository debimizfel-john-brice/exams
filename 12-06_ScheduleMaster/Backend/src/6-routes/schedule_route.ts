import express, { NextFunction, Request, Response } from "express";
import schedule_service from "../5-services/schedule_service";
import Meeting from "../2-models/meeting_model";

const router = express.Router();
export default router;

router.get("/development-groups", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const devGroups = await schedule_service.getDevGroups();
        response.json(devGroups);
    } catch (err) {
        next(err);
    }
});

router.get("/meetings-per-group/:groupId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const groupId = parseInt(request.params.groupId);
        const meetings = await schedule_service.getMeetingsPerGroup(groupId);
        response.json(meetings);
    } catch (err) {
        next(err);
    }
});

router.post("/meetings", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const meeting = new Meeting(request.body);
        const addedMeeting = await schedule_service.addMeeting(meeting);
        response.status(201).json(addedMeeting);
    } catch (err) {
        next(err);
    }
});
