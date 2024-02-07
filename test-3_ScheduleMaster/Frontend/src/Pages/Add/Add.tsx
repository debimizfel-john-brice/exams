import "./Add.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import notifyService from "../../Services/NotifyService";
import Meeting from "../../Models/MeetingModel";
import DevelopmentGroup from "../../Models/DevGroupModel";
import ScheduleService from "../../Services/ScheduleService";

function Add(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Meeting>();
    const [devGroups, setDevGroups] = useState<DevelopmentGroup[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        ScheduleService.getDevGroups().then(setDevGroups).catch(e => notifyService.error(e));
    }, []);


    async function save(meeting: Meeting) {
        console.log(await existsMeeting(meeting));

        if (await existsMeeting(meeting)) {
            notifyService.error("Meeting already exists");
            return;
        }
        else {
            try {
                await ScheduleService.addMeeting(meeting);
                notifyService.success("Meeting added!");
                navigate("/");
            } catch (error) {
                notifyService.error(error);
            }
        }
    }

    async function existsMeeting(meeting: Meeting): Promise<boolean> {
        try {
            const existingMeetings = await ScheduleService.getMeetingsPerGroup(meeting.groupId);
            const hasConflict = existingMeetings.some((existingMeeting) => {
                const startMeeting = new Date(meeting.startMeeting);
                const endMeeting = new Date(meeting.endMeeting);
                const existingStartMeeting = new Date(existingMeeting.startMeeting);
                const existingEndMeeting = new Date(existingMeeting.endMeeting);
                return (
                    (startMeeting >= existingStartMeeting && startMeeting <= existingEndMeeting) ||
                    (endMeeting >= existingStartMeeting && endMeeting <= existingEndMeeting) ||
                    (startMeeting <= existingStartMeeting && endMeeting >= existingEndMeeting)
                );
            });

            return hasConflict;

        } catch (e) {
            notifyService.error(e);
        }
    }

    return (
        <form className="Add" onSubmit={handleSubmit(save)}>
            <article >
                <h2>Add meeting</h2>

                <label>Development Group</label>
                <select {...register("groupId", Meeting.DevGroupValidation)}>
                    <option key="" value="" disabled selected>Select Development Group</option>
                    {devGroups.map(dg => <option key={dg.groupId} value={dg.groupId}>{dg.name}</option>)}
                </select>
                <div className="err_message">{formState.errors.groupId?.message}</div>

                <label>Start Meeting</label>
                <input type="datetime-local" {...register("startMeeting", Meeting.StartMeetingValidation)} />
                <div className="err_message">{formState.errors.startMeeting?.message}</div>

                <label>End Meeting</label>
                <input type="datetime-local" {...register("endMeeting", Meeting.EndMeetingValidation)} />
                <div className="err_message">{formState.errors.endMeeting?.message}</div>

                <label>Description</label>
                <input type="text"  {...register("description", Meeting.DescriptionValidation)} />
                <div className="err_message">{formState.errors.description?.message}</div>

                <label>Meeting Room</label>
                <input type="text" {...register("meetingRoom", Meeting.MeetingRoomValidation)} />
                <div className="err_message">{formState.errors.meetingRoom?.message}</div>

                <button className="contrast outline">Add meeting</button>
            </article>
        </form>
    );
}

export default Add;


