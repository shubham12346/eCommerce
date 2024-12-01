import React, { useState } from "react";
import ProductList from "./component/ProductList";
import AddProductButton from "./component/AddProductButton";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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

  return (
    <div className="flex justify-center items-center border-2 inline-block border-gray-500 py-10 w-1/2 m-auto">
      <div>
        <h1 className="text-sm">E-Commerce Product List</h1>
        <DndProvider backend={HTML5Backend}>
          <ProductList products={products} onRemove={handleOnRemove} />
        </DndProvider>
        <div className="flex justify-end">
          <AddProductButton
            onAdd={handleAddProduct}
            btnText={"Add Product"}
            classNames={
              " px-28 py-1 border-2 border-green-800 font-normal text-green-800  text-sm "
            }
          />
        </div>
      </div>
    </div>
  );
};

export default App;
