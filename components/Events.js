import { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { api, windowWidth } from "../const";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FavoriteIcon } from "../assets/star.png";
import { EventsContext } from "../contexts/EventsContext";

export default function Events({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventInfos, setEventInfos] = useState({});
  const [eventIndex, setEventIndex] = useState(0);
  const flatListRef = useRef(null);
  const { events, setEvents, favorites, setFavorites } =
    useContext(EventsContext);

  const loadList = async () => {
    await api
      .get("https://picsum.photos/v2/list")
      .then((res) => setEvents(res.data))
      .catch(() => console.log("Axios Error"));
  };
  useEffect(() => {
    loadList();
  }, []);

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
    setModalVisible(false);
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

  const shareEvent = (item) => {
    console.log(item);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.eventContainer}>
        <TouchableOpacity
          onPress={() => renderModal({ item })}
          activeOpacity={1}
        >
          <Image
            source={{ uri: item.download_url }}
            style={styles.imageInModal}
          />
          <TouchableOpacity
            style={styles.iconShare}
            onPress={() => shareEvent(item)}
          >
            <Ionicons name="share-outline" size={32} color="white" />
          </TouchableOpacity>

          <Text style={styles.status}> En cours</Text>
          <Text style={styles.title}>{item.author}</Text>
          <Text style={styles.description}>Description de l'event </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.button}>Website</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addEventToFavorites(item)}
            activeOpacity={1}
            style={styles.iconFavorite}
          >
            {isFavorite(item) ? (
              <Ionicons name="star" size={80} color="white" />
            ) : (
              <Ionicons name="star-outline" size={80} color="white" />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (flatListRef.current && eventIndex) {
      handleReturn(eventIndex);
    }
  }, [flatListRef, eventIndex, handleReturn]);

  // store favorite in localStorage
  /* useEffect(() => {
    console.log(favorites);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]); */

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Modal visible={modalVisible}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons
            style={{ position: "absolute", top: 10, left: 5 }}
            name="close-circle-outline"
            size={35}
            onPress={() => handleReturn(eventIndex)}
          />
          <Image
            source={{ uri: eventInfos.download_url }}
            style={styles.imageInModal}
          />
        </View>
      </Modal>
      {!modalVisible && (
        <FlatList
          horizontal={true}
          style={styles.eventsList}
          ref={flatListRef}
          getItemLayout={(data, index) => ({
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
  },
  iconFavorite: {
    position: "relative",
    alignSelf: "center",
    top: 80,
    borderRadius: 100,
    backgroundColor: "#8F8F8F",
  },
  icon: {
    fontSize: 30,
    color: "white",
  },
  iconShare: {
    position: "relative",
    alignSelf: "flex-end",
    bottom: 20,
    borderRadius: 100,
    backgroundColor: "#8F8F8F",
  },
  eventsList: {},
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
    fontSize: 12,
  },
  button: {
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "8F8F8F",
    borderRadius: 20,
  },
});
