import { ImSearch } from "react-icons/im";
import { useState, useEffect } from "react";

import { Media } from "./Media";
import { Trend } from "./Trend";

import "../styles/Header.css";

export function Header() {
  const [isMedia, setMedia] = useState(true);
  const [isTrend, setTrend] = useState(false);

  function change(option) {
    if (option == "media") {
      setTrend(false);
      setMedia(true);
    } else if (option == "trend") {
      setTrend(true);
      setMedia(false);
    }
  }

  let content;
  if (isMedia) {
    content = <Media />;
  } else if (isTrend) {
    content = <Trend />;
  }

  return (
    <div>
      <div className="options">
        <a id="tendencias" onClick={() => change("media")}>
          Tendencias
        </a>
        <a>
          <i>
            <ImSearch size={18} />
          </i>
        </a>
      </div>
      {content}
    </div>
  );
}
