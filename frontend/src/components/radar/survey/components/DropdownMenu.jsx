import React, { useState } from "react";

function DropdownMenu({ list, setResultZone, resultZone }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    setResultZone(item);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu">
      <button onClick={() => setIsOpen(!isOpen)}>
        {resultZone || "請選擇"}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {list.map((item, index) => (
            <li key={index} onClick={() => handleSelect(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;

// import React, { useState } from "react";

// function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });

//   const setValue = (value) => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return [storedValue, setValue];
// }

// function DropdownMenu({ list, resultZone, setResultZone }) {
//   const tlist = list;
//   const [menuVisible, setMenuVisible] = useLocalStorage("menuVisible", false);
//   const toggleMenu = () => {
//     setMenuVisible(!menuVisible);
//   };

//   return (
//     <div className="relative inline-block text-left">
//       <div>
//         <button
//           type="button"
//           onClick={toggleMenu}
//           className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//           id="menu-button"
//           aria-expanded={menuVisible}
//           aria-haspopup="true"
//         >
//           {resultZone || "選擇單位"}
//           <svg
//             className="-mr-1 h-5 w-5 text-gray-400"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//             aria-hidden="true"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>

//       {menuVisible && (
//         <div
//           className=" overflow-y-auto max-h-[30vh] absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//           role="menu"
//           aria-orientation="vertical"
//           aria-labelledby="menu-button"
//           tabIndex="-1"
//         >
//           <div className="py-1" role="none">
//             {tlist.map((text, index) => {
//               return (
//                 <div
//                   key={text + index}
//                   className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-500 hover:bg-opacity-10 cursor-pointer"
//                   role="menuitem"
//                   tabIndex="-1"
//                   onClick={() => setResultZone(text)}
//                 >
//                   {text}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DropdownMenu;
