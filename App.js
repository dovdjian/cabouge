import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { EventsProvider } from "./contexts/EventsContext";
import Favoris from "./screens/Favoris";
import Home from "./screens/Home";
import Maps from "./screens/Maps";
import Settings from "./screens/Settings";
import { useFonts } from "expo-font";
import { useContext } from "react";
import { AppProvider } from "./contexts/AppContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded] = useFonts({
    Questrial: require("./assets/fonts/Questrial-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <AppProvider>
      <EventsProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Home") {
                  iconName = "home";
                } else if (route.name === "Favoris") {
                  iconName = "star";
                } else if (route.name === "Maps") {
                  iconName = "location";
                } else if (route.name === "Settings") {
                  iconName = "settings";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#4C729E",
              tabBarInactiveTintColor: "#2C3B4E",
              headerShown: false,
            })}
          >
            <Tab.Screen name="Favoris" component={Favoris} />
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Maps" component={Maps} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </EventsProvider>
    </AppProvider>
  );
}
