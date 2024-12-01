import React from "react";

const AddProductButton = ({ onAdd, btnText, classNames }) => {
  return (
    <button onClick={onAdd} className={classNames}>
      {btnText}
    </button>
  );
};

export default AddProductButton;
