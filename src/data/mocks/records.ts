import { Record } from "@/types/record.types";

export const records: Record[] = [
  {
    title: "에어컨 실행",
    date: "2024-11-20",
    content: "에어컨의 대활약",
    exeHistory: [
      {
        name: "파워냉방모드",
        startTime: "2024-11-20 09:00:00",
        endTime: "2024-11-20 10:30:00",
        status: "success",
        duration: 5400,
        eleUsage: {
          Wh: 2000,
          fare: 300,
        },
      },
      {
        name: "열대야모드",
        startTime: "2024-11-20 13:00:00",
        endTime: "2024-11-20 14:30:00",
        status: "success",
        duration: 5400,
        eleUsage: {
          Wh: 1800,
          fare: 270,
        },
      },
    ],
    exekey: "WM_20241120_0900",
  },
  {
    title: "건조기 실행",
    date: "2024-11-20",
    content: "모조리 다 말려버리겠어!",
    exeHistory: [
      {
        name: "표준건조",
        startTime: "2024-11-20 15:00:00",
        endTime: "2024-11-20 16:00:00",
        status: "running",
        duration: 3600,
        eleUsage: {
          Wh: 2500,
          fare: 375,
        },
      },
    ],
    exekey: "DR_20241120_1500",
  },
  {
    title: "로봇청소기 실행",
    date: "2024-11-02",
    content: "전체 청소",
    exeHistory: [
      {
        name: "자동청소",
        startTime: "2024-11-02 11:00:00",
        endTime: "2024-11-02 11:45:00",
        status: "fail",
        duration: 2700,
        eleUsage: {
          Wh: 500,
          fare: 75,
        },
      },
    ],
    exekey: "RC_20241102_1100",
  },
  {
    title: "세탁기 실행",
    date: "2024-11-18",
    content: "섬세 세탁 코스",
    exeHistory: [
      {
        name: "섬세세탁",
        startTime: "2024-11-18 07:30:00",
        endTime: "2024-11-18 08:30:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 1500,
          fare: 225,
        },
      },
    ],
    exekey: "WM_20241118_0730",
  },
  {
    title: "건조기 실행",
    date: "2024-11-18",
    content: "",
    exeHistory: [
      {
        name: "속건조",
        startTime: "2024-11-18 09:00:00",
        endTime: "2024-11-18 09:45:00",
        status: "success",
        duration: 2700,
        eleUsage: {
          Wh: 1200,
          fare: 180,
        },
      },
    ],
    exekey: "DR_20241118_0900",
  },
  {
    title: "공기청정기 실행",
    date: "2024-11-19",
    content: "오염도 제거 모드",
    exeHistory: [
      {
        name: "고속정화",
        startTime: "2024-11-19 12:00:00",
        endTime: "2024-11-19 13:00:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 800,
          fare: 120,
        },
      },
    ],
    exekey: "AP_20241119_1200",
  },
  {
    title: "로봇청소기 실행",
    date: "2024-11-19",
    content: "거실 청소",
    exeHistory: [
      {
        name: "거실청소",
        startTime: "2024-11-19 14:00:00",
        endTime: "2024-11-19 14:30:00",
        status: "success",
        duration: 1800,
        eleUsage: {
          Wh: 300,
          fare: 45,
        },
      },
    ],
    exekey: "RC_20241119_1400",
  },
  {
    title: "에어컨 실행",
    date: "2024-11-10",
    content: "냉방 모드",
    exeHistory: [
      {
        name: "쿨링",
        startTime: "2024-11-10 10:00:00",
        endTime: "2024-11-10 11:00:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 3500,
          fare: 525,
        },
      },
    ],
    exekey: "AC_20241110_1000",
  },
  {
    title: "세탁기 실행",
    date: "2024-11-25",
    content: "표준 세탁 코스",
    exeHistory: [
      {
        name: "표준세탁",
        startTime: "2024-11-25 08:00:00",
        endTime: "2024-11-25 09:30:00",
        status: "success",
        duration: 5400,
        eleUsage: {
          Wh: 1900,
          fare: 285,
        },
      },
      {
        name: "강력세척",
        startTime: "2024-11-25 14:00:00",
        endTime: "2024-11-25 15:30:00",
        status: "success",
        duration: 5400,
        eleUsage: {
          Wh: 2000,
          fare: 300,
        },
      },
    ],
    exekey: "WM_20241125_0800",
  },
  {
    title: "공기청정기 실행",
    date: "2024-11-25",
    content: "야간 모드",
    exeHistory: [
      {
        name: "저속정화",
        startTime: "2024-11-25 22:00:00",
        endTime: "2024-11-25 23:00:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 500,
          fare: 75,
        },
      },
    ],
    exekey: "AP_20241125_2200",
  },
];
