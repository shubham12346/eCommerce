import React, { useState } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Product from "./Product";

const ProductList = ({
  products,
  onRemove,
  onAddDiscount,
  handleReorderVariants,
  onEdit,
}) => {
  // Drag-and-drop logic
  const [showVariant, setShowVariant] = useState("");

  if (!products) return null;

  const handleShowVariant = (id) => {
    setShowVariant(id);
  };
  return (
    <div>
      <SortableContext items={products} strategy={verticalListSortingStrategy}>
        {products?.map((product, index) => (
          <div key={index} className="my-5">
            <Product
              index={index}
              product={product.product}
              onAddDiscount={onAddDiscount}
              onRemove={onRemove}
              totalProduct={products?.length}
              setShowVariant={handleShowVariant}
              showVariant={showVariant}
              handleReorderVariants={handleReorderVariants}
              onEdit={onEdit}
              id={product?.id}
              title={product?.title}
            />
          </div>
        ))}
      </SortableContext>
    </div>
  );
};

export default ProductList;
