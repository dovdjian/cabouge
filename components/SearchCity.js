import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { api } from "../const";

export default function SearchCity() {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [isCitySelected, setIsCitySelected] = useState(false);

  const handlePress = (item) => {
    setSearch(item.nom);
    setSelectedCity(item.nom);
    setIsCitySelected(true);
  };

  const handleClear = () => {
    setIsCitySelected(false);
    setSearch("");
    setSelectedCity("");
    setCities([]);
  };

  const loadCities = async (text) => {
    await api
      .get(
        "https://geo.api.gouv.fr/communes?nom=" +
          text +
          "&boost=population&limit=5"
      )
      .then((res) => setCities(res.data))
      .catch(() => console.log("Axios Error"));
  };
  cities.sort((a, b) => {
    if (a.nom < b.nom) {
      return -1;
    }
    if (a.nom > b.nom) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    if (search !== "") loadCities(search);
    console.log(cities);
  }, [search]);

  return (
    <View>
      <SearchBar
        placeholder="Trouver une ville..."
        placeholderTextColor={"black"}
        searchIcon={{ color: "black" }}
        clearIcon={{ color: "black" }}
        onChangeText={(text) => setSearch(text)}
        onClear={() => handleClear()}
        value={search}
        containerStyle={{
          backgroundColor: "white",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
        inputContainerStyle={{
          borderRadius: 50,
          backgroundColor: "#787878",
        }}
        inputStyle={{
          color: "black",
        }}
      />
      {!isCitySelected ? (
        <FlatList
          data={cities}
          renderItem={({ item }) =>
            item.population > 10000 ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                  justifyContent: "center",
                }}
                onPress={() => handlePress(item)}
              >
                <Text>{item.nom}</Text>
                <Text
                  style={{
                    right: 20,
                    position: "absolute",
                  }}
                >
                  {item.code}
                </Text>
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
        />
      ) : (
        <></>
      )}
    </View>
  );
}
