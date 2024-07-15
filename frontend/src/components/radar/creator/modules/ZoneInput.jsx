import React from "react";

const ZoneInput = ({ value, index, onChange }) => {
  const borderRadiusStyles = [
    { borderRadius: "100% 0 0 0" },
    { borderRadius: "0 0 0 100%" },
    { borderRadius: "0 100% 0 0" },
    { borderRadius: "0 0 100% 0" },
  ];

  console.log(index, value, "~~~~~~~");

  return (
    <div
      className={`bg-gray-300 p-4 flex justify-center items-center grid-rename-unit-${index}`}
      style={borderRadiusStyles[index]}
    >
      <input
        className="p-1 w-[50%] rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default ZoneInput;
