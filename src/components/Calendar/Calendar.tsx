import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "../../redux/store";
import {
  selectUserEventsArray,
  loadUserEvents,
  UserEvent,
} from "../../redux/user-events";
import { addZero } from "../../helpers";
import EventItem from "./EventItem";

import "./Calendar.css";

const mapState = (state: RootState) => ({
  events: selectUserEventsArray(state),
});

const mapDispatch = {
  loadUserEvents,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const createDateKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${year}-${addZero(month)}-${addZero(day)}`;
};

const groupEventsByDay = (events: UserEvent[]) => {
  const groups: Record<string, UserEvent[]> = {};

  const addToGroup = (dateKey: string, event: UserEvent) => {
    if (groups[dateKey] === undefined) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
  };
  events.forEach((event) => {
    const dateStartKey = createDateKey(new Date(event.dateStart));
    const dateEndKey = createDateKey(new Date(event.dateEnd));
    addToGroup(dateStartKey, event);
    if (dateEndKey !== dateStartKey) {
      addToGroup(dateEndKey, event);
    }
  });
  return groups;
};

const Calendar: React.FC<Props> = ({ events, loadUserEvents }) => {
  useEffect(() => {
    loadUserEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;
  let sortedGroupKeys: string[] | undefined;

  if (events.length) {
    groupedEvents = groupEventsByDay(events);
    sortedGroupKeys = Object.keys(groupedEvents).sort(
      (date1, date2) => +new Date(date1) - +new Date(date2)
    );
  }

  return groupedEvents && sortedGroupKeys ? (
    <>
      {sortedGroupKeys.map((dayKey) => {
        const events = groupedEvents![dayKey];

        return (
          <div className="calendar" key={dayKey}>
            {dayKey}
            {/* <span>1 February</span>
            <div>{events}</div> */}
            {events.map((event) => {
              return <EventItem key={event.id} event={event} />;
            })}
          </div>
        );
      })}
    </>
  ) : (
    <div>loading...</div>
  );
};

export default connector(Calendar);
