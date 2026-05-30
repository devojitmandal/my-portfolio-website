"use client";

import { useEffect } from "react";

export function ScrollReset() {
  useEffect(() => {
    // 1. Tell the browser to stop remembering scroll positions
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    
    // 2. Force the viewport to the absolute top-left
    window.scrollTo(0, 0);
  }, []);

  return null; // This component is invisible
}