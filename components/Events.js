import { useEffect, useRef, useState } from "react";
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

export default function Events({ navigation }) {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventInfos, setEventInfos] = useState({});
  const [eventIndex, setEventIndex] = useState(0);
  const flatListRef = useRef(null);

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
        index,
        animated: false,
        viewPosition: -0.5,
      });
    setModalVisible(false);
  };

  const addEventToFavorites = (item) => {
    console.log(item);
  };

  useEffect(() => {
    if (flatListRef.current && eventIndex) {
      handleReturn(eventIndex);
    }
  }, [flatListRef, eventIndex, handleReturn]);

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
          ref={flatListRef}
          getItemLayout={(data, index) => ({
            length: 200,
            offset: 200 * index,
            index,
          })}
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => renderModal({ item })}
              activeOpacity={1}
            >
              <Image
                source={{ uri: item.download_url }}
                style={styles.imageInModal}
              />
              <TouchableOpacity
                onPress={() => addEventToFavorites(item)}
                style={styles.iconContainer}
              >
                <Ionicons name="star-outline" size={30} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
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
    width: windowWidth,
    height: 200,
  },
  iconContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    border: "1px solid rgba(0,0,0,0.5)",
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  icon: {
    fontSize: 30,
    color: "white",
  },
});
