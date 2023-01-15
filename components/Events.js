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
        selectedCityCodeDep === "") && (
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
            <Ionicons name="share-outline" size={32} color="white" />
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
          >
            <Text>Website</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addEventToFavorites(item)}
            activeOpacity={1}
            style={styles.iconFavorite}
          >
            {isFavorite(item) ? (
              <Ionicons name="star" size={84} color="white" />
            ) : (
              <Ionicons name="star-outline" size={84} color="white" />
            )}
          </TouchableOpacity>
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
    position: "relative",
    top: 10,
    alignSelf: "center",
  },
  iconFavorite: {
    alignSelf: "center",
    borderRadius: 100,
    backgroundColor: "#8F8F8F",
    top: 30,
  },
  icon: {
    fontSize: 30,
    color: "white",
  },
  iconShare: {
    alignSelf: "flex-end",
    bottom: 35,
    right: 35,
    borderRadius: 100,
    backgroundColor: "#8F8F8F",
  },
  eventsList: {
    marginLeft: 10,
  },
  eventContainer: {
    alignItems: "center",
    width: 237,
    height: 492,
    borderRadius: 145,
    backgroundColor: "#D9D9D9",
    marginRight: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  category: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "#8F8F8F",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  status: {
    textAlign: "center",
    fontSize: 10,
    color: "white",
    borderRadius: 10,
    backgroundColor: "#050505",
    paddingHorizontal: 10,
  },
  description: {
    textAlign: "center",
    fontSize: 15,
  },
  websiteButton: {
    textAlign: "center",
    backgroundColor: "#8F8F8F",
    borderRadius: 20,
    paddingHorizontal: 20,
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
