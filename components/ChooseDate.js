import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ChooseDate() {
  const [chooseDate, setChooseDate] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  const [tempDate, setTempDate] = useState({});
  const [displayCalendar, setDisplayCalendar] = useState(false);
  const [confirmDate, setConfirmDate] = useState(false);

  console.log(chooseDate);
  const handleConfirmDate = (day) => {
    setConfirmDate(false);
    setDisplayCalendar(false);
    setChooseDate(day);
  };

  const handleCloseCalendar = () => {
    setDisplayCalendar(false);
    setConfirmDate(false);
  };

  return displayCalendar ? (
    <Calendar
      onDayPress={(date) => {
        console.log("selected day", date);
        setTempDate(date);
        setConfirmDate(!confirmDate);
      }}
      enableSwipeMonths={true}
      renderHeader={(date) => {
        return (
          <View>
            <TouchableOpacity onPress={() => handleCloseCalendar()}>
              <Text>
                {date.toString().substring(4, 7)} {date.getFullYear()}
              </Text>
            </TouchableOpacity>
            {confirmDate ? (
              <TouchableOpacity onPress={() => handleConfirmDate(tempDate)}>
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
      onPress={() => setDisplayCalendar(true)}
    >
      <Text style={{ fontSize: 20 }}>
        {chooseDate.day}/{chooseDate.month}/{chooseDate.year}
      </Text>
      <Ionicons name="chevron-down-outline" size={24} style={{}} />
    </TouchableOpacity>
  );
}
