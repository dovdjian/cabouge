import { useEffect, useState } from "react";
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

export default function Events({ navigation }) {
  // get events with picsum api
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventInfos, setEventInfos] = useState({});
  const loadList = async () => {
    await api
      .get("https://picsum.photos/v2/list")
      .then((res) => setEvents(res.data))
      .catch(() => console.log("Axios Error"));
  };
  useEffect(() => {
    loadList();
  }, []);

  /* const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setEventInfos(true)}>
      <Text>{item.author}</Text>
    </TouchableOpacity>
  ); */

  const renderModal = ({ item }) => {
    setEventInfos(item);
    setModalVisible(true);
  };

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
            onPress={() => setModalVisible(false)}
          />
          <Image
            source={{ uri: eventInfos.download_url }}
            style={styles.imageInModal}
          />
        </View>
      </Modal>
      {!modalVisible && (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => renderModal({ item })}
              activeOpacity={1}
            >
              <Image
                source={{ uri: item.download_url }}
                style={{ width: windowWidth, height: 200 }}
              />
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
});
