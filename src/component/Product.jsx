import React from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Variant from "./Variant";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Product = ({
  index,
  product,
  onAddDiscount,
  onRemove,
  totalProduct,
  showVariant,
  setShowVariant,
  handleReorderVariants,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product?.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div className="flex">
        <div>
          <DragIndicatorIcon {...listeners} />
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

        <button
          onClick={() => onAddDiscount(product?.id)}
          className="mx-2 p-2 border-2 border-black  text-sm"
        >
          Add Discount
        </button>
        {totalProduct > 1 && (
          <button onClick={() => onRemove(product?.id)} className="m-1 p-1">
            x
          </button>
        )}
      </div>
      <div>
        {product?.variants?.length > 1 && (
          <div className="flex flex-col items-end justify-end ">
            <div className="flex my-2">
              <button
                className="text-sm text-blue-600 underline mr-10"
                onClick={() =>
                  setShowVariant(
                    showVariant === product?.id ? null : product?.id
                  )
                }
              >
                {showVariant === product?.id ? "Hide Variant" : "Show Variant"}
              </button>
            </div>

            {showVariant === product?.id ? (
              <div className="">
                <SortableContext
                  items={product.variants}
                  strategy={verticalListSortingStrategy}
                >
                  {product?.variants.map((variant, index) => (
                    <Variant
                      key={`${variant?.id}`}
                      variant={variant}
                      index={index}
                      onRemove={onRemove}
                    />
                  ))}
                </SortableContext>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
