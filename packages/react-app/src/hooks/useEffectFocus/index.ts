import React, { useState } from "react";

export function useEffectFocus() {
  const [focus, setFocus] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFocus(event.target.value);
  };
  return {
    value: focus,
    onChange: handleChange,
  };
}
