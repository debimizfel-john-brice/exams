import Joi from "joi";
import { ValidationError } from "./client_errors";

export default class Meeting {
    public meetingId: number;
    public groupId: number;
    public startMeeting: string;
    public endMeeting: string;
    public description: string;
    public meetingRoom: string;

    constructor(meeting: { meetingId: number, groupId: number, startMeeting: string, endMeeting: string, description: string, meetingRoom: string }) {
        this.meetingId = meeting.meetingId;
        this.groupId = meeting.groupId;
        this.startMeeting = meeting.startMeeting;
        this.endMeeting = meeting.endMeeting;
        this.description = meeting.description;
        this.meetingRoom = meeting.meetingRoom;
    }

    public validate() {
        const result = Meeting.ValidationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }

    public static ValidationSchema = Joi.object({
        meetingId: Joi.number().integer().positive().optional(),
        groupId: Joi.number().integer().positive().required(),
        startMeeting: Joi.string().required(),
        endMeeting: Joi.string().required(),
        description: Joi.string().min(2).max(30).required(),
        meetingRoom: Joi.string().min(2).max(30).required(),
    });
}