import { useContext, useRef } from "react";
import { Image } from "react-native";
import { Modal, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EventsContext } from "../contexts/EventsContext";

export default function EventInfos() {
  const { eventInfos, modalVisible, setModalVisible } =
    useContext(EventsContext);

  return (
    <Modal visible={modalVisible}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Ionicons
          style={{ position: "absolute", top: 10, left: 5 }}
          name="arrow-back-outline"
          size={35}
          onPress={() => setModalVisible(false)}
        />
        <Image
          source={{ uri: eventInfos.download_url }}
          style={styles.imageInModal}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  imageInModal: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "relative",
    top: 10,
    alignSelf: "center",
  },
});
