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
  const [date, setDate] = useState(new Date());

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        favorites,
        setFavorites,
        filtres,
        setFiltres,
        date,
        setDate,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
