import React from "react";

function CategoryButton({ categoryTitle, onClick, backgroundColor }) {
  return (
    <button
      className="border-black border-b-[0.5px] w-full hover:bg-gray-300 px-2"
      style={{
        backgroundColor: backgroundColor,
        textAlign: "left",
      }}
      onClick={onClick}
    >
      {categoryTitle}
    </button>
  );
}

export default CategoryButton;
