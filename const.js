import axios from "axios";
import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const api = axios.create({});
export const eventsData = [
  {
    id: 0,
    name: "Magnétique",
    date_start: "2022-20-09",
    date_end: "2023-05-03",
    lieu: "Rennes",
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
    name: "15ÈME SEMAINE DU CINÉMA BRITANNIQUE",
    date_start: "2023-14-01",
    date_end: "2023-21-01",
    lieu: "Rennes",
    description:
      "Chaque année le Grand Logis organise sa semaine du cinéma britannique. Une dizaine de films y sont diffusés, dont certains en compétitions.",
    category: "Cinéma",
    price: 20,
    download_url:
      "https://www.tourisme-rennes.com/uploads/2022/11/2023-semaine-du-cinema-britannique-16163.jpg",
    website: "https://legrandlogis-bruz.fr/semaine-du-cinema-britannique/",
  },
];
