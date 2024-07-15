export default function SVGRadarComponent({
  radius = 80,
  zone = 1,
  setZone,
  setResultZone,
}) {
  const diameter = radius * 2;
  const padding = 20;
  const totalSize = diameter + padding * 2;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={totalSize}
      height={totalSize}
      viewBox={`${-padding} ${-padding} ${totalSize} ${totalSize}`}
    >
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="200%" height="200%">
          <feDropShadow
            dx="4"
            dy="4"
            stdDeviation="10"
            floodColor="#000000"
            floodOpacity="0.5"
          />
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        style={{ cursor: "pointer" }}
        d={`M${radius},${radius} L${radius},${
          radius - radius
        } A${radius},${radius} 0 0,1 ${radius * 2},${radius} Z`}
        fill={zone !== "H004" ? "rgba(0,0,0,0.25)" : "#0056b3"}
        filter="url(#shadow)"
        onMouseEnter={(e) => (e.currentTarget.style.filter = "url(#glow)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "url(#shadow)")}
        onClick={() => {
          setZone("H004");
          setResultZone("H004");
        }}
      />
      <path
        style={{ cursor: "pointer" }}
        d={`M${radius},${radius} L${
          radius * 2
        },${radius} A${radius},${radius} 0 0,1 ${radius},${radius * 2} Z`}
        fill={zone !== "H003" ? "rgba(0,0,0,0.3)" : "#0056b3"}
        filter="url(#shadow)"
        onMouseEnter={(e) => (e.currentTarget.style.filter = "url(#glow)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "url(#shadow)")}
        onClick={() => {
          setZone("H003");
          setResultZone("H003");
        }}
      />
      <path
        style={{ cursor: "pointer" }}
        d={`M${radius},${radius} L${radius},${
          radius * 2
        } A${radius},${radius} 0 0,1 ${radius - radius},${radius} Z`}
        fill={zone !== "H002" ? "rgba(0,0,0,0.35)" : "#0056b3"}
        filter="url(#shadow)"
        onMouseEnter={(e) => (e.currentTarget.style.filter = "url(#glow)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "url(#shadow)")}
        onClick={() => {
          setZone("H002");
          setResultZone("H002");
        }}
      />
      <path
        style={{ cursor: "pointer" }}
        d={`M${radius},${radius} L${
          radius - radius
        },${radius} A${radius},${radius} 0 0,1 ${radius},${radius - radius} Z`}
        fill={zone !== "H001" ? "rgba(0,0,0,0.4)" : "#0056b3"}
        filter="url(#shadow)"
        onMouseEnter={(e) => (e.currentTarget.style.filter = "url(#glow)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "url(#shadow)")}
        onClick={() => {
          setZone("H001");
          setResultZone("H001");
        }}
      />
      <style>
        {`
        @keyframes shadowPulse {
          0%, 100% {
            filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.2));
          }
          50% {
            filter: drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.9));
          }
        }
        path {
          animation: shadowPulse 1.5s infinite;
        }
      `}
      </style>
    </svg>
  );
}

// export default function SVGRadarComponent({
//   radius = 80,
//   zone = 1,
//   setZone,
//   setResultZone,
// }) {
//   const diameter = radius * 2;
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width={diameter} height={diameter}>
//       <defs>
//         <filter id="shadow" x="-20%" y="-20%" width="200%" height="200%">
//           <feDropShadow
//             dx="1"
//             dy="1"
//             stdDeviation="5"
//             floodColor="#000000"
//             floodOpacity="0.5"
//           />
//         </filter>
//       </defs>
// <path
//   d={`M${radius},${radius} L${radius},${
//     radius - radius
//   } A${radius},${radius} 0 0,1 ${radius * 2},${radius} Z`}
//   fill={zone !== "H004" ? "rgba(0,0,0,0.25)" : "#0056b3"}
//   filter="url(#shadow)"
//   onClick={() => {
//     setZone("H004");
//     setResultZone("H004");
//   }}
// />
// <path
//   d={`M${radius},${radius} L${
//     radius * 2
//   },${radius} A${radius},${radius} 0 0,1 ${radius},${radius * 2} Z`}
//   fill={zone !== "H003" ? "rgba(0,0,0,0.3)" : "#0056b3"}
//   filter="url(#shadow)"
//   onClick={() => {
//     setZone("H003");
//     setResultZone("H003");
//   }}
// />
// <path
//   d={`M${radius},${radius} L${radius},${
//     radius * 2
//   } A${radius},${radius} 0 0,1 ${radius - radius},${radius} Z`}
//   fill={zone !== "H002" ? "rgba(0,0,0,0.35)" : "#0056b3"}
//   filter="url(#shadow)"
//   onClick={() => {
//     setZone("H002");
//     setResultZone("H002");
//   }}
// />
// <path
//   d={`M${radius},${radius} L${
//     radius - radius
//   },${radius} A${radius},${radius} 0 0,1 ${radius},${radius - radius} Z`}
//   fill={zone !== "H001" ? "rgba(0,0,0,0.4)" : "#0056b3"}
//   filter="url(#shadow)"
//   onClick={() => {
//     setZone("H001");
//     setResultZone("H001");
//   }}
// />
//     </svg>
//   );
// }
