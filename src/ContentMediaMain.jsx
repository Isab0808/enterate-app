import { Header } from "./components/Header.jsx";
import { Media } from "./components/Media.jsx";
import { Menu } from "./components/Menu.jsx";

import "./styles/ContentMediaMain.css";

export function ContentMediaMain() {
  return (
    <div>
      <div className="screen-box" id="media-content">
        <div className="splitter">
          <Header />
        </div>
      </div>
    </div>
  );
}
