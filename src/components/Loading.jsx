import logo from "../images/logo.png";
import textura from "../images/texture.png";

import "../styles/App.css";

export function Loading() {
  return (
    <div className="app">
      <div className="content-loading" id="content">
        <div className="start-screen" id="loader">
          <div className="logo">
            <img src={logo} alt="Not Found" className="inicio" />
          </div>
          <div className="loader">
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="textura">
            <img src={textura} alt="Not Found" className="inicio" />
          </div>
        </div>
      </div>
    </div>
  );
}
