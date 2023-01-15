import { useContext, useRef } from "react";
import { Image, Text } from "react-native";
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
    shareEvent,
    redirectToWebsite,
  } = useContext(EventsContext);

  const convertDate = (date) => {
    if (!date) return "";
    const dateArray = date.split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    return `${day}/${month}/${year}`;
  };

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
        <View style={styles.eventContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.title}>{props.item.name}</Text>
            <TouchableOpacity onPress={() => shareEvent(props.item)}>
              <Ionicons name="share-outline" size={32} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.category}>{props.item.category}</Text>
          <Text style={styles.date}>
            {convertDate(props.item.date_start)} -{" "}
            {convertDate(props.item.date_end)}
          </Text>
          <Text style={styles.description}> {props.item.description}</Text>
          <View style={styles.locationContainer}>
            <Text> {props.item.lieu?.adresse} </Text>
            <Text> {props.item.lieu?.code_postal} </Text>
            <Text> {props.item.lieu?.ville} </Text>
          </View>
          <TouchableOpacity
            style={styles.websiteButton}
            onPress={() => {
              redirectToWebsite(props.item);
            }}
          >
            <Text>Website</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: 37,
    left: 10,
  },
  imageContainer: {
    backgroundColor: "#4C729E",
    width: 358,
    height: 358,
    borderRadius: 179,
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
  eventContainer: {
    bottom: 60,
  },
  nameContainer: {
    flexDirection: "row",
    left: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
  },
  category: {
    right: 10,
    alignSelf: "center",
    fontSize: 15,
    backgroundColor: "#8F8F8F",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  websiteButton: {
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "#8F8F8F",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    right: 10,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    right: 27,
  },
  date: {
    fontSize: 15,
    marginVertical: 10,
    left: 2,
  },
  locationContainer: {
    marginTop: 20,
  },
});
