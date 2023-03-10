import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { EventsContext } from "../contexts/EventsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import SearchCity from "../components/SearchCity";
import ChooseDate from "../components/ChooseDate";
import EventInfos from "../components/EventInfos";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon } from "react-native-elements";
import { AppContext } from "../contexts/AppContext";

export default function Favoris({ navigation }) {
  const {
    favorites,
    setFavorites,
    modalVisible,
    selectedCityCodeDep,
    renderModal,
    setEventInfos,
    setEventIndex,
    setSelectedCityCodeDep,
    addEventToFavorites,
    calculItemStatus,
    shareEvent,
  } = useContext(EventsContext);
  const { dimensions } = useContext(AppContext);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@favorites", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@favorites");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const renderItem = ({ item }) => {
    return (
      ((item.lieu.codeDepartement === selectedCityCodeDep &&
        selectedCityCodeDep !== "") ||
        selectedCityCodeDep === "") && (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => renderModal(item)} activeOpacity={1}>
            <Image
              source={{ uri: item.download_url }}
              style={{
                width: 350,
                height: 186,
                alignSelf: "center",
                borderRadius: 20,
                marginVertical: 10,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconShare}
            onPress={() => shareEvent(item)}
          >
            <Ionicons name="share-outline" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addEventToFavorites(item)}
            activeOpacity={1}
            style={styles.iconFavorite}
          >
            <Icon name="star" size={46} color="white" />
          </TouchableOpacity>
          <Text style={styles.status}>{calculItemStatus(item)}</Text>
          <Text style={styles.title}>{item.name}</Text>
          <Text
            style={{
              left: 23,
            }}
          >
            {item.lieu.ville + " (" + item.lieu.code_postal + ")"}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      )
    );
  };

  useEffect(() => {
    storeData(favorites);
  }, [favorites]);

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setFavorites(data);
      }
    });
  }, []);

  useEffect(() => {
    // reload when coming back from other screens
    navigation.addListener("focus", () => {
      setEventInfos({});
      setEventIndex(0);
      setSelectedCityCodeDep("");
    });
  }, [setEventInfos, setEventIndex, setSelectedCityCodeDep]);

  return (
    <View style={{ backgroundColor: "white", top: 50 }}>
      <SearchCity />
      <FlatList
        data={favorites}
        renderItem={renderItem}
        flexGrow={0.1}
        minHeight={dimensions.screen.height - 50}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconShare: {
    alignItems: "flex-end",
    position: "absolute",
    top: 10,
    right: 20,
    borderRadius: 20,
    marginRight: 5,
  },
  iconFavorite: {
    alignItems: "flex-end",
    position: "absolute",
    top: 75,
    right: 20,
    borderRadius: 100,
    backgroundColor: "#4C729E",
    marginRight: 5,
  },
  status: {
    position: "absolute",
    bottom: 120,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "white",
    backgroundColor: "#050505",
    paddingHorizontal: 10,
    fontFamily: "Questrial",
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    left: 23,
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
    left: 20,
  },
});
