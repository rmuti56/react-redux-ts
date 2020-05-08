import React from "react";
import { UserEvent, deleteUserEvent } from "../../redux/user-events";
import { useDispatch } from "react-redux";

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };
  return (
    <div key={event.id}>
      {event.dateStart} - {event.dateEnd}
      <button onClick={handleDeleteClick}>&times;</button>
    </div>
  );
};
export default EventItem;
