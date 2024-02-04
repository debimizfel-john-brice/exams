import './Home.css';
import { useEffect, useState } from "react";
import notifyService from "../../Services/NotifyService";
import DevelopmentGroup from "../../Models/DevGroupModel";
import Meeting from "../../Models/MeetingModel";
import ScheduleService from "../../Services/ScheduleService";
import Card from "../../Components/Card/Card";

function Home(): JSX.Element {

    const [devGroups, setDevGroups] = useState<DevelopmentGroup[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<number>();
    const [meetings, setMeetings] = useState<Meeting[]>([]);

    useEffect(() => {
        ScheduleService.getDevGroups().then(setDevGroups).catch(e => notifyService.error(e));
    }, []);

    function getMeetings(meetingId: number) {
        if (!meetingId) return;
        ScheduleService.getMeetingsPerGroup(meetingId).then(m => setMeetings(m)).catch(e => notifyService.error(e));
    }

    function getGroupName() {
        return devGroups.find(dg => dg.groupId === selectedGroup)?.name;
    }


    return (
        <div className="Home">
            <div>
                <select onChange={e => {
                    getMeetings(+e.target.value);
                    setSelectedGroup(+e.target.value);
                }}>
                    <option disabled selected>Select Development group</option>
                    {devGroups.map(dg => <option key={dg.groupId} value={dg.groupId}>{dg.name}</option>)}
                </select>
            </div>
            <div className="flex">
                {meetings.map(m => <Card key={m.meetingId} meeting={m} devGroups={getGroupName()}></Card>)}
            </div>
        </div>
    );
}

export default Home;
