import React, { useState, useEffect } from "react";
import "../styles/Menu.css";
import { TiHome } from "react-icons/ti";
import { HiPlus } from "react-icons/hi";
import { FaUser } from "react-icons/fa";

import { ContentMediaMain } from "../ContentMediaMain.jsx";
import { Profile } from "../Profile.jsx";
import { CreateContent } from "../CreateContent";

export function Menu() {
  const [isMedia, setMedia] = useState(true);
  const [isProfile, setProfile] = useState(false);
  const [isAdd, setAdd] = useState(false);
  //const [isLoading, setIsLoading] = useState(true);

  function change(option) {
    if (option == "profile") {
      setProfile(true);
      setMedia(false);
      setAdd(false);
    } else if (option == "media") {
      setProfile(false);
      setMedia(true);
      setAdd(false);
    } else if (option == "add") {
      setProfile(false);
      setMedia(false);
      setAdd(true);
    }
  }

  let content;
  if (isMedia) {
    content = <ContentMediaMain />;
  } else if (isProfile) {
    content = <Profile />;
  } else if (isAdd) {
    content = <CreateContent />;
  }

  let navbar = (
    <div className="wrapper">
      <nav className="navbar">
        <div className="navbar__item -purple">
          <a
            id="profile-btn"
            className="navbar__icon"
            onClick={() => change("profile")}
          >
            <svg className="icon">
              <FaUser size={25} />
            </svg>
          </a>
        </div>
        <div className="navbar__item -blue">
          <a id="home" className="navbar__icon" onClick={() => change("media")}>
            <svg className="icon">
              <TiHome size={30} />
            </svg>
          </a>
        </div>
        <div className="navbar__item -navy-blue">
          <a
            id="add-news"
            className="navbar__icon"
            onClick={() => change("add")}
          >
            <svg className="icon">
              <HiPlus size={30} />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  );

  return (
    <div>
      <div className="app">
        <div className="content" id="content">
          {content}
        </div>
        {navbar}
      </div>
    </div>
  );
}
