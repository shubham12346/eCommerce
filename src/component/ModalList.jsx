import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import SearchListItem from "./SearchListItem";
import { fetchProducts } from "../services/api";
import CircularProgress from "@mui/material/CircularProgress";
import "./modal.css";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useSelector, useDispatch } from "react-redux";
import { addSearchItemsToList, setProducts } from "../services/searchService";

const ModalList = ({ handleClose, handleUpdateProductList }) => {
  const [productList, setProductList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const { products, SearchCached } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleSearchList = (event) => {
    event.preventDefault();
    setLoading(true);
    const value = event.target.value;
    setSearchKeyword(value);
  };
  console.log("products", products, "SearchCached", SearchCached);
  useEffect(() => {
    let timeout;
    timeout = setTimeout(async () => {
      try {
        const cached = SearchCached[searchKeyword];
        if (cached) {
          dispatch(setProducts(cached));
        } else {
          const res = await fetchProducts(searchKeyword, 50);
          const refactoredRes = addCheckedKeyInTHeResponseList(res);
          dispatch(setProducts(refactoredRes));
          dispatch(
            addSearchItemsToList({
              searchKeyword: searchKeyword,
              res: refactoredRes,
            })
          );
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
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

  const handleCheckedItem = (product, variantId = null) => {
    const newArr = productList.map((item) => {
      if (item.id === product?.id) {
        // Toggle the parent product
        const isParentChecked = !item.checked;

        // If variantId is null, toggle all child variants with the parent
        if (!variantId) {
          return {
            ...item,
            checked: isParentChecked,
            variants: item?.variants?.map((variant) => ({
              ...variant,
              checked: isParentChecked,
            })),
          };
        }

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
  };

  const addCheckedItemToCart = () => {
    let checkedItems = [];

    productList.forEach((item) => {
      if (item?.checked) {
        checkedItems.push(item);
      } else if (item?.variants?.length) {
        const newItems = item?.variants?.filter((variant) => variant.checked);
        checkedItems = [...checkedItems, ...newItems];
      }
    });
    handleUpdateProductList(checkedItems);
    handleClose();
  };

  return (
    <div className="w-[100%] relative h-[70vh] py-2 rounded-lg flex flex-col">
      <div className="flex justify-between border-b-[1px] border-black/9 py-2 px-4">
        <h2 className="text-[1rem] font-[600] pb-4 ">Add products</h2>
        <CloseIcon onClick={handleClose} className="cursor-pointer" />
      </div>

      <div className="mt-2  px-4  pb-2 border-b-[1px] border-black/9 ">
        <TextField
          defaultValue="Hello"
          className="w-[30rem]  text-[0.8rem]"
          sx={{
            "& .MuiInputBase-root": {
              height: "34px", // Adjust the height
            },
          }}
          placeholder="Search Product"
          value={searchKeyword}
          onChange={handleSearchList}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      <div className="flex-1 overflow-auto px-4 mb-[4rem] ">
        {loading ? (
          <div className="my-10 flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div>
            {products?.map((product) => (
              <div key={product?.id}>
                <SearchListItem
                  checked={product?.checked}
                  itemQuantity=""
                  label={product?.title}
                  price=""
                  src={product?.image?.src}
                  product={product}
                  handleOnChange={handleCheckedItem}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full flex p-2 bg-gray-100 justify-end">
        <button
          className="py-2 px-4 bg-[#3f51b5] text-[white] font-[1rem] hover:bg-[#283593]"
          onClick={() => handleClose()}
        >
          Close
        </button>
        <button
          className="py-2 px-4 ml-2 bg-[#4caf50] text-[white] font-[1rem] hover:bg-[#388e3c]"
          onClick={() => addCheckedItemToCart()}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ModalList;
