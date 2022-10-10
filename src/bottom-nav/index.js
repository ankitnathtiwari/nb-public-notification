import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { PostLink } from "./postLink";
import { VideoLink } from "./videoLink";
export const BottomNav = ({ positionValue }) => {
  const [prevScrollpos, setPrevScrollPos] = useState(window.pageYOffset);
  const bottomNav = useRef();
  useEffect(() => {
    const handleScroll = () => {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        bottomNav.current.style.bottom = "0vh";
      } else {
        bottomNav.current.style.bottom = "-8vh";
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.pageYOffset]);

  return (
    <div className="bottom-nav" id="bottom-nav" ref={bottomNav}>
      <div className="bottom-nav-short-posts">
        <PostLink />
      </div>
      <div className="bottom-nav-short-videos">
        <VideoLink />
      </div>
    </div>
  );
};
