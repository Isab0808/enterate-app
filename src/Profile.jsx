import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./modules/firebase.js";
import texture from "./images/texture-profile.png";
import "./styles/Profile.css";

import { FiLogOut } from "react-icons/fi";
import { RxTable } from "react-icons/rx";

export function Profile() {
  const [user, setUser] = useState(null);

  async function logout() {
    await signOut(auth).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged(async (u) => {
      console.log(u);
      const u2 = {
        displayName: u.displayName,
        email: u.email,
        photoURL: u.photoURL,
      };
      setUser(u2);
    });
  }, []);

  if (!user) {
    return null;
  }
  return (
    <div className="profile" id="profile">
      <div className="texture-profile">
        <a id="logout" onClick={() => logout()}>
          <FiLogOut size={25} />
        </a>
        <div className="profile-img">
          <h3>Profile</h3>
          <img src={user.photoURL} alt="" />
          <h2>{user.displayName}</h2>
          <h4>{user.email}</h4>
        </div>
        <img src={texture} alt="texture-profile" />
      </div>
      <div className="profile-content">
        <div className="options-profile">
          <a>
            <RxTable />
          </a>
          <a>
            <RxTable />
          </a>
        </div>
        <div className="profile-publish"></div>
      </div>
    </div>
  );
}
