import React, { useState } from "react";

const DiscountModal = ({ onClose, onSave }) => {
  const [type, setType] = useState("flat");
  const [value, setValue] = useState("");

  return (
    <div>
      <h3>Add Discount</h3>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="flat">Flat</option>
        <option value="percentage">Percentage</option>
      </select>
      <input
        type="number"
        placeholder="Discount value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => onSave(type, value)}>Save</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DiscountModal;
