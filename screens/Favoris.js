import { useContext, useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { windowWidth } from "../const";
import { EventsContext } from "../contexts/EventsContext";

export default function Favoris({ navigation }) {
  const { favorites, setFavorites } = useContext(EventsContext);

  // get favorite from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    console.log(favorites);
    if (favorites) {
      setFavorites(favorites);
    }
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
