import { useState, useEffect } from "react";

export const useScroll = (prevScrollpos, setPrevScrollPos) => {
  const [positionValue, setPositionValue] = useState("0");

  useEffect(() => {
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setPositionValue("0");
      } else {
        setPositionValue("-50px");
      }
      console.log({ currentScrollPos, prevScrollpos }, "current scrooll pos");

      setPrevScrollPos(12);
    };
  }, [window.pageYOffset]);

  return [positionValue];
};
