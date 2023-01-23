import { createContext, useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const AppContext = createContext({});

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");
const classicSizePhoneWidth = 390;
const classicSizePhoneHeight = 844;
const ratioWidth = screenDimensions.width / classicSizePhoneWidth;
const ratioHeight = screenDimensions.height / classicSizePhoneHeight;

export const AppProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const [screenRatio, setScreenRatio] = useState({
    width: screenDimensions.width / classicSizePhoneWidth,
    height: screenDimensions.height / classicSizePhoneHeight,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
        setScreenRatio({
          width: screen.width / classicSizePhoneWidth,
          height: screen.height / classicSizePhoneHeight,
        });
      }
    );
    return () => subscription?.remove();
  }, []);

  return (
    <AppContext.Provider
      value={{
        dimensions,
        setDimensions,
        screenRatio,
        setScreenRatio,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
