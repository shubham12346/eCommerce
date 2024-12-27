import React, { useState } from "react";
import ProductList from "./component/ProductList";
import AddProductButton from "./component/AddProductButton";
import BasicModal from "./component/BasicModal";
import ModalList from "./component/ModalList";
import Header from "./component/Header";
import ProductHeading from "./component/ProductHeading";
import DiscountDesc from "./component/DiscountDesc";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Footer from "./component/Footer";

const App = () => {
  const [products, setProducts] = useState([]);
  const [modalId, setModalId] = useState(false);

  const handleAddProduct = () => {
    if (products?.length < 5) {
      setProducts([...products, { id: new Date().getTime() }]);
    }
  };

  const handleOnRemove = (productId, variantId) => {
    let UpdatedProduct;
    if (!variantId) {
      UpdatedProduct = products.filter((item) => item.id !== productId);
    } else {
      UpdatedProduct = products.map((product) => {
        if (product.id !== productId) return product; // Skip products that don't match

        // Ensure that product and variants exist
        const productCopy = { ...product };
        const currentProduct = productCopy.product[0]; // Access the first product object
        if (!currentProduct || !currentProduct.variants) return productCopy;

        // Filter the variants array
        const updatedVariants = currentProduct.variants.filter(
          (variant) => variant.id !== variantId
        );

        return {
          ...productCopy,
          product: [
            {
              ...currentProduct,
              variants: updatedVariants, // Correctly update the variants key
            },
          ],
        };
      });
    }

    setProducts(UpdatedProduct);
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

        if (!variants) return productCopy; // Return the product if variants don't exist

        const activeIndex = variants.findIndex(
          (variant) => variant.id === activeId
        );
        const overIndex = variants.findIndex(
          (variant) => variant.id === overId
        );

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
              variants, // Updated variants array
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

    // Handle dragging a parent product
    if (products.some((product) => product.id === activeId)) {
      handleReorderProducts(activeId, overId);
      return;
    }

    // Handle dragging a variant
    products.forEach((product) => {
      const activeVariantIndex = product.product[0]?.variants?.findIndex(
        (variant) => variant.id === activeId
      );
      const overVariantIndex = product?.product[0]?.variants?.findIndex(
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
        return {
          product: product,
          id: item?.id,
          title: product[0]?.title,
          typeOfDiscount: "",
          valueOfDiscount: "",
          discountInputOpen: false,
        };
      }
      return item;
    });
    setProducts(updateObjectInArray);
  };

  const handleDiscount = (productId, type, value) => {
    let newProducts = products?.map((item) => {
      if (item?.id === productId) {
        return {
          ...item,
          discountInputOpen: true,
          typeOfDiscount:
            type === "discountType" ? value : item?.typeOfDiscount,
          valueOfDiscount:
            type === "discountType" ? item?.valueOfDiscount : value,
        };
      }
      return item;
    });
    setProducts(newProducts);
  };

  const handleAddDiscount = (productId) => {
    let newProducts = products?.map((item) => {
      if (item?.id === productId) {
        return {
          ...item,
          discountInputOpen: !item?.discountInputOpen,
        };
      }
      return item;
    });
    setProducts(newProducts);
  };

  return (
    <div className="flex flex-col justify-center items-center  py-10 sm:w-full lg:w-[50vw] m-auto">
      <div className="w-full px-4">
        <Header />
        <div className="px-6">
          <ProductHeading />
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
              onAddDiscount={handleAddDiscount}
              handleDiscount={handleDiscount}
            />
            <div className="flex justify-end ">
              {products?.length == 4 ? null : (
                <AddProductButton
                  onAdd={handleAddProduct}
                  btnText={"Add Product"}
                  classNames={` px-28 py-1 border-2  font-normal  text-sm border-green-800 text-green-800  `}
                />
              )}
            </div>
          </DndContext>
        </div>
        <BasicModal open={modalId ? true : false}>
          <ModalList
            handleClose={handleClose}
            handleUpdateProductList={handleUpdateProductList}
          />
        </BasicModal>
      </div>
      <DiscountDesc />
      <Footer />
    </div>
  );
};

export default App;
