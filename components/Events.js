import { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { api, windowWidth } from "../const";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EventsContext } from "../contexts/EventsContext";
import EventInfos from "./EventInfos";

export default function Events({ navigation }) {
  //const flatListRef = useRef(null);
  const {
    events,
    setEvents,
    favorites,
    filtres,
    eventInfos,
    setEventInfos,
    eventIndex,
    setEventIndex,
    modalVisible,
    setModalVisible,
    flatListRef,
    selectedCityCodeDep,
    addEventToFavorites,
    isFavorite,
    renderModal,
    shareEvent,
    redirectToWebsite,
    calculItemStatus,
    chooseDate,
  } = useContext(EventsContext);

  /* const loadList = async () => {
    try {
      const res = await api.get("https://picsum.photos/v2/list");
      setEvents(res.data);
    } catch (error) {
      console.log("Axios Error");
    }
  };
  useEffect(() => {
    loadList();
  }, []); */

  const eventIsInRangeDate = (date, item) => {
    let dateStart = Object.keys(date)[0];
    let dateEnd = Object.keys(date)[Object.keys(date).length - 1];

    if (dateStart === undefined && dateEnd === undefined) return true;

    if (item.date_end !== "") {
      return item.date_start <= dateEnd && item.date_end >= dateStart;
    } else {
      return item.date_start >= dateStart && item.date_start <= dateEnd;
    }
  };

  const handleReturn = (id) => {
    const index = events.findIndex((item) => item.id === id);
    if (flatListRef.current)
      flatListRef.current.scrollToIndex({
        index: index,
        animated: false,
      });
  };

  const renderItem = ({ item }) => {
    return (
      ((item.lieu.codeDepartement === selectedCityCodeDep &&
        selectedCityCodeDep !== "") ||
        selectedCityCodeDep === "") &&
      eventIsInRangeDate(chooseDate, item) && (
        <View style={styles.eventContainer}>
          <TouchableOpacity onPress={() => renderModal(item)} activeOpacity={1}>
            <Image
              source={{ uri: item.download_url }}
              style={styles.imageInModal}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconShare}
            onPress={() => shareEvent(item)}
          >
            <Ionicons name="share-outline" size={32} color="black" />
          </TouchableOpacity>
          <Text style={styles.status}>{calculItemStatus(item)}</Text>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity
            style={styles.websiteButton}
            onPress={() => {
              redirectToWebsite(item);
            }}
            activeOpacity={0.7}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Site web
            </Text>
          </TouchableOpacity>

          {isFavorite(item) ? (
            <TouchableOpacity
              onPress={() => addEventToFavorites(item)}
              activeOpacity={1}
              style={styles.iconFavorite}
            >
              <Ionicons name="star-outline" size={84} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => addEventToFavorites(item)}
              activeOpacity={1}
              style={styles.iconNotFavorite}
            >
              <Ionicons name="star-outline" size={84} color="white" />
            </TouchableOpacity>
          )}
        </View>
      )
    );
  };

  useEffect(() => {
    if (!modalVisible && eventIndex !== 0) {
      handleReturn(eventIndex);
    }
  }, [modalVisible]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <EventInfos item={eventInfos} />
      {!modalVisible && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.eventsList}
          ref={flatListRef}
          getItemLayout={(data, index) => ({
            data,
            length: 200,
            offset: 200 * index,
            index,
          })}
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
  },
  imageInModal: {
    width: 200,
    height: 200,
    borderRadius: 100,
    top: 10,
  },
  iconFavorite: {
    borderRadius: 100,
    backgroundColor: "#4C729E",
    top: 20,
  },
  iconNotFavorite: {
    borderRadius: 100,
    backgroundColor: "#363636",
    top: 20,
  },
  iconShare: {
    alignSelf: "flex-end",
    bottom: 35,
    right: 35,
    borderRadius: 100,
    backgroundColor: "#F3F0E9",
  },
  eventsList: {
    marginLeft: 10,
  },
  eventContainer: {
    alignItems: "center",
    width: 237,
    height: 492,
    borderRadius: 145,
    backgroundColor: "#E1E7EE",
    marginRight: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    height: 45,
  },
  category: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "#DFDFDF",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    border: "1px solid white",
  },
  status: {
    textAlign: "center",
    fontSize: 10,
    color: "white",
    borderRadius: 10,
    backgroundColor: "#050505",
    paddingHorizontal: 10,
    bottom: 15,
    border: "1px solid white",
  },
  description: {
    textAlign: "center",
    fontSize: 12,
    height: 45,
  },
  websiteButton: {
    textAlign: "center",
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  filtres: {
    marginLeft: 10,
  },
  filtre: {
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: "#F2F2F2",
    width: 57,
    height: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  filtreText: {
    fontSize: 10,
  },
});
