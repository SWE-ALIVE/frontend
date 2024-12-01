import { Record } from "@/types/record.types";
import { instance } from "./axios-instance";

export const getRecords = () => {
  const response = instance.get(`/records`);
  return records;
};

export const records: Record[] = [
  {
    title: "에어컨 실행",
    date: "2024-11-20",
    content: "시원한 하루",
    exeHistory: [
      {
        name: "파워냉방모드",
        startTime: "2024-11-20 09:00:00",
        endTime: "2024-11-20 10:30:00",
        status: "success",
        duration: 5400,
        eleUsage: {
          Wh: 1800,
          fare: 270,
        },
      },
      {
        name: "열대야모드",
        startTime: "2024-11-20 13:00:00",
        endTime: "2024-11-20 14:30:00",
        status: "success",
        duration: 5400,
        eleUsage: {
          Wh: 1500,
          fare: 225,
        },
      },
    ],
    exekey: "WM_20241120_0900",
  },
  {
    title: "건조기 실행",
    date: "2024-11-20",
    content: "빨래 말리기",
    exeHistory: [
      {
        name: "표준건조",
        startTime: "2024-11-20 15:00:00",
        endTime: "2024-11-20 16:00:00",
        status: "running",
        duration: 3600,
        eleUsage: {
          Wh: 3500,
          fare: 525,
        },
      },
    ],
    exekey: "DR_20241120_1500",
  },
  {
    title: "로봇청소기 실행",
    date: "2024-11-02",
    content: "청소 시작해요",
    exeHistory: [
      {
        name: "자동청소",
        startTime: "2024-11-02 11:00:00",
        endTime: "2024-11-02 11:45:00",
        status: "fail",
        duration: 2700,
        eleUsage: {
          Wh: 40,
          fare: 6,
        },
      },
    ],
    exekey: "RC_20241102_1100",
  },
  {
    title: "세탁기 실행",
    date: "2024-11-15",
    content: "울코스 세탁중",
    exeHistory: [
      {
        name: "섬세세탁",
        startTime: "2024-11-15 07:30:00",
        endTime: "2024-11-15 08:30:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 220,
          fare: 33,
        },
      },
    ],
    exekey: "WM_20241118_0730",
  },
  {
    title: "건조기 실행",
    date: "2024-11-15",
    content: "급한 빨래건조",
    exeHistory: [
      {
        name: "속건조",
        startTime: "2024-11-15 09:00:00",
        endTime: "2024-11-15 09:45:00",
        status: "success",
        duration: 2700,
        eleUsage: {
          Wh: 2800,
          fare: 420,
        },
      },
    ],
    exekey: "DR_20241115_0900",
  },
  {
    title: "공기청정기 실행",
    date: "2024-11-19",
    content: "공기 정화중",
    exeHistory: [
      {
        name: "고속정화",
        startTime: "2024-11-19 12:00:00",
        endTime: "2024-11-19 13:00:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 65,
          fare: 10,
        },
      },
    ],
    exekey: "AP_20241119_1200",
  },
  {
    title: "로봇청소기 실행",
    date: "2024-11-19",
    content: "거실 대청소",
    exeHistory: [
      {
        name: "거실청소",
        startTime: "2024-11-19 14:00:00",
        endTime: "2024-11-19 14:30:00",
        status: "success",
        duration: 1800,
        eleUsage: {
          Wh: 35,
          fare: 5,
        },
      },
    ],
    exekey: "RC_20241119_1400",
  },
  {
    title: "에어컨 실행",
    date: "2024-11-10",
    content: "실내 냉방",
    exeHistory: [
      {
        name: "쿨링",
        startTime: "2024-11-10 10:00:00",
        endTime: "2024-11-10 11:00:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 1200,
          fare: 180,
        },
      },
    ],
    exekey: "AC_20241110_1000",
  },
  {
    title: "세탁기 실행",
    date: "2024-11-17",
    content: "이불 세탁",
    exeHistory: [
      {
        name: "표준세탁",
        startTime: "2024-11-17 08:00:00",
        endTime: "2024-11-17 09:30:00",
        status: "success",
        duration: 5400,
        eleUsage: {
          Wh: 450,
          fare: 68,
        },
      },
      {
        name: "강력세척",
        startTime: "2024-11-17 14:00:00",
        endTime: "2024-11-17 15:30:00",
        status: "success",
        duration: 5400,
        eleUsage: {
          Wh: 600,
          fare: 90,
        },
      },
    ],
    exekey: "WM_20241117_0800",
  },
  {
    title: "공기청정기 실행",
    date: "2024-11-16",
    content: "취침모드",
    exeHistory: [
      {
        name: "저속정화",
        startTime: "2024-11-16 22:00:00",
        endTime: "2024-11-16 23:00:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 25,
          fare: 4,
        },
      },
    ],
    exekey: "AP_20241116_2200",
  },
  {
    title: "식기세척기 실행",
    date: "2024-11-13",
    content: "설거지 타임",
    exeHistory: [
      {
        name: "강력세척",
        startTime: "2024-11-13 19:00:00",
        endTime: "2024-11-13 20:30:00",
        status: "success",
        duration: 5400,
        eleUsage: {
          Wh: 1800,
          fare: 270,
        },
      },
    ],
    exekey: "DW_20241113_1900",
  },
  {
    title: "전기오븐 실행",
    date: "2024-11-14",
    content: "피자 굽기",
    exeHistory: [
      {
        name: "오븐베이킹",
        startTime: "2024-11-14 16:00:00",
        endTime: "2024-11-14 17:00:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 1500,
          fare: 225,
        },
      },
    ],
    exekey: "OV_20241114_1600",
  },
  {
    title: "전기밥솥 실행",
    date: "2024-11-21",
    content: "백미 취사중",
    exeHistory: [
      {
        name: "일반취사",
        startTime: "2024-11-21 17:30:00",
        endTime: "2024-11-21 18:15:00",
        status: "success",
        duration: 2700,
        eleUsage: {
          Wh: 1000,
          fare: 150,
        },
      },
    ],
    exekey: "RC_20241121_1730",
  },
  {
    title: "무선청소기 실행",
    date: "2024-11-12",
    content: "먼지제거",
    exeHistory: [
      {
        name: "터보청소",
        startTime: "2024-11-12 18:00:00",
        endTime: "2024-11-12 18:30:00",
        status: "success",
        duration: 1800,
        eleUsage: {
          Wh: 120,
          fare: 18,
        },
      },
    ],
    exekey: "VC_20241112_1800",
  },
  {
    title: "의류관리기 실행",
    date: "2024-11-11",
    content: "옷 관리중",
    exeHistory: [
      {
        name: "표준케어",
        startTime: "2024-11-11 20:00:00",
        endTime: "2024-11-11 21:00:00",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 1300,
          fare: 195,
        },
      },
    ],
    exekey: "CS_20241111_2000",
  },
  {
    title: "공기청정기 실행",
    date: "2024-12-1",
    content: "공기를 깨끗하게!",
    exeHistory: [
      {
        name: "자동 모드",
        startTime: "2024-12-01 15:26:25",
        endTime: "2024-11-11 15:57:25",
        status: "success",
        duration: 3600,
        eleUsage: {
          Wh: 1300,
          fare: 195,
        },
      },
    ],
    exekey: "CS_20241111_2012",
  },
  {
    title: "에어컨 실행",
    date: "2024-12-01",
    content: "집을 쾌적하게!",
    exeHistory: [
      {
        name: "냉방 모드",
        startTime: "2024-12-01 18:49:00",
        endTime: "2024-12-01 19:57:00",
        status: "success",
        duration: 4080,
        eleUsage: {
          Wh: 1700,
          fare: 255,
        },
      },
      {
        name: "제습 모드",
        startTime: "2024-12-01 15:13:49",
        endTime: "2024-12-01 15:56:49",
        status: "success",
        duration: 2580,
        eleUsage: {
          Wh: 502,
          fare: 75,
        },
      },
    ],
    exekey: "CS_20241111_1270",
  },
];
