import { useContext, useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { api } from "../const";
import { EventsContext } from "../contexts/EventsContext";

export default function SearchCity() {
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const { setSelectedCityCodeDep } = useContext(EventsContext);

  const handlePress = (item) => {
    setSearch(item.nom);
    setSelectedCityCodeDep(item.codeDepartement);
    setIsCitySelected(true);
  };

  const handleClear = () => {
    setIsCitySelected(false);
    setSearch("");
    setCities([]);
    setSelectedCityCodeDep("");
  };

  const loadCities = async (text) => {
    setSearch(text);
    try {
      const res = await api.get(
        "https://geo.api.gouv.fr/communes?nom=" +
          text +
          "&boost=population&limit=5"
      );
      setCities(res.data);
      setIsCitySelected(false);
    } catch (error) {
      console.log(error);
    }
  };

  /* useEffect(() => {
    if (search !== "") loadCities(search);
    console.log(cities);
  }, [search]); */

  return (
    <View>
      <SearchBar
        placeholder="Trouver une ville..."
        placeholderTextColor={"#787878"}
        searchIcon={{ color: "#4C729E", size: 24 }}
        clearIcon={{ color: "black", size: 24 }}
        onChangeText={(text) => loadCities(text)}
        onClear={() => handleClear()}
        value={search}
        containerStyle={{
          backgroundColor: "white",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
        }}
        inputContainerStyle={{
          borderRadius: 50,
          backgroundColor: "#EDEDED",
        }}
        inputStyle={{
          color: "black",
        }}
      />
      {!isCitySelected ? (
        <FlatList
          data={cities.sort((a, b) => {
            return b.population - a.population;
          })}
          renderItem={({ item }) =>
            item.population > 10000 ? (
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "grey",
                  flexDirection: "row",
                }}
                onPress={() => handlePress(item)}
              >
                <Text>{item.nom}</Text>
                <Text
                  style={{
                    textAlign: "left",
                    flex: 1,
                    fontFamily: "Questrial",
                  }}
                >
                  {" "}
                  ({item.codeDepartement})
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
