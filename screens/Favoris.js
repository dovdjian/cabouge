import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Favoris({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>Go back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}
