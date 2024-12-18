import React, { useState } from "react";
import ProductList from "./component/ProductList";
import AddProductButton from "./component/AddProductButton";
import BasicModal from "./component/BasicModal";
import ModalList from "./component/ModalList";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const App = () => {
  const [products, setProducts] = useState([]);
  const [modalId, setModalId] = useState(false);

  const handleAddProduct = () => {
    setProducts([...products, { id: new Date().getTime() }]);
  };

  const handleOnRemove = (productId) => {
    const updatedProducts = products.filter(
      (product, index) => index !== productId
    );
    setProducts(updatedProducts);
  };
  const sensors = useSensors(useSensor(PointerSensor));

  const handleReorderProducts = (activeId, overId) => {
    const oldIndex = products.findIndex((product) => product.id === activeId);
    const newIndex = products.findIndex((product) => product.id === overId);

    setProducts((prevProducts) => arrayMove(prevProducts, oldIndex, newIndex));
  };

  const handleReorderVariants = (productId, activeId, overId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== productId) return product;
  
        // Ensure that we safely access the variants array
        const productCopy = { ...product };
        const variants = [...productCopy.product[0]?.variants];
  
        if (!variants) return productCopy;  // Return the product if variants don't exist
  
        const activeIndex = variants.findIndex((variant) => variant.id === activeId);
        const overIndex = variants.findIndex((variant) => variant.id === overId);
  
        // If either activeIndex or overIndex is invalid, return the product unmodified
        if (activeIndex === -1 || overIndex === -1) return productCopy;
  
        // Swap the variants
        const [removed] = variants.splice(activeIndex, 1);
        variants.splice(overIndex, 0, removed);
  
        // Return a new object with updated variants
        return {
          ...productCopy,
          product: [
            {
              ...productCopy.product[0],
              variants,  // Updated variants array
            },
          ],
        };
      })
    );
  };
  

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeId = active.id; // The item being dragged
    const overId = over.id; // The drop target

    console.log("activeId:", activeId, "overId:", overId);

    // Handle dragging a parent product
    if (products.some((product) => product.id === activeId)) {
      handleReorderProducts(activeId, overId);
      return;
    }

    // Handle dragging a variant
    products.forEach((product) => {
      console.log("product",product)
      const activeVariantIndex = product.product[0]?.variants?.findIndex(
        (variant) => variant.id === activeId
      );
      const overVariantIndex =product?.product[0]?.variants?.findIndex(
        (variant) => variant.id === overId
      );

      // If both active and over are in the same product's variants array
      if (activeVariantIndex > -1 && overVariantIndex > -1) {
        handleReorderVariants(product.id, activeId, overId);
      }
    });
  };
  const onEdit = (productId) => {
    setModalId(productId);
  };
  const handleClose = () => {
    setModalId("");
  };
  const handleUpdateProductList = (product) => {
    const updateObjectInArray = products.map((item) => {
      if (item.id === modalId) {
        return { product: product, id: item?.id, title: product[0]?.title };
      }
      return item;
    });
    setProducts(updateObjectInArray);
  };

  return (
    <div className="flex justify-center items-center border-2 inline-block border-gray-500 py-10 w-1/2 m-auto">
      <div className="w-full">
        <h1 className="text-sm">E-Commerce Product List</h1>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <ProductList
            products={products}
            onRemove={handleOnRemove}
            handleReorderVariants={handleReorderVariants}
            onEdit={onEdit}
          />
          <div className="flex justify-end">
            <AddProductButton
              onAdd={handleAddProduct}
              btnText={"Add Product"}
              classNames={
                " px-28 py-1 border-2 border-green-800 font-normal text-green-800  text-sm "
              }
            />
          </div>
        </DndContext>
        <BasicModal open={modalId ? true : false}>
          <ModalList
            handleClose={handleClose}
            handleUpdateProductList={handleUpdateProductList}
          />
        </BasicModal>
      </div>
    </div>
  );
};

export default App;
