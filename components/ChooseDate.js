import { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { EventsContext } from "../contexts/EventsContext";

export default function ChooseDate() {
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [startDate, setStartDate] = useState("");

  const { chooseDate, setChooseDate } = useContext(EventsContext);

  const handleConfirmDate = (chooseDate) => {
    setDisplayCalendar(false);
    setChooseDate(chooseDate);
    setMarkedDates({});
    console.log("chooseDate", chooseDate);
  };

  const handleOpenCalendar = () => {
    setIsStartDatePicked(false);
    setDisplayCalendar(true);
  };

  const handleCloseCalendar = () => {
    setIsStartDatePicked(false);
    setDisplayCalendar(false);
    setMarkedDates({});
  };

  const formatDate = (chooseDate) => {
    let dateStartFormatted = moment(Object.keys(chooseDate)[0]).format(
      "DD/MM/YYYY"
    );
    let dateEndFormatted = moment(
      Object.keys(chooseDate)[Object.keys(chooseDate).length - 1]
    ).format("DD/MM/YYYY");

    dateStartFormatted = moment(dateStartFormatted, "DD/MM/YYYY").format(
      "DD MMM YYYY"
    );
    dateEndFormatted = moment(dateEndFormatted, "DD/MM/YYYY").format(
      "DD MMM YYYY"
    );
    if (dateStartFormatted == dateEndFormatted) return dateStartFormatted;
    return dateStartFormatted + " - " + dateEndFormatted;
  };

  const onDayPress = (day) => {
    console.log("selected day", day);
    if (isStartDatePicked == false) {
      let markedDates = {};
      markedDates[day.dateString] = {
        startingDay: true,
        color: "#00B0BF",
        textColor: "#FFFFFF",
      };
      setMarkedDates(markedDates);
      setIsStartDatePicked(true);
      setStartDate(day.dateString);
    } else {
      let newMarkedDates = markedDates;
      let newStartDate = moment(startDate);
      let endDate = moment(day.dateString);
      let range = endDate.diff(newStartDate, "days");
      if (range > 0) {
        for (let i = 1; i <= range; i++) {
          let tempDate = newStartDate.add(1, "day");
          tempDate = moment(tempDate).format("YYYY-MM-DD");
          if (i < range) {
            newMarkedDates[tempDate] = {
              color: "#00B0BF",
              textColor: "#FFFFFF",
            };
          } else {
            newMarkedDates[tempDate] = {
              endingDay: true,
              color: "#00B0BF",
              textColor: "#FFFFFF",
            };
          }
        }
        setMarkedDates(newMarkedDates);
        setStartDate("");
      } else {
        alert("Select an upcomming date!");
      }
    }
  };

  return displayCalendar ? (
    <Calendar
      onDayPress={(date) => {
        onDayPress(date);
      }}
      enableSwipeMonths={true}
      markedDates={markedDates}
      markingType={"period"}
      renderHeader={(date) => {
        return (
          <View>
            <TouchableOpacity onPress={() => handleCloseCalendar()}>
              <Text>
                {date.toString().substring(4, 7)} {date.getFullYear()}
              </Text>
            </TouchableOpacity>
            {isStartDatePicked ? (
              <TouchableOpacity onPress={() => handleConfirmDate(markedDates)}>
                <Ionicons name="checkmark-circle-outline" size={24} />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </View>
        );
      }}
    />
  ) : (
    <TouchableOpacity
      style={{ fontSize: 20, margin: 10, flexDirection: "row" }}
      onPress={() => handleOpenCalendar()}
    >
      {isStartDatePicked ? (
        <Text style={{ fontSize: 20, fontFamily: "Questrial" }}>
          {formatDate(chooseDate)}
        </Text>
      ) : (
        <Text style={{ fontSize: 20, fontFamily: "Questrial" }}>
          Maintenant
        </Text>
      )}
      <Ionicons name="chevron-down-outline" size={24} style={{}} />
    </TouchableOpacity>
  );
}
