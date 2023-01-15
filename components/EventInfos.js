import { useContext, useRef } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { Modal, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EventsContext } from "../contexts/EventsContext";

export default function EventInfos(props) {
  const {
    eventInfos,
    modalVisible,
    setModalVisible,
    addEventToFavorites,
    isFavorite,
  } = useContext(EventsContext);

  return (
    <Modal visible={modalVisible}>
      <View style={styles.modal}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
        >
          <Ionicons name="arrow-back-outline" size={39} />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: eventInfos.download_url }}
            style={styles.imageInModal}
          />
        </View>
        <TouchableOpacity
          onPress={() => addEventToFavorites(props.item)}
          activeOpacity={1}
          style={styles.iconFavorite}
        >
          {isFavorite(props.item) ? (
            <Ionicons name="star" size={65} color="white" />
          ) : (
            <Ionicons name="star-outline" size={65} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    marginTop: 37,
  },
  imageContainer: {
    backgroundColor: "#4C729E",
    width: 358,
    height: 358,
    borderRadius: 179,
    alignItems: "center",
    justifyContent: "center",
  },
  imageInModal: {
    width: 310,
    height: 310,
    borderRadius: 155,
    position: "relative",
    alignSelf: "center",
  },
  iconFavorite: {
    alignSelf: "flex-end",
    bottom: 85,
    right: 15,
    borderRadius: 100,
    backgroundColor: "#8F8F8F",
  },
});
