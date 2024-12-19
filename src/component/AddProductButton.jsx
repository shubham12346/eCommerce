import React from "react";

const AddProductButton = ({ onAdd, btnText, classNames, isDisabled }) => {
  return (
    <button onClick={onAdd} className={classNames} disabled={isDisabled}>
      {btnText}
    </button>
  );
};

export default AddProductButton;
