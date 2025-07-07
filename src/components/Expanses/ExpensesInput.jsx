import React, { useState } from "react";

const ExpensesInput = () => {
  const [billText, billTextSetter] = useState("");
  const [billAmount, billAmountSetter] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
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
        <button className="btn btn-active mt-2">Save</button>
      </form>
    </div>
  );
};

export default ExpensesInput;
