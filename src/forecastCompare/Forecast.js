import "./forecast.css";

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast">
      {forecast.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        forecast.map((day) => {
          const date = new Date(day.date);
          const dayGMT = date.toGMTString("en-us", { weekday: "long" });
          const dayOfWeek = dayGMT.slice(0, 3);
          const weather = day.day.condition.text;

          return (
            <div className="daily">
              <div className="dayOfWeek">{dayOfWeek.toUpperCase()}</div>
              <div className="high"> High: {day.day.maxtemp_f} </div>
              <div className="low"> Low: {day.day.mintemp_f} </div>
              <div className="weather">{weather}</div>
              <div className="precip">
                Chance of Precipitation: {day.day.daily_chance_of_rain}%
              </div>
              <div>
                <img
                  src={day.day.condition.icon}
                  alt="Weather Icon"
                  className="weath-icon"
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Forecast;
