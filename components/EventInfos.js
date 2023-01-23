import { useContext, useRef } from "react";
import { Image, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Modal, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppContext } from "../contexts/AppContext";
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
  const { dimensions, screenRatio } = useContext(AppContext);

  console.log("screenRatio", screenRatio);

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
          style={{ zIndex: 1, right: 20 }}
        >
          <Ionicons name="arrow-back-outline" size={39} />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#E1E7EE",
            width: "50%",
            height: "50%",
            borderRadius: "50%",
            justifyContent: "center",
            bottom: 20 * screenRatio.height,
          }}
        >
          <Image
            source={{ uri: eventInfos.download_url }}
            style={{
              width: "90%",
              height: "90%",
              borderRadius: "50%",
              alignSelf: "center",
            }}
          />
        </View>
        {isFavorite(props.item) ? (
          <TouchableOpacity
            onPress={() => addEventToFavorites(props.item)}
            activeOpacity={1}
            style={styles.iconFavorite}
          >
            <Icon name="star" size={75} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => addEventToFavorites(props.item)}
            activeOpacity={1}
            style={styles.iconNotFavorite}
          >
            <Icon name="star-outline" size={75} color="white" />
          </TouchableOpacity>
        )}
        <View style={styles.eventContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.title}>{props.item.name}</Text>
            <TouchableOpacity
              style={{
                alignSelf: "center",
                marginLeft: 10,
              }}
              onPress={() => shareEvent(props.item)}
            >
              <Ionicons name="share-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.category}>{props.item.category}</Text>
          <Text style={styles.date}>
            {convertDate(props.item.date_start)}
            {props.item.date_end ? " -" : ""} {convertDate(props.item.date_end)}
            {" de " + props.item.hour_start + " à " + props.item.hour_end}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Questrial",
              minWidth: dimensions.window.width - 20,
            }}
          >
            {" "}
            {props.item.description}
          </Text>
          <Text style={styles.price}>
            {" "}
            Prix: {props.item.price ? props.item.price + "€" : "Gratuit"}
          </Text>
          <View style={styles.locationContainer}>
            <Text> {props.item.lieu?.adresse} </Text>
            <Text>
              {" "}
              {props.item.lieu?.code_postal + ", " + props.item.lieu?.ville}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.websiteButton}
            onPress={() => {
              redirectToWebsite(props.item);
            }}
            activeOpacity={0.7}
          >
            <Text style={{ color: "white", fontFamily: "Questrial" }}>
              Site web
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

//const {ids, stylesDesc} = StyleSheet.create({
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    left: 20,
  },
  iconFavorite: {
    alignSelf: "flex-end",
    bottom: 95,
    right: 35,
    borderRadius: 100,
    backgroundColor: "#4C729E",
  },
  iconNotFavorite: {
    alignSelf: "flex-end",
    bottom: 95,
    right: 35,
    borderRadius: 100,
    backgroundColor: "#363636",
  },
  eventContainer: {
    bottom: 80,
  },
  nameContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
    fontFamily: "Questrial",
  },
  category: {
    textAlign: "center",
    alignSelf: "flex-start",
    fontSize: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ACACAC",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontFamily: "Questrial",
  },
  websiteButton: {
    alignSelf: "center",
    backgroundColor: "#4C729E",
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    right: 20,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "Questrial",
  },
  date: {
    fontSize: 13,
    fontWeight: "italic",
    marginVertical: 10,
    left: 2,
    fontFamily: "Questrial",
  },
  locationContainer: {
    marginTop: 10,
  },
});
