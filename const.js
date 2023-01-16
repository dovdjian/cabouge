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
    name: "15ème semaine du cinéma britannique",
    date_start: "2023-01-14",
    date_end: "2023-01-21",
    lieu: {
      ville: "Bruz",
      adresse: "10 Avenue du Général de Gaulle",
      code_postal: "35170",
      codeDepartement: "35",
    },
    description:
      "Chaque année le Grand Logis organise sa semaine du cinéma britannique.",
    category: "Cinéma",
    price: 10,
    download_url:
      "https://www.tourisme-rennes.com/uploads/2022/11/2023-semaine-du-cinema-britannique-16163.jpg",
    website: "https://legrandlogis-bruz.fr/semaine-du-cinema-britannique/",
  },
  {
    id: 2,
    name: "Pourquoi sauvegarder les vaches bretonnes ?",
    date_start: "2023-01-22",
    date_end: "2023-01-22",
    lieu: {
      ville: "Rennes",
      adresse: "Ecomusée de la Bintinais",
      code_postal: "35200",
      codeDepartement: "35",
    },
    description:
      "Rencontre animée par Arnaud Wassmer : journaliste indépendant. Avec le professeur Bernard Denis",
    category: "Conférence / Débat",
    price: 0,
    download_url:
      "https://www.tourisme-rennes.com/uploads/2022/12/f2c12539b38bb0c643677784ce297a9acee7a03e.png",
    website: "https://www.ecomusee-rennes-metropole.fr/",
  },
  {
    id: 3,
    name: "Festival autres mesures",
    date_start: "2023-01-22",
    date_end: "2023-02-05",
    lieu: {
      ville: "Rennes",
      adresse: "Multisites",
      code_postal: "35000",
      codeDepartement: "35",
    },
    description:
      "Depuis 2015, le festival Autres Mesures s’est progressivement implanté dans le paysage des événements hivernaux de la ville de Rennes.",
    category: "Concert",
    price: 20,
    download_url:
      "https://www.tourisme-rennes.com/uploads/2022/12/0f6ec0e0afdf232fad016b291140f406a2d4955e.jpeg",
    website: "https://autresmesures.com/",
  },
  {
    id: 4,
    name: "La nuit du blues",
    date_start: "2023-01-21",
    date_end: "2023-01-21",
    lieu: {
      ville: "Rennes",
      adresse: "123 Boulevard de Verdun",
      code_postal: "35000",
      codeDepartement: "35",
    },
    description:
      "La 1ere édition de la nuit du Blues aura lieu à la Maison Blues (Bleue). L'association aura le plaisir d'organiser un plateau artistique accueillant -Bo Weavil Combo, -Lazy Buddies, -Nico Wayne Toussaint",
    category: "Concert",
    price: 20,
    download_url:
      "http://lamaisonbleuerennes.fr/wp-content/uploads/2022/11/NUIT-DU-BLUESbanniere-e1667984617129.png",
    website: "http://lamaisonbleuerennes.fr/evenement-la-nuit-du-blues/",
  },
];
