import { useState } from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";

export default function SearchCity() {
  const [search, setSearch] = useState("");

  return (
    <SearchBar
      placeholder="Trouver une ville..."
      placeholderTextColor={"black"}
      searchIcon={{ color: "black" }}
      clearIcon={{ color: "black" }}
      onChangeText={(text) => setSearch(text)}
      onClear={() => setSearch("")}
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
  );
}
