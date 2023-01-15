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
  const [eventIndex, setEventIndex] = useState(0);
  //const flatListRef = useRef(null);
  const {
    events,
    setEvents,
    favorites,
    setFavorites,
    filtres,
    setEventInfos,
    modalVisible,
    setModalVisible,
    flatListRef,
    selectedCity,
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

  const renderModal = ({ item }) => {
    setEventInfos(item);
    setModalVisible(true);
    setEventIndex(item.id);
  };

  const handleReturn = (id) => {
    const index = events.findIndex((item) => item.id === id);
    if (flatListRef.current)
      flatListRef.current.scrollToIndex({
        index: index,
        animated: false,
      });
  };

  const addEventToFavorites = (item) => {
    console.log(item);
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

  const renderItem = ({ item }) => {
    return (
      item.lieu === selectedCity && (
        <View style={styles.eventContainer}>
          <TouchableOpacity
            onPress={() => renderModal({ item })}
            activeOpacity={1}
          >
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
          <Text style={styles.status}>En cours</Text>
          <Text style={styles.title}>{item.name}</Text>
          <View>
            <Text> {item.category} </Text>
          </View>
          <Text style={styles.description}> {item.description} </Text>
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
    console.log("modalVisible", modalVisible);
    if (!modalVisible && eventIndex !== 0) {
      handleReturn(eventIndex);
    }
  }, [modalVisible]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <EventInfos />
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
    position: "relative",
    alignSelf: "center",
    borderRadius: 100,
    backgroundColor: "#8F8F8F",
    top: 24,
  },
  icon: {
    fontSize: 30,
    color: "white",
  },
  iconShare: {
    position: "relative",
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
    fontSize: 20,
  },
  status: {
    textAlign: "center",
    fontSize: 20,
    color: "green",
  },
  description: {
    textAlign: "center",
    fontSize: 15,
  },
  websiteButton: {
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "#8F8F8F",
    borderRadius: 20,
    paddingHorizontal: 30,
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
