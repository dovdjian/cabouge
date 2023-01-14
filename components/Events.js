import { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { api, windowWidth } from "../const";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FavoriteIcon } from "../assets/star.png";
import { EventsContext } from "../contexts/EventsContext";
import EventInfos from "./EventInfos";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

export default function Events({ navigation }) {
  const [eventIndex, setEventIndex] = useState(0);
  const flatListRef = useRef(null);
  const {
    events,
    setEvents,
    favorites,
    setFavorites,
    filtres,
    setEventInfos,
    modalVisible,
    setModalVisible,
  } = useContext(EventsContext);

  const loadList = async () => {
    await api
      .get("https://picsum.photos/v2/list")
      .then((res) => setEvents(res.data))
      .catch(() => console.log("Axios Error"));
  };
  useEffect(() => {
    loadList();
  }, []);

  const renderModal = ({ item }) => {
    setEventInfos(item);
    setModalVisible(true);
    setEventIndex(item.id);
  };

  const handleReturn = (id) => {
    const index = events.findIndex((item) => item.id === id);
    if (flatListRef.current)
      flatListRef.current.scrollToIndex({
        index: index,
        animated: false,
      });
    setModalVisible(false);
  };

  const addEventToFavorites = (item) => {
    console.log(item);
    const index = favorites.findIndex((favorite) => favorite.id === item.id);
    if (index === -1) {
      setFavorites([...favorites, item]);
    } else {
      favorites.splice(index, 1);
      setFavorites([...favorites]);
    }
  };

  const isFavorite = (item) => {
    const index = favorites.findIndex((favorite) => favorite.id === item.id);
    if (index === -1) {
      return false;
    }
    return true;
  };

  const shareEvent = async (item) => {
    console.log(item);

    try {
      const result = await Sharing.isAvailableAsync();

      if (!result) {
        alert("Sharing is not available on your platform");
        return;
      }
      const image = require("../assets/star.png");
      const asset = Asset.fromModule(image);
      const tmpFile = FileSystem.cacheDirectory + "star.png";

      await asset.downloadAsync();
      await FileSystem.copyAsync({ from: asset.localUri, to: tmpFile });
      await Sharing.shareAsync(tmpFile, {
        dialogTitle: "Is it a snake or a hat?",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const redirectToWebsite = () => {
    console.log("redirect");
    // TODO: redirect to website https://www.deepl.com/fr/translator

    //Linking.openURL("https://www.deepl.com/fr/translator"); inserer l'url de l'event
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.eventContainer}>
        <TouchableOpacity
          onPress={() => renderModal({ item })}
          activeOpacity={1}
        >
          <Image
            source={{ uri: item.download_url }}
            style={styles.imageInModal}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconShare}
          onPress={() => shareEvent(item)}
        >
          <Ionicons name="share-outline" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.status}>En cours</Text>
        <Text style={styles.title}>{item.author}</Text>
        {/* <FlatList
          nestedScrollEnabled={true}
          style={styles.filtres}
          showsHorizontalScrollIndicator={true} // TODO: false
          alignItems="center"
          horizontal={true}
          data={filtres}
          //keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.filtre}>
              <Text style={styles.filtreText}>{item}</Text>
            </View>
          )}
        /> */}
        <View>
          <Text> {filtres[0]} </Text>
        </View>
        <Text style={styles.description}>Description de l'event </Text>
        <TouchableOpacity
          style={styles.websiteButton}
          onPress={() => {
            redirectToWebsite();
          }}
        >
          <Text>Website</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => addEventToFavorites(item)}
          activeOpacity={1}
          style={styles.iconFavorite}
        >
          {isFavorite(item) ? (
            <Ionicons name="star" size={84} color="white" />
          ) : (
            <Ionicons name="star-outline" size={84} color="white" />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (flatListRef.current && eventIndex) {
      handleReturn(eventIndex);
    }
  }, [flatListRef, eventIndex, handleReturn]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <EventInfos />
      {!modalVisible && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={styles.eventsList}
          ref={flatListRef}
          getItemLayout={(data, index) => ({
            length: 200,
            offset: 200 * index,
            index,
          })}
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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
    width: 200,
    height: 200,
    borderRadius: 100,
    position: "relative",
    top: 10,
    alignSelf: "center",
  },
  iconFavorite: {
    position: "relative",
    alignSelf: "center",
    borderRadius: 100,
    backgroundColor: "#8F8F8F",
    top: 24,
  },
  icon: {
    fontSize: 30,
    color: "white",
  },
  iconShare: {
    position: "relative",
    alignSelf: "flex-end",
    bottom: 35,
    right: 35,
    borderRadius: 100,
    backgroundColor: "#8F8F8F",
  },
  eventsList: {
    marginLeft: 10,
  },
  eventContainer: {
    alignItems: "center",
    width: 237,
    height: 492,
    borderRadius: 145,
    backgroundColor: "#D9D9D9",
    marginRight: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
  },
  status: {
    textAlign: "center",
    fontSize: 20,
    color: "green",
  },
  description: {
    textAlign: "center",
    fontSize: 12,
  },
  websiteButton: {
    textAlign: "center",
    fontSize: 12,
    backgroundColor: "#8F8F8F",
    borderRadius: 20,
    paddingHorizontal: 30,
  },
  filtres: {
    marginLeft: 10,
  },
  filtre: {
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: "#F2F2F2",
    width: 57,
    height: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  filtreText: {
    fontSize: 10,
  },
});
