import React from "react";
import "./input.css";

const DiscountModal = ({
  productId,
  handleDiscount,
  discountValue,
  discountType,
}) => {
  return (
    <div className="flex mx-2">
      <input
        name="discountValue"
        type="number"
        placeholder=""
        value={discountValue}
        onChange={(e) =>
          handleDiscount(productId, e.target.name, e.target.value)
        }
        className=" w-16  border-[2px] border-black/8  focus:outline-none focus:border-customGreen !appearance-none"
      />
      <select
        name="discountType"
        value={discountType}
        onChange={(e) =>
          handleDiscount(productId, e.target.name, e.target.value)
        }
        className="px-2 ms-1  w-16  border-[1px] border-black/8 focus:outline-none focus:border-customGreen py-[0.6rem]"
      >
        <option value="flat">flat</option>
        <option value="percentage">%</option>
      </select>
    </div>
  );
};

export default DiscountModal;
