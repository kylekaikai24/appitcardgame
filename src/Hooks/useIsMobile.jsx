import React from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth < 768 ? true : false
  );

  React.useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 568 ? true : false);
    };
    window.addEventListener("resize", updateIsMobile);

    return () => {
      window.removeEventListener("resize", updateIsMobile);
    };
  });

  return isMobile;
};
