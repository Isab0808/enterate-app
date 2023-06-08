import { Media } from "./components/Media.jsx";

import "./styles/ContentMediaMain.css";

export function ContentMediaMain() {
  return (
    <div>
      <div className="screen-box" id="media-content">
        <div className="splitter">
          <Media />
        </div>
      </div>
    </div>
  );
}
