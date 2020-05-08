import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { start, selectDateStart, stop } from "../../redux/recorder";
import { createUserEvent } from "../../redux/user-events";

const Recorder = () => {
  const dispatch = useDispatch();
  const dateStart = useSelector(selectDateStart);
  const started = dateStart !== "";
  let interval = useRef<number>(0);
  const [, setCount] = useState<number>(0);
  let secounds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;
  const hours = secounds ? Math.floor(secounds / 60 / 60) : 0;
  secounds -= hours * 60 * 60;
  const minutes = secounds ? Math.floor(secounds / 60) : 0;
  secounds -= minutes * 60;

  const handleClick = () => {
    if (secounds) {
      window.clearInterval(interval.current);
      dispatch(createUserEvent());
      dispatch(stop());
    } else {
      dispatch(start());
      interval.current = window.setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  return (
    <div>
      <button className="recorder-record" onClick={handleClick}>
        <span>click</span>
      </button>
      <div className="recorder-counter">
        {hours}:{minutes}:{secounds}
      </div>
    </div>
  );
};

export default Recorder;
