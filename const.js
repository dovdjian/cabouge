import axios from "axios";
import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const api = axios.create({});
export const eventsData = [
  {
    id: 0,
    name: "Magnétique",
    date_start: "2022-09-20",
    date_end: "2023-03-05",
    lieu: {
      ville: "Rennes",
      adresse: "Espace des Sciences",
      code_postal: "35000",
      codeDepartement: "35",
    },
    description:
      "La nouvelle exposition temporaire de l’Espace des sciences explore les mystères du magnétisme.",
    category: "Exposition",
    price: 0,
    download_url:
      "https://www.tourisme-rennes.com/uploads/2022/11/2022-magnetique-espace-des-sciences-16075.jpg",
    website: "https://www.espace-sciences.org/",
  },
  {
    id: 1,
    name: "15eme semaine du cinéma britannique",
    date_start: "2023-01-14",
    date_end: "2023-01-21",
    lieu: {
      ville: "Bruz",
      adresse: "10 Avenue du Général de Gaullle",
      code_postal: "35170",
      codeDepartement: "35",
    },
    description:
      "Chaque année le Grand Logis organise sa semaine du cinéma britannique.",
    category: "Cinéma",
    price: 20,
    download_url:
      "https://www.tourisme-rennes.com/uploads/2022/11/2023-semaine-du-cinema-britannique-16163.jpg",
    website: "https://legrandlogis-bruz.fr/semaine-du-cinema-britannique/",
  },
];
