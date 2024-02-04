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

    public static DevGroupValidation = {
        required: { value: true, message: "Development group is required" },
    }

    public static StartMeetingValidation = {
        required: { value: true, message: "Start meeting required" }
    }

    public static EndMeetingValidation = {
        required: { value: true, message: "End meeting required" }
    }

    public static DescriptionValidation = {
        required: { value: true, message: "Description is required" },
        minLength: { value: 2, message: "Description must be at least 2 characters" },
        maxLength: { value: 50, message: "Description cannot exceed 30 characters" }
    }

    public static MeetingRoomValidation = {
        required: { value: true, message: "Meeting room is required" },
        minLength: { value: 2, message: "Meeting room must be at least 2 characters" },
        maxLength: { value: 50, message: "Meeting room cannot exceed 30 characters" }
    }
}