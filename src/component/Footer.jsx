import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Footer = () => {
  return (
    <div className="w-full flex justify-between items-center px-10 border-t-2 ">
      <div className="flex justify-between items-center py-1 shadow-lg mt-2 rounded px-1 border-[1px] border-black/7 cursor-pointer">
        <ArrowBackIosIcon sx={{ height: "15px" }} />
        <div>Back</div>
      </div>
      <div className="flex py-1 bg-customGreen shadow-lg mt-2 rounded px-1 cursor-pointer">
        <div>Next</div>
        <NavigateNextIcon />
      </div>
    </div>
  );
};

export default Footer;
