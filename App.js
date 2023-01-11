import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Favoris from "./screens/Favoris";
import Home from "./screens/Home";
import Maps from "./screens/Maps";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Favoris") {
              iconName = "star-outline";
            } else if (route.name === "Maps") {
              iconName = "location-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Favoris" component={Favoris} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Maps" component={Maps} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
