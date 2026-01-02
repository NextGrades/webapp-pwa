// import { useState } from "react";

// export function ExamplesTab({ examples }) {
//   const [current, setCurrent] = useState(0);

//   const example = examples[current];

//   return (
//     <div>
//       <div className="flex gap-2 mb-8">
//         {examples.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrent(i)}
//             className={`px-4 py-2 rounded-lg font-bold border
//               ${current === i ? "bg-black text-white" : "text-gray-400"}
//             `}
//           >
//             Example {i + 1}
//           </button>
//         ))}
//       </div>

//       <div className="rounded-3xl border p-8">
//         <h3 className="text-2xl font-black">{example.title}</h3>
//         <p className="font-mono mt-2">{example.problem}</p>

//         <div className="mt-6 space-y-4">
//           {example.steps.map(step => (
//             <div key={step.step}>
//               <p className="text-sm text-gray-500">{step.text}</p>
//               <p className="font-mono font-bold">{step.result}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
