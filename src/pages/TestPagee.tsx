// const BOX_HEIGHT = 110;
// const CONTAINER_HEIGHT = 400;
// const dummyData = Array.from({ length: 20 }, (_, i) => `Box ${i + 1}`);

// const COLUMN_COUNT = Math.floor(CONTAINER_HEIGHT / BOX_HEIGHT);
// const columns: string[][] = Array.from(
//   { length: Math.ceil(dummyData.length / COLUMN_COUNT) },
//   (_, colIdx) =>
//     dummyData.slice(colIdx * COLUMN_COUNT, (colIdx + 1) * COLUMN_COUNT)
// );

// const TestPagee = () => {
//   return (
//     <div className="p-5 font-sans">
//       <h1 className="mb-4 text-2xl">Test Page</h1>
//       <div
//         className="h-[400px] bg-gray-100 p-2"
//         style={{
//           columnCount: 2, // 컬럼 개수는 필요에 따라 조정
//           columnGap: "16px",
//         }}
//       >
//         {dummyData.map((item, idx) => (
//           <div
//             key={idx}
//             className="mb-4 w-[110px] h-[200px] bg-white rounded-lg shadow flex items-center justify-center font-bold break-inside-avoid"
//           >
//             {item}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TestPagee;
