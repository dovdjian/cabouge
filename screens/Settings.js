import { View, Text } from "react-native";

export default function Settings({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 25,
        }}
      >
        Settings
      </Text>
    </View>
  );
}
