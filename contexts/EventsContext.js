import { createContext, useState } from "react";
import { View } from "react-native";

export const EventsContext = createContext({});

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filtres, setFiltres] = useState([
    "Sport",
    "Concert",
    "Festival",
    "Exposition",
    "Conférence",
    "Théâtre",
    "Cinéma",
    "Bars",
    "Autre",
  ]);

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        favorites,
        setFavorites,
        filtres,
        setFiltres,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
