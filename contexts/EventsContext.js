import { createContext, useState } from "react";
import { View } from "react-native";

export const EventsContext = createContext({});

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
