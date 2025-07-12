import React, { useEffect, useState } from "react";
import { BASE_URL, getCurrentMonth } from "../../constants/constant";
import axios from "axios";

const MonthWiseSummary = () => {
  const [currentData, currentDateSetter] = useState(getCurrentMonth());
  const [year, month] = currentData.split("-");
  const [displayData, displayDataSetter] = useState([]);

  const setTodayDate = (e) => {
    currentDateSetter(e.target.value);
  };

  const fetchDataMonthWise = async () => {
    try {
      const data = await axios.get(
        BASE_URL + "/monthwise/?" + `month=${month}&year=${year}`,
        {
          withCredentials: true,
        }
      );
      displayDataSetter(data.data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataMonthWise();
  }, [currentData]);

  useEffect(() => {
    fetchDataMonthWise();
  }, []);

  return (
    <div>
      <input
        type="month"
        className="input ml-2 mt-4"
        value={currentData}
        onChange={setTodayDate}
      />
      <div>
        {displayData?.length > 0 ? (
          <div className="overflow-x-auto mt-4 mb-11">
            <table className="table table-zebra p-3">
              {/* head */}
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Total Amoout</th>
                </tr>
              </thead>
              <tbody>
                {displayData?.map((eachItem, index) => (
                  <tr key={eachItem?.userData[0]._id}>
                    <th>{index + 1}</th>
                    <th>
                      <img
                        src={eachItem?.userData[0]?.profileUrl}
                        className="rounded-full w-15"
                      />
                    </th>
                    <th className="whitespace-normal break-words max-w-[100px] text-[13px]">
                      {eachItem?.userData[0]?.fullName}
                    </th>

                    <th className="text-green-500s">
                      {eachItem?.expenses || 0}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center h-96 flex items-center justify-center flex-col">
            <span>No Cards to Show</span>
            <p>Search with Other Month</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthWiseSummary;
