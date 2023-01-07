import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Details")}>
        <Text>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}
