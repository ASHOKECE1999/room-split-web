import React from "react";
import { todayName } from "../../constants/constant";
console.log(todayName);
const WaterDuty = () => {
  return (
    <div>
      Water Duty by 💧 |
      <span className="text-xl text-yellow-400"> {todayName}</span> | Today
    </div>
  );
};

export default WaterDuty;
