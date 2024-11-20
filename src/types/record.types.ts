export interface ExeHistory {
  name: string;
  startTime: string;
  endTime: string;
  status: "success" | "fail" | "running";
  duration: number;
  eleUsage: {
    Wh: number;
    fare: number;
  };
}

export interface Record {
  title: string;
  date: string;
  content: string;
  exeHistory: ExeHistory[];
  exekey: string;
}

export type MarkedDate = {
  marked?: boolean;
  dotColor?: string;
  selected?: boolean;
  selectedColor?: string;
  customStyles?: {
    container?: {
      backgroundColor?: string;
      borderRadius?: number;
    };
    text?: {
      color?: string;
    };
  };
};

export type MarkedDates = {
  [date: string]: MarkedDate;
};
