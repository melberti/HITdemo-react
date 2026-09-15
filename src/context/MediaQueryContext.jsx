import { useMediaQuery } from "react-responsive";
import { createContext, useContext } from "react";

const MediaQueryContext = createContext();

function MediaQueryProvider({ children }) {
  const isSmall = useMediaQuery({ query: "(max-width: 767px)" });
  const isMedium = useMediaQuery({ query: "(min-width: 768px)" });
  const isLarge = useMediaQuery({ query: "(min-width: 1094px)" });

  //console.log("isSm", isSmall, "isMd", isMedium, "isLg", isLarge);

  return (
    <MediaQueryContext.Provider value={{ isSmall, isMedium, isLarge }}>
      {children}
    </MediaQueryContext.Provider>
  );
}

function useMedia() {
  const context = useContext(MediaQueryContext);
  if (context === undefined)
    throw new Error("Media Query was used outside of MediaQueryContext");
  return context;
}

export { MediaQueryProvider, useMedia };
