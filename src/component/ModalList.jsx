import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import SearchListItem from "./SearchListItem";
import { fetchProducts } from "../services/api";
import CircularProgress from "@mui/material/CircularProgress";

const ModalList = ({ handleClose }) => {
  const [productList, setProductList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkedItem, setCheckedItem] = useState([]);

  const handleSearchList = (event) => {
    event.preventDefault();
    setLoading(true);
    const value = event.target.value;
    setSearchKeyword(value);
  };

  useEffect(() => {
    let timeout;
    timeout = setTimeout(async () => {
      if (searchKeyword.length) {
        try {
          const res = await fetchProducts(searchKeyword, page, 50);
          const refactoredRes = addCheckedKeyInTHeResponseList(res);
          setProductList([...refactoredRes]);
          setLoading(false);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchKeyword]);

  const addCheckedKeyInTHeResponseList = (res) => {
    const newRes = res?.map((item) => {
      item.checked = false;

      if (Array.isArray(item?.variants)) {
        item.variants = item.variants.map((variant) => {
          variant.checked = false;
          return variant;
        });
      }

      return item;
    });
    return newRes;
  };

  // const handleCheckedItem = (productId, variantId) => {
  //   setProductList((prev) => {
  //     prev?.map((item) => {
  //       if (item?.id === productId) {
  //         if (Array.isArray(item?.variants)) {
  //           item.variants.map((variant) => {
  //             if (variant.id === variantId) {
  //               variant.checked = !variant.checked;
  //             }
  //           });
  //         }
  //         return {
  //           ...item,
  //           checked: !item?.checked,
  //         };
  //       }
  //       return item;
  //     });
  //   });
  // };

  const handleCheckedItem = (product, variantId = null) => {
    console.log("productId", product, "variantId", variantId);
    const newArr = productList.map((item) => {
      if (item.id === product?.id) {
        // Toggle the parent product
        const isParentChecked = !item.checked;

        // If variantId is null, toggle all child variants with the parent
        if (!variantId) {
          console.log("isParentChecked", isParentChecked);
          return {
            ...item,
            checked: isParentChecked,
            variants: item?.variants?.map((variant) => ({
              ...variant,
              checked: isParentChecked,
            })),
          };
        }
        console.log("isParentChecked", isParentChecked);

        // Toggle specific child variant
        return {
          ...item,
          variants: item.variants.map((variant) =>
            variant.id === variantId
              ? { ...variant, checked: !variant.checked }
              : variant
          ),
          // If all child variants are selected, mark parent as checked
          checked: item.variants.every(
            (variant) => variant.id === variantId || variant.checked
          ),
        };
      }
      return item;
    });
    setProductList(newArr);
    console.log("newArr", newArr);
  };

  return (
    <div className=" w-[100%]  relative h-[70vh] py-2 rounded-lg">
      <div className="flex justify-between border-b-[1px] border-black py-2 px-4">
        <h2 className="text-[1rem] font-[600] pb-4 ">Add products</h2>
        <CloseIcon onClick={handleClose} />
      </div>
      <div className="mt-3 py-2 px-4">
        <TextField
          id=""
          label=""
          defaultValue="Hello"
          className="w-[35rem] py-2"
          value={searchKeyword}
          onChange={handleSearchList}
        />
      </div>
      <div className="">
        {loading ? (
          <div className=" my-10 flex items-center justify-center ">
            <CircularProgress />
          </div>
        ) : (
          <div>
            {productList?.map((product) => (
              <div key={product?.id}>
                <SearchListItem
                  checked={product?.checked}
                  itemQuantity={""}
                  label={product?.title}
                  price={""}
                  src={product?.image?.src}
                  product={product}
                  handleOnChange={handleCheckedItem}
                />
              </div>
            ))}
            <div className="absolute flex p-2 bg-gray-100 justify-end ">
              <button
                className=" py-2 px-4 bg-[#3f51b5] text-[white] font-[1rem] hover:bg-[#283593]"
                onClick={() => handleClose()}
              >
                Close
              </button>
              <button
                className=" py-2 px-4 ml-2 bg-[#4caf50] text-[white] font-[1rem] hover:bg-[#388e3c]"
                onClick={() => handleClose()}
              >
                Add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalList;
