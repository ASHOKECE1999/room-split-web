import React from "react";
import { names } from "../../constants/constant";

const WaterSchedule = () => {
  return (
    <div className="p-4 flex justify-center flex-col items-center">
      <h1 className="text-2xl mb-4 text-warning">Water Schedule</h1>
      {names.map((eachItem, index) => (
        <h1 key={index}>{eachItem}</h1>
      ))}
    </div>
  );
};

export default WaterSchedule;
