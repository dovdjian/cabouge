import { createContext, useRef, useState } from "react";
import { eventsData } from "../const";

export const EventsContext = createContext({});

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(eventsData);
  const [eventInfos, setEventInfos] = useState({});
  const [eventIndex, setEventIndex] = useState(0);
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
  const [selectedCityCodeDep, setSelectedCityCodeDep] = useState("");

  const addEventToFavorites = (item) => {
    const index = favorites.findIndex((favorite) => favorite.id === item.id);
    if (index === -1) {
      setFavorites([...favorites, item]);
    } else {
      favorites.splice(index, 1);
      setFavorites([...favorites]);
    }
  };

  const isFavorite = (item) => {
    const index = favorites.findIndex((favorite) => favorite.id === item.id);
    if (index === -1) {
      return false;
    }
    return true;
  };

  const renderModal = (item) => {
    setEventInfos(item);
    setModalVisible(true);
    setEventIndex(item.id);
  };

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
        eventIndex,
        setEventIndex,
        flatListRef,
        selectedCityCodeDep,
        setSelectedCityCodeDep,
        addEventToFavorites,
        isFavorite,
        renderModal,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
