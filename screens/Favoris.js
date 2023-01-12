import { useContext, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { windowWidth } from "../const";
import { EventsContext } from "../contexts/EventsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";

export default function Favoris({ navigation }) {
  const { favorites, setFavorites } = useContext(EventsContext);

  // get favorite from localStorage
  /* useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    console.log(favorites);
    if (favorites) {
      setFavorites(favorites);
    }
  }, []); */

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
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.download_url }}
              style={{
                width: windowWidth,
                height: 200,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
