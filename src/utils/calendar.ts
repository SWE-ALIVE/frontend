import { MarkedDates, Record } from "@/types/record.types";
import { Colors } from "@/constants/colors.constant";

export const createMarkedDates = (
  records: Record[],
  selectedDate: string
): MarkedDates => {
  const newMarkedDates = records.reduce((acc, record) => {
    acc[record.date] = {
      marked: true,
      dotColor: Colors.light.tint,
    };
    return acc;
  }, {} as MarkedDates);

  if (selectedDate) {
    newMarkedDates[selectedDate] = {
      ...(newMarkedDates[selectedDate] || {}),
      customStyles: {
        container: {
          backgroundColor: Colors.light.tint,
          borderRadius: 20,
        },
        text: {
          color: "white",
        },
      },
      marked: newMarkedDates[selectedDate]?.marked || false,
      dotColor: newMarkedDates[selectedDate]?.dotColor,
    };
  }

  return newMarkedDates;
};
