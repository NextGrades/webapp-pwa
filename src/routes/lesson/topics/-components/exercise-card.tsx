// import { useState } from "react";

// export function ExerciseCard({ exercise, index, onAnswer }) {
//   const [selected, setSelected] = useState<any>(null);
//   const [showResult, setShowResult] = useState(false);

//   const isCorrect =
//     exercise.type === "multiple-choice"
//       ? selected === exercise.correct
//       : selected?.toString().trim() === exercise.answer;

//   function verify() {
//     setShowResult(true);
//     onAnswer?.(selected);
//   }

//   return (
//     <div className="border border-gray-100 rounded-2xl p-6 bg-white hover:shadow-md transition-all">
//       {/* Question */}
//       <div className="flex items-center gap-3 mb-4">
//         <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-bold">
//           {index + 1}
//         </span>
//         <p className="font-bold text-lg">{exercise.question}</p>
//       </div>

//       {/* Answers */}
//       <div className="space-y-2 mb-6">
//         {exercise.type === "multiple-choice" ? (
//           exercise.options.map((opt, i) => (
//             <button
//               key={i}
//               onClick={() => setSelected(i)}
//               className={`w-full text-left p-4 rounded-xl border font-medium transition-all
//                 ${
//                   selected === i
//                     ? "border-black bg-black text-white"
//                     : "border-gray-100 text-gray-600 hover:border-gray-200"
//                 }`}
//             >
//               {opt}
//             </button>
//           ))
//         ) : (
//           <input
//             className="w-full p-4 rounded-xl border border-gray-100 font-mono focus:border-black focus:ring-0"
//             placeholder="Type your answer here…"
//             onChange={(e) => setSelected(e.target.value)}
//           />
//         )}
//       </div>

//       {/* Action */}
//       <button
//         onClick={verify}
//         style={{ backgroundColor: "var(--blue-main)" }}
//         className="w-full py-4 rounded-xl text-white font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98]"
//       >
//         Verify Answer
//       </button>

//       {/* Result */}
//       {showResult && (
//         <div
//           className={`mt-4 text-sm font-bold ${
//             isCorrect ? "text-emerald-600" : "text-red-500"
//           }`}
//         >
//           {isCorrect ? "Correct 🎉" : "Try again"}
//         </div>
//       )}
//     </div>
//   );
// }
