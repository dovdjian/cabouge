import { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { api, windowHeight, windowWidth } from "../const";

export default function Events({ navigation }) {
  // get events with picsum api
  const [data, setData] = useState([]);
  const loadList = async () => {
    await api
      .get("https://picsum.photos/v2/list")
      .then((res) => setData(res.data))
      .catch(() => console.log("Axios Error"));
  };
  useEffect(() => {
    loadList();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.download_url }}
              style={{ width: windowWidth, height: windowHeight }}
            />
          </View>
        )}
      />
    </View>
  );
}
