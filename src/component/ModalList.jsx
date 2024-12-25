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
   const [page ,setPage] = useState(1)
   const [isFetchingMore, setIsFetchingMore] = useState(false);
   const [noNextData ,setNoNextData] = useState(false)
   const [checkedItem ,setCheckedItem] = useState(0) 
   const {  SearchCached } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleSearchList = (event) => {
    event.preventDefault();
    setLoading(true);
    const value = event.target.value;
    setSearchKeyword(value);
    setPage(1); 
    setNoNextData(false)

  };



  useEffect(() => {
    let timeout
    if (searchKeyword) {
       timeout = setTimeout(() => {
        fetchData(searchKeyword, page);
      }, 1000);
      
    }
    return () => clearTimeout(timeout);
  }, [searchKeyword, page]);

  const fetchData = async (keyword, page) => {
    if(page===1){
      setLoading(true)
    }
    try {
      const cached = SearchCached[keyword];
      if (page === 1 && cached) {
        dispatch(setProducts(cached));
        setProductList(cached);
      } else {
         if(!noNextData){
          const res = await fetchProducts(keyword, 10, page);
        if(!res){
          setNoNextData(true)
        }
        const refactoredRes = addCheckedKeyInTHeResponseList(res);
        setProductList((prev) => (page === 1 ? refactoredRes : [...prev, ...refactoredRes]));
        dispatch(setProducts(refactoredRes));
        dispatch(
          addSearchItemsToList({
            searchKeyword: keyword,
            res: refactoredRes,
          })
        )
         }
        
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 50 && !isFetchingMore && !loading) {
      setIsFetchingMore(true);
      setPage((prev) => prev + 1); // Fetch next page
    }
  };

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
          setCheckedItem((prev)=> isParentChecked?prev+1:prev-1)

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
        checkedItems?.push(item);
      } else if (item?.variants?.length) {
        const newItems = item?.variants?.filter((variant) => variant.checked);
        checkedItems = [...checkedItems, ...newItems];
      }
    });
    handleUpdateProductList(checkedItems);
    handleClose();
    setCheckedItem(0)
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

      <div className="flex-1 overflow-auto  mb-[4rem]    scrollbar-thumb-slate-400  scrollbar-track-transparent no-scroll-arrows  scrollbar-track-head"  onScroll={handleScroll}>
        {loading ? (
          <div className="my-10 flex items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div>
            
            {productList?.map((product) => (
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
            {isFetchingMore &&  <div className="my-10 flex items-center justify-center">
            <CircularProgress />
          </div>}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full flex p-2 py-4 px-3 bg-gray-100 justify-between shadow-lg">
        <div>
           <div className="text-black">{`${checkedItem} products selected`}</div> 
        </div>
        <div>
        <button
          className="py-1 px-4 border-[1px] border-black/70 text-black font-[1rem] shadow-lg rounded-md"
          onClick={() => handleClose()}
        >
          Cancel
        </button>
        <button
          className={` ml-2  text-[white] font-[1rem] shadow-lg rounded-md py-1 px-4 ${checkedItem===0?'bg-gray-400 ':' bg-customGreen'}`}
          onClick={() => addCheckedItemToCart()}
          disabled ={checkedItem===0}
        >
          Add
        </button>
        </div>
       
      </div>
    </div>
  );
};

export default ModalList;
