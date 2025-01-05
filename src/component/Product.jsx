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
import DiscountModal from "./DiscountModal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloseIcon from "@mui/icons-material/Close";
const Product = ({
  index,
  product,
  onAddDiscount,
  onRemove,
  showVariant,
  setShowVariant,
  onEdit,
  id,
  title,
  handleDiscount,
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
        <div className="border-2 border-black/8 px-3 py-2 flex justify-center items-center shadow-sm">
          <div className=" sm:min-w-[12rem] xl:w-[19rem] w-full flex items-center">
            <h3 className="text-sm px-1">{title}</h3>
          </div>
          <div
            className="cursor-pointer text-sm items-center text-center pr-4"
            onClick={() => onEdit(id)}
          >
            <ModeEditIcon className="text-customGreen" />
          </div>
        </div>
        {product?.discountInputOpen ? (
          <DiscountModal
            discountType={product.typeOfDiscount}
            discountValue={product.valueOfDiscount}
            handleDiscount={handleDiscount}
            productId={product?.id}
          />
        ) : (
          <button
            onClick={() => onAddDiscount(id)}
            className="mx-2 py-3 w-[15rem] max-w-[15rem] rounded-sm   text-sm bg-customGreen text-white"
          >
            Add Discount
          </button>
        )}
        <div>
          <CloseIcon onClick={() => onRemove(id)} />
        </div>
      </div>
      <div>
        {product?.product?.length &&
          product?.product[0]?.variants?.length > 1 && (
            <div className="flex flex-col items-end justify-end ">
              <div className="flex my-2 ">
                <button
                  className="text-sm text-blue-600 underline mr-10 "
                  onClick={() => setShowVariant(showVariant === id ? null : id)}
                >
                  {showVariant === id ? (
                    <div>
                      Hide Variant <ExpandLessIcon />
                    </div>
                  ) : (
                    <div>
                      Show Variant <ExpandMoreIcon />
                    </div>
                  )}
                </button>
              </div>

              {showVariant === id ? (
                <div>
                  {product?.product[0] &&
                    product?.product[0].variants?.length > 0 && (
                      <SortableContext
                        items={product?.product[0]?.variants}
                        strategy={verticalListSortingStrategy}
                      >
                        {product?.product[0]?.variants?.map(
                          (variant, index) => (
                            <Variant
                              key={`${variant?.id}`}
                              variant={variant}
                              index={index + 1}
                              onRemove={onRemove}
                              productId={id}
                            />
                          )
                        )}
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
