import { useEffect, useState } from "react";
import "./Countdown.scss";
import Firework from "../firework/Firework";

export default () => {
  const [diff, setDiff] = useState(0);
  const [isPastLeavingTime, setIsPastLeavingTime] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  let intervalId: NodeJS.Timeout;

  const handleCountdown = () => {
    const now = new Date();
    const target = new Date();

    target.setHours(15);
    target.setMinutes(0);
    target.setSeconds(0);

    const newDiff = Number(target) - Number(now);
    setDiff(newDiff);

    if (now >= target) {
      setIsPastLeavingTime(true);
      clearInterval(intervalId);
      resetHours();
    }
  };

  const resetHours = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    handleCountdown();
    intervalId = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  useEffect(() => {
    if (!isPastLeavingTime) {
      setHours(Math.floor(diff / 1000 / 60 / 60));
      setMinutes(Math.floor((diff / 1000 / 60) % 60));
      setSeconds(Math.floor((diff / 1000) % 60));
    }
  }, [diff, isPastLeavingTime]);

  return (
    <div className="countdown">
      {!isPastLeavingTime && "Det er"}

      <div className="flex">
        <div className="time-container">
          <div className="time">{hours}</div>
          <div className="label">Timer</div>
        </div>
        <div className="time-container">
          <div className="separator">:</div>
          <div className="label"></div>
        </div>
        <div className="time-container">
          <div className="time">{minutes}</div>
          <div className="label">Minutter</div>
        </div>
        <div className="time-container">
          <div className="separator">:</div>
          <div className="label"></div>
        </div>
        <div className="time-container">
          <div className="time">{seconds}</div>
          <div className="label">Sekunder</div>
        </div>
      </div>
      {isPastLeavingTime ? (
        <div>
          <Firework />
          Huzzah, vi kan dra hjem!
        </div>
      ) : (
        "igjen til vi kan dra hjem"
      )}
    </div>
  );
};
