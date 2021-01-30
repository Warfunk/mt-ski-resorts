import Resort from "./Resort";
import { resorts } from "../Resorts/resorts";

const CompareSnow = ({ snow }) => {
  const resortsToCompare = resorts.filter((resort) => snow.includes(resort.id));
  if (snow.length === 0) {
    return <h3 className="snow">Click Compare to See Stats and Forecast</h3>;
  } else {
    return (
      <div>
        {resortsToCompare.map((resort) => (
          <Resort resort={resort} />
        ))}
      </div>
    );
  }
};

export default CompareSnow;
