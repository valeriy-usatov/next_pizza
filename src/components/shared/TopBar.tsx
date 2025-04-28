import React from "react";
import Categories from "./Categories";
import SortPopup from "./SortPopup";

const TopBar = () => {
  return (
    <div className="sticky top-0  bg-white py-5  z-10">
      <div className="flex justify-between items-center">
        <Categories />
        <SortPopup />
      </div>
    </div>
  );
};

export default TopBar;
