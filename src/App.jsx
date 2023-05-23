import React, { useState, useEffect } from "react";
import { auth } from "./modules/firebase.js";

import { Login } from "./Login.jsx";
import { Menu } from "./components/Menu.jsx";
import { Loading } from "./components/Loading.jsx";

import { AddNews } from "./AddNews.jsx";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setIsLoading(false);
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  let content;
  if (isLoading) {
    content = <Loading />;
  } else if (isLoggedIn) {
    content = <Menu />;
  } else {
    content = <Login />;
  }
  return (
    <div>
      <AddNews />
    </div>
  );
}
