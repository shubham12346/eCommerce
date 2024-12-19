import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center py-2 px-4 border-b-2 border-gray-200 mb-3">
      <div>
        <h1 className="text-[1rem] font-semibold">Offer Funnel</h1>
      </div>
      <div className="flex  text-[0.7rem] text-black/50 justify-center items-center">
        <span className="underline">Support</span>
        <span className="px-1 text-black">|</span>
        <span className="underline">Talk to an Expert</span>
      </div>
    </div>
  );
};

export default Header;
