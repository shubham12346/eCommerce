import React from "react";
import CheckBox from "@mui/icons-material/CheckBox";

const DiscountDesc = (handleOnChange, checked) => {
  const iconHeight = "15px";
  return (
    <div className="flex flex-col pl-10">
      <div className="py-4 ">
        <div className="flex text-[0.8rem] items-center">
          <CheckBox
            checked={checked}
            onChange={() => {
              handleOnChange();
            }}
            className=""
            sx={{ height: iconHeight }}
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
          <CheckBox
            checked={checked}
            onChange={() => {
              handleOnChange();
            }}
            sx={{ height: iconHeight }}
          />
          <span className="text-[0.8rem]">Enable timer for this offer.</span>
        </div>
      </div>
      <div className="pt-6 pl-2">
        <span className="text-black/50  font-semibold">Offer Timer</span>
      </div>
    </div>
  );
};

export default DiscountDesc;
