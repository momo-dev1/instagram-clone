import { useEffect, useRef } from "react";
const useClickOutside = (ref, callback) => {
  const callbackRef = useRef();
  callbackRef.current = callback;
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref?.current?.contains(e.target) && callbackRef.current) {
        callbackRef.current(e);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [callbackRef, ref]);
};
export default useClickOutside;
