import React from "react";
import Checkbox from "@mui/material/Checkbox";

const SearchListItem = ({
  checked,
  src,
  label,
  itemQuantity,
  price,
  product,
  handleOnChange,
}) => {
  return (
    <div className=" w-[100%] border-b-2  border-gray-500 overflow-y-auto overflow-x-hidden">
      <CheckboxElement
        checked={checked}
        src={src}
        label={label}
        itemQuantity={itemQuantity}
        price={price}
        id={product?.id}
        handleOnChange={() => {
          handleOnChange(product, "");
        }}
      />

      {product?.variants?.map((item, index) => (
        <div className="border-t-2 border-gray-400" key={item?.id}>
          <div className="pl-10 pr-2">
            <CheckboxElement
              checked={item?.checked}
              src={product?.image[index]?.src}
              label={item?.title}
              itemQuantity={item?.inventory_quantity}
              price={price}
              id={item?.id}
              handleOnChange={() => {
                handleOnChange(product, item?.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const CheckboxElement = ({
  checked,
  src,
  label,
  itemQuantity,
  price,
  item,
  handleOnChange,
}) => {
  return (
    <div className="flex items-center">
      <div>
        <Checkbox
          checked={checked}
          onChange={() => {
            handleOnChange(item);
          }}
        />
        <image src={src} alt="hello " />
        <label htmlFor=""> {label}</label>
      </div>
      <div>
        <label htmlFor="">{itemQuantity}</label>
        <label htmlFor="">{price}</label>
      </div>
    </div>
  );
};
export default SearchListItem;
