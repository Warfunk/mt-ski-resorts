import { useState, useEffect } from "react";
import Forecast from "./Forecast";

const Resort = ({ resort }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch("https://calm-crag-40780.herokuapp.com/getForecast", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: resort.latitude,
        long: resort.longitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => setForecast(data.forecast.forecastday))
      .catch((err) => console.log(err));
  }, [resort.latitude, resort.longitude]);

  return (
    <div key={resort.name} className="compareResort">
      <h3 className="name">{resort.name}</h3>{" "}
      <h6>
        {" "}
        Average Snowfall: {resort.avgSnow} | Acreage: {resort.acreage} |
        Vertical: {resort.vert} | <span className="bd">&#9670;+ </span>
        {resort.blackDaimonds} | &#128998; {resort.blues} | &#128994;{" "}
        {resort.greens}
      </h6>
      <div>
        <Forecast forecast={forecast} />
      </div>
      <div className="border-line"></div>
    </div>
  );
};

export default Resort;
