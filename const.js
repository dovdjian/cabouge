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
    hour_start: "12:00",
    hour_end: "19:00",
    lieu: {
      ville: "Rennes",
      adresse: "Espace des Sciences",
      code_postal: "35000",
      codeDepartement: "35",
    },
    description:
      "La nouvelle exposition temporaire de l’Espace des sciences explore les mystères du magnétisme.",
    category: "Exposition",
    price: 6,
    download_url:
      "https://www.tourisme-rennes.com/uploads/2022/11/2022-magnetique-espace-des-sciences-16075.jpg",
    website: "https://www.espace-sciences.org/",
  },
  {
    id: 1,
    name: "15ème semaine du cinéma britannique",
    date_start: "2023-01-14",
    date_end: "2023-01-21",
    hour_start: "10:00",
    hour_end: "18:00",
    lieu: {
      ville: "Bruz",
      adresse: "10 Avenue du Général de Gaulle",
      code_postal: "35170",
      codeDepartement: "35",
    },
    description:
      "Chaque année le Grand Logis organise sa semaine du cinéma britannique.",
    category: "Cinéma",
    price: 13,
    download_url:
      "https://www.tourisme-rennes.com/uploads/2022/11/2023-semaine-du-cinema-britannique-16163.jpg",
    website: "https://legrandlogis-bruz.fr/semaine-du-cinema-britannique/",
  },
  {
    id: 2,
    name: "Pourquoi sauvegarder les races bretonnes ?",
    date_start: "2023-01-22",
    date_end: "",
    hour_start: "15:00",
    hour_end: "20:00",
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
    hour_start: "12:30",
    hour_end: "23:30",
    lieu: {
      ville: "Rennes",
      adresse: "Multisites",
      code_postal: "35000",
      codeDepartement: "35",
    },
    description:
      "Depuis 2015, le festival Autres Mesures s’est progressivement implanté dans le paysage des événements hivernaux de la ville de Rennes.",
    category: "Concert",
    price: 0,
    download_url:
      "https://www.tourisme-rennes.com/uploads/2022/12/0f6ec0e0afdf232fad016b291140f406a2d4955e.jpeg",
    website: "https://autresmesures.com/",
  },
  {
    id: 4,
    name: "La nuit du blues",
    date_start: "2023-01-21",
    date_end: "",
    hour_start: "20:00",
    hour_end: "02:00",
    lieu: {
      ville: "Rennes",
      adresse: "123 Boulevard de Verdun",
      code_postal: "35000",
      codeDepartement: "35",
    },
    description:
      "La 1ere édition de la nuit du Blues aura lieu à la Maison Blues (Bleue).",
    category: "Concert",
    price: 20,
    download_url:
      "http://lamaisonbleuerennes.fr/wp-content/uploads/2022/11/NUIT-DU-BLUESbanniere-e1667984617129.png",
    website: "http://lamaisonbleuerennes.fr/evenement-la-nuit-du-blues/",
  },
  {
    id: 5,
    name: "Texture Crew",
    date_start: "2023-01-21",
    date_end: "",
    hour_start: "16:00",
    hour_end: "01:00",
    lieu: {
      ville: "Rennes",
      adresse: "20 Rue Vasselot",
      code_postal: "35000",
      codeDepartement: "35",
    },
    description:
      "Après une fin d’année au chaud, le Texture Crew est de retour, pour vous ambiancer le temps d’une soirée.",
    category: "Concert",
    price: 0,
    download_url:
      "https://scontent-cdt1-1.xx.fbcdn.net/v/t39.30808-6/324624082_2084434511749007_6943076789843916374_n.jpg?stp=dst-jpg_s960x960&_nc_cat=106&ccb=1-7&_nc_sid=340051&_nc_ohc=u_zJqO8MZUwAX9LC5Ek&_nc_ht=scontent-cdt1-1.xx&oh=00_AfB3A02EYSRoHuspuitWzMtpwAuweZrctnstp98u_cE_Bw&oe=63CB9CBB",
    website: "http://lesparadisperdus.fr/",
  },
  {
    id: 6,
    name: "Vernissage exposition photographique",
    date_start: "2023-01-21",
    date_end: "",
    hour_start: "11:00",
    hour_end: "12:15",
    lieu: {
      ville: "Rennes",
      adresse: "59 Rue Papu",
      code_postal: "35000",
      codeDepartement: "35",
    },
    description:
      "Je vous invite à découvrir l'exposition photographique Goodwood Revival",
    category: "Exposition",
    price: 0,
    download_url:
      "https://scontent-cdt1-1.xx.fbcdn.net/v/t39.30808-6/324499344_650388926775099_5855722870993432582_n.jpg?stp=dst-jpg_s960x960&_nc_cat=109&ccb=1-7&_nc_sid=340051&_nc_ohc=W8wW1KD6A1sAX9vbOUF&_nc_ht=scontent-cdt1-1.xx&oh=00_AfCQipfjrZJNyDZcbxii6bzPY_xIN5uEbJpDkHELpfPTPw&oe=63CAB95D",
    website:
      "https://allevents.in/rennes/vernissage-exposition-photographique-goodwood-revival/200023917154248?ref=eventlist-new-nearby",
  },
  {
    id: 7,
    name: "Family brunch",
    date_start: "2023-01-22",
    date_end: "",
    hour_start: "11:00",
    hour_end: "15:00",
    lieu: {
      ville: "Rennes",
      adresse: "103 boulevard marechal de lattre de tassigny",
      code_postal: "35000",
      codeDepartement: "35",
    },
    description:
      "Venez passer un moment aussi gourmand que convivial et rencontrer d'autres anglophones.",
    category: "Nourriture",
    price: 16,
    download_url:
      "https://scontent-cdt1-1.xx.fbcdn.net/v/t39.30808-6/325938378_1592586087840132_5842476606458394848_n.jpg?stp=dst-jpg_p180x540&_nc_cat=106&ccb=1-7&_nc_sid=340051&_nc_ohc=Gmd45Hl3Y-QAX856vgM&_nc_ht=scontent-cdt1-1.xx&oh=00_AfDrqL-C8iuananFYjmSwixVEuUhxBXXIZjDyLROeXO01g&oe=63CC4C00",
    website: "https://www.auxbeauxparleurs.com/event-details/familly-brunch",
  },
];
