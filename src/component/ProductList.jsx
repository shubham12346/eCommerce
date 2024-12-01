import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { useDrag, useDrop } from "react-dnd";

const ItemType = "PRODUCT"; // Defining the type for drag-and-drop items

const ProductList = ({ products, onReorder, onRemove, onAddDiscount }) => {
  // Drag-and-drop logic
  console.log("product", products);
  return (
    <div>
      {products?.map((product, index) => (
        <div key={product?.id} className="my-5">
          <div className="flex">
            <div>
              <DragIndicatorIcon />
            </div>
            <div className="mr-2">
              <div className="">{`${index}`}.</div>
            </div>
            <div className="border-2 border-black px-3 flex">
              <div className="w-96 flex items-center">
                <h3 className="text-sm px-1">{product?.title}</h3>
              </div>
              <div className="cursor-pointer text-sm">Edit</div>
            </div>

            {/* <img
              src={product?.image?.src}
              alt={product?.title}
              className="w-10 h-10"
            /> */}

            <button
              onClick={() => onAddDiscount(product.id)}
              className="mx-2 p-2 border-2 border-black  text-sm"
            >
              Add Discount
            </button>
            {products?.length > 1 && (
              <button onClick={() => onRemove(product.id)} className="m-1 p-1">
                x
              </button>
            )}
          </div>
          <div>
            {product?.variants?.length > 1 && (
              <div className="flex items-end justify-end my-2">
                <button className="text-sm text-blue-600 underline mr-10">
                  Show Variants
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
