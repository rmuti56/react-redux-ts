import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  UserEvent,
  deleteUserEvent,
  updateUserEvent,
} from "../../redux/user-events";

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };

  const [editable, setEditable] = useState(false);

  const handleTitleClick = () => {
    setEditable(true);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);
  const [title, setTitle] = useState(event.title);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(
        updateUserEvent({
          ...event,
          title,
        })
      );
    }
    setEditable(false);
  };
  return (
    <div>
      <div>
        {editable ? (
          <input
            type-="text"
            ref={inputRef}
            value={title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ) : (
          <p onClick={handleTitleClick}>{title}</p>
        )}
      </div>
      {event.dateStart} - {event.dateEnd}
      <button onClick={handleDeleteClick}>&times;</button>
    </div>
  );
};
export default EventItem;
