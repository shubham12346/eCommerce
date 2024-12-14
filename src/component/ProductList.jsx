import React, { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Product from "./Product";
const ItemType = "PRODUCT"; // Defining the type for drag-and-drop items

const ProductList = ({
  products,
  onRemove,
  onAddDiscount,
  handleReorderVariants,
  onEdit
}) => {
  // Drag-and-drop logic
  const [showVariant, setShowVariant] = useState("");

  console.log("product", products);
  if (!products) return null;

  const handleShowVariant = (id) => {
    setShowVariant(id);
  };
  return (
    <div>
      <SortableContext items={products} strategy={verticalListSortingStrategy}>
        {products?.map((product, index) => (
          <div key={product?.id} className="my-5">
            <Product
              index={index}
              product={product}
              onAddDiscount={onAddDiscount}
              onRemove={onRemove}
              totalProduct={products?.length}
              setShowVariant={handleShowVariant}
              showVariant={showVariant}
              handleReorderVariants={handleReorderVariants}
              onEdit ={onEdit}
            />
          </div>
        ))}
      </SortableContext>
    </div>
  );
};

export default ProductList;
