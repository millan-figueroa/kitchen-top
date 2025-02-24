import React, { JSX } from "react";

export default function Input(): JSX.Element {
  return (
    <div className="flex justify-items-center p-10 bg-slate-100">
      <input
        className="w-[800] h-12 border-2 p-2 mr-2 border-gray-300 rounded-md"
        placeholder="e.g oregano"
      />
      <button className="w-48 h-12 p-1 bg-gray-800 rounded-md text-sm sm:text-base lg:text-lg">
        <span className="block sm:hidden">+ Add</span>
        <span className="hidden sm:block">+ Add ingredient</span>
      </button>
    </div>
  );
}
