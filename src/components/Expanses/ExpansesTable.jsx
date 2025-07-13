import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL, getCurrentMonth } from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { addExpenses } from "../../store/expenses";

const ExpansesTable = () => {
  const dispatch = useDispatch();
  const [filteredDate, setterDateFunction] = useState(getCurrentMonth());
  const expenses = useSelector((state) => state.expenses);
  const toggle = useSelector((state) => state.update);
  const [isloading, isloadingSetter] = useState(false);

  const fetchAndDisplyData = async () => {
    try {
      isloadingSetter(true);
      const dataToshow = await axios.get(BASE_URL + "/getallexpenses", {
        withCredentials: true,
      });
      dispatch(addExpenses(dataToshow?.data));
      isloadingSetter(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAndDisplyData(); // initial load
  }, []);

  useEffect(() => {
    fetchAndDisplyData(); // refresh on toggle
  }, [toggle]);

  const getDateInput = (e) => {
    setterDateFunction(e.target.value);
  };

  // ✅ Derived filtered data directly
  const currectMontheFilter = expenses.filter((eachItem) => {
    const monthYear = eachItem?.addedDate?.slice(0, 7);
    return monthYear === filteredDate;
  });

  const totalAmount = currectMontheFilter.reduce(
    (acc, item) => acc + Number(item.expenseAmount || 0),
    0
  );

  return (
    <div>
      <input
        type="month"
        className="input ml-3"
        onChange={getDateInput}
        value={filteredDate}
      />
      <div className="text-left mt-2 ml-4 font-bold text-lg">
        Total Expenses: ₹
        <span className="text-green-600 text-2xl ml-3 text-center">
          {totalAmount}
        </span>
      </div>
      {isloading && <span className="loading loading-ring loading-xl"></span>}
      {!isloading && currectMontheFilter.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra overflow-y-auto mb-10">
            <thead>
              <tr>
                <th>No</th>
                <th>Expenses Name</th>
                <th>Amount</th>
                <th>Added Date</th>
              </tr>
            </thead>
            <tbody>
              {currectMontheFilter
                .slice()
                .sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
                .map((eachItem, index) => (
                  <tr key={eachItem._id}>
                    <th>{index + 1}</th>
                    <td>{eachItem.expanseType}</td>
                    <td>{eachItem.expenseAmount}</td>
                    <td>
                      {(() => {
                        const date = new Date(eachItem.addedDate);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        const year = date.getFullYear();
                        return `${day}-${month}-${year}`;
                      })()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="font-bold flex items-center justify-center h-96">
          No Expenses to Show
        </div>
      )}
    </div>
  );
};

export default ExpansesTable;
