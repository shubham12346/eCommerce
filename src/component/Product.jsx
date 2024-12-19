import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Variant from "./Variant";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const Product = ({
  index,
  product,
  onAddDiscount,
  onRemove,
  totalProduct,
  showVariant,
  setShowVariant,
  onEdit,
  id,
  title,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex justify-center items-center ">
        <div>
          <DragIndicatorIcon {...listeners} />
        </div>
        <div>
          <div className="pr-4">{`${index}`}.</div>
        </div>
        <div className="border-2 border-black/7 px-3 py-2 flex justify-center items-center shadow-sm">
          <div className="lg:min-w-[12rem] xl:w-[18rem] w-full flex items-center">
            <h3 className="text-sm px-1">{title}</h3>
          </div>
          <div
            className="cursor-pointer text-sm items-center text-center "
            onClick={() => onEdit(id)}
          >
            <ModeEditIcon className="text-customGreen" />
          </div>
        </div>

        <button
          onClick={() => onAddDiscount(id)}
          className="mx-2 py-3 w-full max-w-[15rem] rounded-sm   text-sm bg-customGreen text-white"
        >
          Add Discount
        </button>
        {/* {totalProduct > 1 && (
          <button onClick={() => onRemove(index)} className="m-1 p-1">
            x
          </button>
        )} */}
      </div>
      <div>
        {product?.length > 0 && product[0]?.variants?.length > 0 && (
          <div className="flex flex-col items-end justify-end ">
            <div className="flex my-2">
              <button
                className="text-sm text-blue-600 underline mr-10"
                onClick={() => setShowVariant(showVariant === id ? null : id)}
              >
                {showVariant === id ? "Hide Variant" : "Show Variant"}
              </button>
            </div>

            {showVariant === id ? (
              <div>
                {product[0] && product[0].variants?.length > 0 && (
                  <SortableContext
                    items={product[0]?.variants}
                    strategy={verticalListSortingStrategy}
                  >
                    {product[0]?.variants?.map((variant, index) => (
                      <Variant
                        key={`${variant?.id}`}
                        variant={variant}
                        index={index}
                        onRemove={onRemove}
                      />
                    ))}
                  </SortableContext>
                )}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
