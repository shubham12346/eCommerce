import React, { useState } from "react";
import ProductList from "./component/ProductList";
import AddProductButton from "./component/AddProductButton";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const App = () => {
  const [products, setProducts] = useState([
    {
      id: 77,
      title: "Fog Linen Chambray Towel - Beige Stripe",
      variants: [
        {
          id: 1,
          product_id: 77,
          title: "XS / Silver",
          price: "49",
        },
        {
          id: 2,
          product_id: 77,
          title: "S / Silver",
          price: "49",
        },
        {
          id: 3,
          product_id: 77,
          title: "M / Silver",
          price: "49",
        },
      ],
      image: {
        id: 266,
        product_id: 77,
        src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1",
      },
    },
    {
      id: 80,
      title: "Orbit Terrarium - Large",
      variants: [
        {
          id: 64,
          product_id: 80,
          title: "Default Title",
          price: "109",
        },
      ],
      image: {
        id: 272,
        product_id: 80,
        src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
      },
    },
  ]);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        id: Date.now(),
        title: "Orbit Terrarium - Large",
        variants: [
          {
            id: 64,
            product_id: 80,
            title: "Default Title",
            price: "109",
          },
        ],
        image: {
          id: 272,
          product_id: 80,
          src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1",
        },
      },
    ]);
  };

  const handleOnRemove = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setProducts((prevProducts) => {
        const oldIndex = prevProducts.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = prevProducts.findIndex((item) => item.id === over.id);

        return arrayMove(prevProducts, oldIndex, newIndex);
      });
    }
  };

  const handleReorderVariants = (productId, activeId, overId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          const variants = [...product.variants];
          const oldIndex = variants.findIndex((v) => v.id === activeId);
          const newIndex = variants.findIndex((v) => v.id === overId);
          const [movedVariant] = variants.splice(oldIndex, 1);
          variants.splice(newIndex, 0, movedVariant);
          return { ...product, variants };
        }
        return product;
      })
    );
  };
  const handleReorderVariants = (productId, activeId, overId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          const variants = [...product.variants];
          const oldIndex = variants.findIndex((v) => v.id === activeId);
          const newIndex = variants.findIndex((v) => v.id === overId);
          const [movedVariant] = variants.splice(oldIndex, 1);
          variants.splice(newIndex, 0, movedVariant);
          return { ...product, variants };
        }
        return product;
      })
    );
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Check if the drag was inside a variant
    const draggedProduct = products.find((product) =>
      product.variants.some((variant) => variant.id === activeId)
    );

    if (draggedProduct) {
      handleReorderVariants(draggedProduct.id, activeId, overId);
    }
  };

  return (
    <div className="flex justify-center items-center border-2 inline-block border-gray-500 py-10 w-1/2 m-auto">
      <div>
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
      </div>
    </div>
  );
};

export default App;
