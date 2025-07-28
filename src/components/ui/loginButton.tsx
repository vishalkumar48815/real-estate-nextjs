'use client'
import { useState, useEffect } from "react";

export default function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn) return null;

  return (
    <button>Login </button>
  );
}
