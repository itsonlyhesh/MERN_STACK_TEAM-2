import { useEffect, useState } from "react";
import "./OfferCountdown.css";

function OfferCountdown() {
  // Set the offer to end today at 10:00 PM
  const getTargetTime = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(22, 0, 0, 0);

    // If it's already past 10 PM, end tomorrow at 10 PM
    if (now > target) {
      target.setDate(target.getDate() + 1);
    }

    return target;
  };

  const [timeLeft, setTimeLeft] = useState(
    getTargetTime().getTime() - new Date().getTime()
  );

  useEffect(() => {
    const target = getTargetTime();

    const timer = setInterval(() => {
      const difference = target.getTime() - new Date().getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(
    Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const seconds = String(
    Math.floor((timeLeft % (1000 * 60)) / 1000)
  ).padStart(2, "0");

  return (
    <div className="offer-countdown">
      <h3>⏰ Today's Mall Offers End In</h3>

      <div className="timer">
        <div className="time-box">
          <span>{hours}</span>
          <small>Hours</small>
        </div>

        <div className="time-box">
          <span>{minutes}</span>
          <small>Minutes</small>
        </div>

        <div className="time-box">
          <span>{seconds}</span>
          <small>Seconds</small>
        </div>
      </div>
    </div>
  );
}

export default OfferCountdown;