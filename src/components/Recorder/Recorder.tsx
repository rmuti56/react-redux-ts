import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { start, selectDateStart } from "../../redux/recorder";

const Recorder = () => {
  const dispatch = useDispatch();
  const dateStart = useSelector(selectDateStart);
  const started = dateStart !== "";
  let interval = useRef<number>(0);
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    dispatch(start());
    interval.current = window.setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  let secounds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;
  const hours = secounds ? Math.floor(secounds / 60 / 60) : 0;
  secounds -= hours * 60 * 60;
  const minutes = secounds ? Math.floor(secounds / 60) : 0;
  secounds -= minutes * 60;

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
