import { useContext, createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  //get setting from user's operating system, use as default
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  //prefersDark: initial value
  //"darkMode": key in localStorage
  //get/set the value from/to local storate
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    prefersDark,
    "darkMode",
  );

  //event handler
  function toggleDarkMode() {
    //console.log("toggling dark mode");
    setIsDarkMode((dm) => !dm);
  }

  //update the root tag for dark mode so that styles work
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  console.log("darkmode:", isDarkMode);

  //return context provider; wrap entire app in this so it can be used throughout
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//hook function to be used to get toggle function
function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("Dark mode was used outside of DarkModeProvider");

  return context;
}

export { useDarkMode, DarkModeProvider };
