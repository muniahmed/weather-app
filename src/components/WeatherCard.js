import React from "react";
import "./WeatherCard.css";




function WeatherCard(props) {

    const icons = {
        thunderstorm: <i className="fa-solid fa-cloud-bolt"></i>,
        drizzle: <i className="fa-solid fa-cloud-rain"></i>,
        rain: <i className="fa-solid fa-cloud-showers-heavy"></i>,
        snow: <i className="fa-solid fa-snowflake"></i>,
        clear: <i className="fa-solid fa-sun"></i>,
        clouds: <i className="fa-solid fa-cloud"></i>,
    };

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    function dayOfWeek(date) {
        if (date !== null) {
            const day = new Date(date);
            const weekday = day.getDay();
            return weekdays[weekday]
        }
        else {
            return ("Today");
        }

    }


    return (
        <div className="WeatherCard">
            <div className="content">
                {icons[props.condition]}
                <h2 className="temp">{props.temp}°C</h2>
                <p className="date">{dayOfWeek(props.date)}</p>
                <div className="cond">
                    <i className="fa-solid fa-cloud-showers-heavy"></i>
                    <p>{isNaN(props.pop) ? props.pop : props.pop + " %"} </p>
                </div>
                <div className="cond">
                    <i className="fa-solid fa-wind"></i>
                    <p>{props.wind} km/h</p>
                </div>
            </div>

        </div >
    )
}
export default WeatherCard;