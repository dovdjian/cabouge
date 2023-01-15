import { createContext, useRef, useState } from "react";
import { eventsData } from "../const";

export const EventsContext = createContext({});

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(eventsData);
  const [eventInfos, setEventInfos] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
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
  const flatListRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState("");

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
        favorites,
        setFavorites,
        filtres,
        setFiltres,
        modalVisible,
        setModalVisible,
        eventInfos,
        setEventInfos,
        flatListRef,
        selectedCity,
        setSelectedCity,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
