import React, { JSX } from "react";

export default function Input(): JSX.Element {
  return (
    <div>
      <input placeholder="e.g oregano"></input>
      <button>+ Add ingredient</button>
    </div>
  );
}
