import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

const DiscountDesc = () => {
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
  });
  const iconHeight = "15px";

  const handleOnChange = (checkBoxNum) => {
    setCheckboxes({
      ...checkboxes,
      [checkBoxNum]: !checkboxes[checkBoxNum],
    });
  };

  /**
   * I don't know if need this also so i didn't connect its states to parent component
   */
  return (
    <div className="flex flex-col pl-10">
      <div className="py-4 ">
        <div className="flex text-[0.8rem] items-center">
          <Checkbox
            onChange={() => {
              handleOnChange("checkbox1");
            }}
            className=""
            sx={{ height: iconHeight }}
            checked={checkboxes.checkbox1}
          />

          <div className="pl-2">Apply Discount on compare price.</div>
        </div>
        <div className="pl-2">
          <span className="text-[0.8rem] ">
            Discount will be applied on compare price of the product. Discount
            set inside the upsell offer should be more than or equal to the
            discount set on a product in your store.
          </span>
        </div>
      </div>
      <div className="py-4 ">
        <div className="pl-2">
          <span className="underline font-bold">
            Advanced offer customization
          </span>
        </div>
        <div className="pt-1">
          <Checkbox
            onChange={() => {
              handleOnChange("checkbox2");
            }}
            sx={{ height: iconHeight }}
            checked={checkboxes.checkbox2}
          />
          <span className="text-[0.8rem]">Enable timer for this offer.</span>
        </div>
      </div>
      <div className="pt-6 pl-2 pb-1">
        <span className="text-black/50  font-semibold">Offer Timer</span>
      </div>
    </div>
  );
};

export default DiscountDesc;
