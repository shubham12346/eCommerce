import React from "react";
import Checkbox from "@mui/material/Checkbox";
import ImageIcon from "@mui/icons-material/Image";

const SearchListItem = ({
  checked,
  src,
  label,
  itemQuantity,
  price,
  product,
  handleOnChange,
}) => {
  console.log("pro source", src);
  return (
    <div className=" w-[100%] border-b-2  border-gray-500 overflow-y-auto overflow-x-hidden">
      <CheckboxElement
        checked={checked}
        src={src}
        label={label}
        itemQuantity={itemQuantity}
        price={""}
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
              src={src}
              label={item?.title}
              itemQuantity={item?.inventory_quantity}
              price={item?.price}
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
  src: Source,
  label,
  itemQuantity,
  price,
  item,
  handleOnChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Checkbox
          checked={checked}
          onChange={() => {
            handleOnChange(item);
          }}
        />
        {Source ? (
          <div className="p-2">
            <img
              src={Source}
              className="h-8 w-8 mr-3 mx-1 "
              alt={`${price}-image`}
            />
          </div>
        ) : (
          <div className="p-2 bg-gray-300 m-2">
            <ImageIcon />
          </div>
        )}
        <label htmlFor=""> {label}</label>
      </div>
      <div className="mr-2">
        {itemQuantity && (
          <label htmlFor="" className="mx-2">
            {itemQuantity + " available"}
          </label>
        )}
        {price && <label htmlFor="">&#8377;{price}</label>}
      </div>
    </div>
  );
};
export default SearchListItem;
