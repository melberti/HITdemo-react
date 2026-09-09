import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import supabase from "../services/supabase";
import Button from "../ui/Button";

const AuthTimeoutContext = createContext(null);

function AuthTimeoutProvider({ children }) {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3000); // 5 minute warning countdown

  const THIRTY_MINS_MS = 30 * 60 * 1000;
  const WARNING_THRESHOLD_MS = 2 * 60 * 1000; // 12,000 ms (2 minutes before)
  const TIME_UNTIL_WARNING = THIRTY_MINS_MS - WARNING_THRESHOLD_MS;

  // console.log(
  //   "THIRTY_MINS_MS",
  //   THIRTY_MINS_MS,
  //   "in mins",
  //   THIRTY_MINS_MS / 1000 / 60,
  // );
  // console.log(
  //   "WARNING_THRESHOLD_MS",
  //   WARNING_THRESHOLD_MS,
  //   "in mins",
  //   WARNING_THRESHOLD_MS / 1000 / 60,
  // );
  // console.log(
  //   "TIME_UNTIL_WARNING",
  //   TIME_UNTIL_WARNING,
  //   "in mins",
  //   TIME_UNTIL_WARNING / 1000 / 60,
  // );

  // Use refs to persist timer IDs across renders
  const warningTimerRef = useRef(null);
  const logoutTimerRef = useRef(null);
  const countdownIntervalRef = useRef(null);
  const isWarningDisplayedRef = useRef(false);

  // 1. Core logout function
  const handleLogout = async () => {
    clearAllTimers();
    await supabase.auth.signOut();
    navigate("/signin?reason=expired");
  };

  // 2. Clear all active timers
  const clearAllTimers = () => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);
    setShowWarning(false);
    isWarningDisplayedRef.current = false;
  };

  // 3. Start/Reset the inactivity chain
  const resetInactivityTimers = () => {
    // If the warning modal is already visible, stop resetting on activity!
    // The user must explicitly interact with the modal or stay idle to log out.
    if (isWarningDisplayedRef.current) return;

    clearAllTimers();

    // Start timer to trigger warning
    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      isWarningDisplayedRef.current = true;
      startWarningCountdown();
    }, TIME_UNTIL_WARNING);

    // Start absolute fallback log out
    logoutTimerRef.current = setTimeout(() => {
      handleLogout();
    }, THIRTY_MINS_MS);
  };

  // 4. Start the visual countdown inside the modal
  const startWarningCountdown = () => {
    setTimeLeft(WARNING_THRESHOLD_MS / 1000);
    countdownIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 5. Keep session alive manually if they click 'Stay Logged In'
  const extendSessionManually = () => {
    clearAllTimers();
    resetInactivityTimers();
  };

  useEffect(() => {
    // Listen for Supabase auth status
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      setSession(currentSession);

      if (event === "SIGNED_IN" && currentSession) {
        resetInactivityTimers();
      } else if (event === "SIGNED_OUT") {
        clearAllTimers();
      }
    });

    // List of user events that constitute "activity"
    const activityEvents = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ];

    // Throttle helper to avoid firing resets hundreds of times per second on scroll/move
    let throttleTimeout;
    const throttledReset = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          resetInactivityTimers();
          throttleTimeout = null;
        }, 2000); // Only reset timers at most once every 2 seconds
      }
    };

    // Attach event listeners to the window browser object
    activityEvents.forEach((event) => {
      window.addEventListener(event, throttledReset);
    });

    // Cleanup on unmount
    return () => {
      subscription.unsubscribe();
      clearAllTimers();
      if (throttleTimeout) clearTimeout(throttleTimeout);
      activityEvents.forEach((event) => {
        window.removeEventListener(event, throttledReset);
      });
    };
  }, []);

  return (
    <AuthTimeoutContext.Provider value={{ session, supabase, handleLogout }}>
      {children}

      {/* 1-Minute Warning Notification Modal */}
      {showWarning && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <h3>⚠️ Session Expiring Due to Inactivity</h3>
            <p>
              You have been inactive for {TIME_UNTIL_WARNING / 1000 / 60}{" "}
              minutes. You will be logged out in <strong>{timeLeft}</strong>{" "}
              seconds.
            </p>
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <Button onClick={extendSessionManually} color="primary">
                Stay Logged In
              </Button>
              <Button onClick={handleLogout} color="neutral">
                Sign Out Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </AuthTimeoutContext.Provider>
  );
}

function useAuthTimeout() {
  const context = useContext(AuthTimeoutContext);
  if (context === undefined)
    throw new Error(
      "Auth Timeout Filter was used outside of AuthTimeoutProvider",
    );

  return context;
}

export { useAuthTimeout, AuthTimeoutProvider };

// Basic inline styling for the modal overlay
const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};
const modalContentStyle = {
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  color: "#333",
};
