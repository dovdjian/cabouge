import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { windowWidth } from "../const";
import { EventsContext } from "../contexts/EventsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import SearchCity from "../components/SearchCity";
import ChooseDate from "../components/ChooseDate";
import EventInfos from "../components/EventInfos";
import { TouchableOpacity } from "react-native";

export default function Favoris() {
  const {
    favorites,
    setFavorites,
    modalVisible,
    selectedCityCodeDep,
    renderModal,
  } = useContext(EventsContext);
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
      item.lieu.codeDepartement === selectedCityCodeDep && (
        <View>
          <TouchableOpacity onPress={() => renderModal(item)} activeOpacity={1}>
            <Image
              source={{ uri: item.download_url }}
              style={{
                width: windowWidth,
                height: 200,
              }}
            />
          </TouchableOpacity>
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
        console.log("data == ", data);
        setFavorites(data);
      }
    });
  }, []);

  return (
    <View style={{ backgroundColor: "white" }}>
      <SearchCity />
      <ChooseDate />
      <FlatList data={favorites} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
