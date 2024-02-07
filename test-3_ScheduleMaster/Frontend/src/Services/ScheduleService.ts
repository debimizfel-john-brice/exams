import axios from "axios";
import DevelopmentGroup from "../Models/DevGroupModel";
import Meeting from "../Models/MeetingModel";

const devGroupsUrl = "http://localhost:4000/api/development-groups";
const meetingsPerGroupUrl = "http://localhost:4000/api/meetings-per-group/";
const meetingsUrl = "http://localhost:4000/api/meetings";

export default class ScheduleService {
    static async getDevGroups(): Promise<DevelopmentGroup[]> {
        const response = await axios.get<DevelopmentGroup[]>(devGroupsUrl);
        return response.data;
    }

    static async getMeetingsPerGroup(groupId: number): Promise<Meeting[]> {
        const response = await axios.get<Meeting[]>(meetingsPerGroupUrl + groupId);
        return response.data;
    }

    static async addMeeting(meeting: Meeting): Promise<Meeting> {
        const response = await axios.post<Meeting>(meetingsUrl, meeting);
        return response.data;
    }
}