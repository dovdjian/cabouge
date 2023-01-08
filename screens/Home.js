import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native-web";

export default function Home({ navigation }) {
  const generatePeople = () => {
    let peoples = [];
    for (let i = 0; i < 30; i++) {
      peoples.push({
        name: `Person ${i + 1}`,
        age: Math.floor(Math.random() * 100),
      });
    }
    return peoples;
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [itemAge, setItemAge] = useState(0);
  const handlePress = (item) => {
    console.log(item.age);
    setItemAge(item.age);
    setModalVisible(true);
  };
  const handlePressFavoris = () => {
    navigation.navigate("Favoris");
    setModalVisible(true);
  };
  const [people] = useState(generatePeople());

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity onPress={() => handlePressFavoris()}>
          <Text>Go to Favoris</Text>
        </TouchableOpacity>
        <FlatList
          data={people}
          renderItem={({ item }) => (
            <View>
              <Pressable onPress={() => handlePress(item)}>
                <Text style={styles.item}>{item.name}</Text>
              </Pressable>
            </View>
          )}
        />
      </Modal>
      {modalVisible && (
        <Pressable onPress={() => setModalVisible(false)}>
          <Text style={styles.item}>{itemAge}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "pink",
    padding: 30,
    marginTop: 24,
    marginHorizontal: 10,
  },
});
