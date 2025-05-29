"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js"); // ✅ Loads Bootstrap JS in the browser
  }, []);

  return null;
}
