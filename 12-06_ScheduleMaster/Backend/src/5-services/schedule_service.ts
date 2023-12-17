import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client_errors";
import DevelopmentGroup from "../2-models/development_group_model";
import Meeting from "../2-models/meeting_model";
import dal from "../4-utils/dal";


async function getDevGroups(): Promise<DevelopmentGroup[]> {
    return await dal.execute("SELECT * FROM development_groups");
}

async function getMeetingsPerGroup(groupId: number): Promise<Meeting[]> {
    const meetings = await dal.execute("SELECT * FROM meetings WHERE groupId = ?", groupId);
    if (!meetings) throw new ResourceNotFoundError(groupId);
    return meetings;
}

async function addMeeting(meeting: Meeting): Promise<Meeting> {
    meeting.validate();

    const result: OkPacket = await dal.execute(
        "INSERT INTO meetings VALUES(DEFAULT, ?, ?, ?, ?, ?)",
        meeting.groupId,
        meeting.startMeeting,
        meeting.endMeeting,
        meeting.description,
        meeting.meetingRoom
    );
    meeting.meetingId = result.insertId;
    return meeting;
}

export default {
    getDevGroups,
    getMeetingsPerGroup,
    addMeeting
}