import Meeting from '../../Models/MeetingModel';
import './Card.css';

interface CardProps {
    meeting: Meeting,
    devGroups: string,
}

function Card({ meeting, devGroups }: CardProps): JSX.Element {
    const totalHours = new Date(meeting.endMeeting).getHours() - new Date(meeting.startMeeting).getHours();
    const startMeeting = new Date(meeting.startMeeting).toLocaleString();
    const endMeeting = new Date(meeting.endMeeting).toLocaleString();


    return (
        <div className="felx">
            <article className="Card">
                <header>
                    <strong>{devGroups}</strong>
                </header>
                <p><strong>Start:</strong> {startMeeting}</p>
                <p><strong>End:</strong> {endMeeting}</p>
                <p><strong>Total hours:</strong> {totalHours}hrs</p>
                <p><strong>Description:</strong> {meeting.description}</p>
                <p><strong>Meeting Room:</strong> {meeting.meetingRoom}</p>
            </article>
        </div>
    );
}

export default Card;
