import React, { useEffect, useState } from "react";

import "./Scrollingbar.css";
import WaterDuty from "./WaterDuty";

const ScrollingBar = () => {
  const [show, showSetter] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      showSetter((prev) => prev);
    }, 15000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      {show && (
        <div>
          <div className="w-full overflow-hidden bg-base-100 text-primary-content">
            <div className="whitespace-nowrap animate-scroll px-4 py-2 text-lg font-semibold text-green-600">
              🚀 Welcome to our dashboard! | 💸 Track your expenses easily | 🎉
              Shared & Individual Summary | 🧾 Monthly Reports | 🔐 Secure Login
              for All Roommates
            </div>
          </div>
          <div className="w-full overflow-hidden bg-base-100 text-primary-content">
            <div className="whitespace-nowrap animate-scroll2 px-4 py-2 text-lg font-semibold">
              <WaterDuty />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollingBar;
