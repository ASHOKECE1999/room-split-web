import React, { useState } from "react";
import ExpansesTable from "./ExpansesTable";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import { useDispatch } from "react-redux";
import { changeState } from "../../store/updated";

const ExpensesInput = () => {
  const [billText, billTextSetter] = useState("");
  const dispatch = useDispatch();
  const [billAmount, billAmountSetter] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      billText !== "" &&
      billAmount !== "" &&
      billText !== " " &&
      billAmount !== " "
    ) {
      try {
        const data = await axios.post(
          BASE_URL + "/addexpense",
          {
            expanseType: billText,
            expenseAmount: billAmount,
          },
          {
            withCredentials: true,
          }
        );
        dispatch(changeState());
        console.log(data.data);
        billAmountSetter("");
        billTextSetter("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-3">
      <form
        className="flex flex-col  justify-center p-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Enter your expances Type?</legend>
          <input
            type="text"
            className="input w-full"
            placeholder="Type here"
            value={billText}
            onChange={(e) => billTextSetter(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Expances Bill ?</legend>
          <input
            type="number"
            className="input w-full"
            placeholder="Type here"
            value={billAmount}
            onChange={(e) => billAmountSetter(e.target.value)}
          />
        </fieldset>
        <button className="btn btn-active mt-2" type="submit">
          Save
        </button>
      </form>
      <div>
        <ExpansesTable />
      </div>
    </div>
  );
};

export default ExpensesInput;
