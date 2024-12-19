import React from "react";
import InfoIcon from "@mui/icons-material/Info";
const ProductHeading = () => {
  return (
    <div>
      <div className="font-semibold mt-10">
        <h1 className="pb-1 pl-2 ">
          {`Add Bundled Products (Max. 4 Products)`}{" "}
        </h1>
        <div className="pl-1">
          <span className="pr-1">
            <InfoIcon
              className="bg-white text-yellow-400 "
              sx={{ height: "18px" }}
            />
          </span>
          <span className="font-thin text-[0.8rem] ">
            Offer bundle will shown to the customer whenever any of the bundle
            products are added to the cart
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ProductHeading;
