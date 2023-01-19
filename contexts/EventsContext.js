import { createContext, useRef, useState } from "react";
import { Linking, Share } from "react-native";
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
  const [chooseDate, setChooseDate] = useState({});
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);

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

  const shareEvent = async (item) => {
    try {
      const result = await Share.share({
        message: item.website,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const redirectToWebsite = (item) => {
    Linking.openURL(item.website); //inserer l'url de l'event
  };

  const calculItemStatus = (item) => {
    const today = new Date();
    const date_start = new Date(item.date_start);
    const date_end = new Date(item.date_end);

    if (today < date_start) {
      return "À venir";
    } else if (today > date_end) {
      return "Terminé";
    } else {
      return "En cours";
    }
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
        chooseDate,
        setChooseDate,
        flatListRef,
        selectedCityCodeDep,
        setSelectedCityCodeDep,
        addEventToFavorites,
        isFavorite,
        renderModal,
        shareEvent,
        redirectToWebsite,
        calculItemStatus,
        isStartDatePicked,
        setIsStartDatePicked,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
