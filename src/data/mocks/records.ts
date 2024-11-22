import { Record } from "@/types/record.types";
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
    date: "2024-11-18",
    content: "울코스 세탁중",
    exeHistory: [
      {
        name: "섬세세탁",
        startTime: "2024-11-18 07:30:00",
        endTime: "2024-11-18 08:30:00",
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
];
// export const records: Record[] = [
//   {
//     title: "에어컨 실행",
//     date: "2024-11-20",
//     content: "여름이 아직 안 끝난 줄 아는 에어컨의 하루",
//     exeHistory: [
//       {
//         name: "파워냉방모드",
//         startTime: "2024-11-20 09:00:00",
//         endTime: "2024-11-20 10:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 3000,
//           fare: 450,
//         },
//       },
//       {
//         name: "열대야모드",
//         startTime: "2024-11-20 13:00:00",
//         endTime: "2024-11-20 14:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 2500,
//           fare: 375,
//         },
//       },
//     ],
//     exekey: "WM_20241120_0900",
//   },
//   {
//     title: "건조기 실행",
//     date: "2024-11-20",
//     content: "빨래야 기다려라! 슈퍼 드라이어 등장",
//     exeHistory: [
//       {
//         name: "표준건조",
//         startTime: "2024-11-20 15:00:00",
//         endTime: "2024-11-20 16:00:00",
//         status: "running",
//         duration: 3600,
//         eleUsage: {
//           Wh: 2000,
//           fare: 300,
//         },
//       },
//     ],
//     exekey: "DR_20241120_1500",
//   },
//   {
//     title: "로봇청소기 실행",
//     date: "2024-11-02",
//     content: "먼지를 찾아 떠나는 우주 탐험",
//     exeHistory: [
//       {
//         name: "자동청소",
//         startTime: "2024-11-02 11:00:00",
//         endTime: "2024-11-02 11:45:00",
//         status: "fail",
//         duration: 2700,
//         eleUsage: {
//           Wh: 100,
//           fare: 15,
//         },
//       },
//     ],
//     exekey: "RC_20241102_1100",
//   },
//   {
//     title: "세탁기 실행",
//     date: "2024-11-18",
//     content: "옷들의 스파 데이트",
//     exeHistory: [
//       {
//         name: "섬세세탁",
//         startTime: "2024-11-18 07:30:00",
//         endTime: "2024-11-18 08:30:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 500,
//           fare: 75,
//         },
//       },
//     ],
//     exekey: "WM_20241118_0730",
//   },
//   {
//     title: "건조기 실행",
//     date: "2024-11-15", // 날짜 변경
//     content: "젖은 양말의 반란을 막아라!",
//     exeHistory: [
//       {
//         name: "속건조",
//         startTime: "2024-11-15 09:00:00",
//         endTime: "2024-11-15 09:45:00",
//         status: "success",
//         duration: 2700,
//         eleUsage: {
//           Wh: 1500,
//           fare: 225,
//         },
//       },
//     ],
//     exekey: "DR_20241115_0900",
//   },
//   {
//     title: "공기청정기 실행",
//     date: "2024-11-19",
//     content: "미세먼지 사냥꾼 출동!",
//     exeHistory: [
//       {
//         name: "고속정화",
//         startTime: "2024-11-19 12:00:00",
//         endTime: "2024-11-19 13:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 60,
//           fare: 9,
//         },
//       },
//     ],
//     exekey: "AP_20241119_1200",
//   },
//   {
//     title: "로봇청소기 실행",
//     date: "2024-11-19",
//     content: "거실의 먼지를 섬멸하라!",
//     exeHistory: [
//       {
//         name: "거실청소",
//         startTime: "2024-11-19 14:00:00",
//         endTime: "2024-11-19 14:30:00",
//         status: "success",
//         duration: 1800,
//         eleUsage: {
//           Wh: 50,
//           fare: 7,
//         },
//       },
//     ],
//     exekey: "RC_20241119_1400",
//   },
//   {
//     title: "에어컨 실행",
//     date: "2024-11-10",
//     content: "겨울에도 더운 게이머의 방",
//     exeHistory: [
//       {
//         name: "쿨링",
//         startTime: "2024-11-10 10:00:00",
//         endTime: "2024-11-10 11:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 1800,
//           fare: 270,
//         },
//       },
//     ],
//     exekey: "AC_20241110_1000",
//   },
//   {
//     title: "세탁기 실행",
//     date: "2024-11-17", // 날짜 변경
//     content: "옷들의 물놀이 파티",
//     exeHistory: [
//       {
//         name: "표준세탁",
//         startTime: "2024-11-17 08:00:00",
//         endTime: "2024-11-17 09:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 700,
//           fare: 105,
//         },
//       },
//       {
//         name: "강력세척",
//         startTime: "2024-11-17 14:00:00",
//         endTime: "2024-11-17 15:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 900,
//           fare: 135,
//         },
//       },
//     ],
//     exekey: "WM_20241117_0800",
//   },
//   {
//     title: "공기청정기 실행",
//     date: "2024-11-16", // 날짜 변경
//     content: "초미세먼지도 못 피하는 공기 청정 닌자",
//     exeHistory: [
//       {
//         name: "저속정화",
//         startTime: "2024-11-16 22:00:00",
//         endTime: "2024-11-16 23:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 30,
//           fare: 4,
//         },
//       },
//     ],
//     exekey: "AP_20241116_2200",
//   },
//   {
//     title: "식기세척기 실행",
//     date: "2024-11-13", // 날짜 변경
//     content: "설거지는 가라! 식기세척 용병 출동",
//     exeHistory: [
//       {
//         name: "강력세척",
//         startTime: "2024-11-13 19:00:00",
//         endTime: "2024-11-13 20:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 1200,
//           fare: 180,
//         },
//       },
//     ],
//     exekey: "DW_20241113_1900",
//   },
//   {
//     title: "전기오븐 실행",
//     date: "2024-11-14", // 날짜 변경
//     content: "오늘은 내가 프로 베이커!",
//     exeHistory: [
//       {
//         name: "오븐베이킹",
//         startTime: "2024-11-14 16:00:00",
//         endTime: "2024-11-14 17:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 2200,
//           fare: 330,
//         },
//       },
//     ],
//     exekey: "OV_20241114_1600",
//   },
//   {
//     title: "전기밥솥 실행",
//     date: "2024-11-21",
//     content: "우주 최강 밥짓기 프로젝트",
//     exeHistory: [
//       {
//         name: "일반취사",
//         startTime: "2024-11-21 17:30:00",
//         endTime: "2024-11-21 18:15:00",
//         status: "success",
//         duration: 2700,
//         eleUsage: {
//           Wh: 1000,
//           fare: 150,
//         },
//       },
//     ],
//     exekey: "RC_20241121_1730",
//   },
//   {
//     title: "무선청소기 실행",
//     date: "2024-11-12", // 날짜 변경
//     content: "먼지잡이 검객의 화려한 검술",
//     exeHistory: [
//       {
//         name: "터보청소",
//         startTime: "2024-11-12 18:00:00",
//         endTime: "2024-11-12 18:30:00",
//         status: "success",
//         duration: 1800,
//         eleUsage: {
//           Wh: 150,
//           fare: 22,
//         },
//       },
//     ],
//     exekey: "VC_20241112_1800",
//   },
//   {
//     title: "의류관리기 실행",
//     date: "2024-11-11", // 날짜 변경
//     content: "구겨진 셔츠의 부활을 기대하며",
//     exeHistory: [
//       {
//         name: "표준케어",
//         startTime: "2024-11-11 20:00:00",
//         endTime: "2024-11-11 21:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 800,
//           fare: 120,
//         },
//       },
//     ],
//     exekey: "CS_20241111_2000",
//   },
// ];
// export const records: Record[] = [
//   {
//     title: "에어컨 실행",
//     date: "2024-11-20",
//     content: "에어컨의 대활약",
//     exeHistory: [
//       {
//         name: "파워냉방모드",
//         startTime: "2024-11-20 09:00:00",
//         endTime: "2024-11-20 10:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 3000,
//           fare: 450,
//         },
//       },
//       {
//         name: "열대야모드",
//         startTime: "2024-11-20 13:00:00",
//         endTime: "2024-11-20 14:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 2500,
//           fare: 375,
//         },
//       },
//     ],
//     exekey: "WM_20241120_0900",
//   },
//   {
//     title: "건조기 실행",
//     date: "2024-11-20",
//     content: "모조리 다 말려버리겠어!",
//     exeHistory: [
//       {
//         name: "표준건조",
//         startTime: "2024-11-20 15:00:00",
//         endTime: "2024-11-20 16:00:00",
//         status: "running",
//         duration: 3600,
//         eleUsage: {
//           Wh: 2000,
//           fare: 300,
//         },
//       },
//     ],
//     exekey: "DR_20241120_1500",
//   },
//   {
//     title: "로봇청소기 실행",
//     date: "2024-11-02",
//     content: "전체 청소",
//     exeHistory: [
//       {
//         name: "자동청소",
//         startTime: "2024-11-02 11:00:00",
//         endTime: "2024-11-02 11:45:00",
//         status: "fail",
//         duration: 2700,
//         eleUsage: {
//           Wh: 100,
//           fare: 15,
//         },
//       },
//     ],
//     exekey: "RC_20241102_1100",
//   },
//   {
//     title: "세탁기 실행",
//     date: "2024-11-18",
//     content: "섬세 세탁 코스",
//     exeHistory: [
//       {
//         name: "섬세세탁",
//         startTime: "2024-11-18 07:30:00",
//         endTime: "2024-11-18 08:30:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 500,
//           fare: 75,
//         },
//       },
//     ],
//     exekey: "WM_20241118_0730",
//   },
//   {
//     title: "건조기 실행",
//     date: "2024-11-18",
//     content: "",
//     exeHistory: [
//       {
//         name: "속건조",
//         startTime: "2024-11-18 09:00:00",
//         endTime: "2024-11-18 09:45:00",
//         status: "success",
//         duration: 2700,
//         eleUsage: {
//           Wh: 1500,
//           fare: 225,
//         },
//       },
//     ],
//     exekey: "DR_20241118_0900",
//   },
//   {
//     title: "공기청정기 실행",
//     date: "2024-11-19",
//     content: "오염도 제거 모드",
//     exeHistory: [
//       {
//         name: "고속정화",
//         startTime: "2024-11-19 12:00:00",
//         endTime: "2024-11-19 13:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 60,
//           fare: 9,
//         },
//       },
//     ],
//     exekey: "AP_20241119_1200",
//   },
//   {
//     title: "로봇청소기 실행",
//     date: "2024-11-19",
//     content: "거실 청소",
//     exeHistory: [
//       {
//         name: "거실청소",
//         startTime: "2024-11-19 14:00:00",
//         endTime: "2024-11-19 14:30:00",
//         status: "success",
//         duration: 1800,
//         eleUsage: {
//           Wh: 50,
//           fare: 7,
//         },
//       },
//     ],
//     exekey: "RC_20241119_1400",
//   },
//   {
//     title: "에어컨 실행",
//     date: "2024-11-10",
//     content: "냉방 모드",
//     exeHistory: [
//       {
//         name: "쿨링",
//         startTime: "2024-11-10 10:00:00",
//         endTime: "2024-11-10 11:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 1800,
//           fare: 270,
//         },
//       },
//     ],
//     exekey: "AC_20241110_1000",
//   },
//   {
//     title: "세탁기 실행",
//     date: "2024-11-21", // 날짜 수정됨
//     content: "표준 세탁 코스",
//     exeHistory: [
//       {
//         name: "표준세탁",
//         startTime: "2024-11-21 08:00:00",
//         endTime: "2024-11-21 09:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 700,
//           fare: 105,
//         },
//       },
//       {
//         name: "강력세척",
//         startTime: "2024-11-21 14:00:00",
//         endTime: "2024-11-21 15:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 900,
//           fare: 135,
//         },
//       },
//     ],
//     exekey: "WM_20241121_0800",
//   },
//   {
//     title: "공기청정기 실행",
//     date: "2024-11-21", // 날짜 수정됨
//     content: "야간 모드",
//     exeHistory: [
//       {
//         name: "저속정화",
//         startTime: "2024-11-21 22:00:00",
//         endTime: "2024-11-21 23:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 30,
//           fare: 4,
//         },
//       },
//     ],
//     exekey: "AP_20241121_2200",
//   },
//   // 새로 추가된 레코드들
//   {
//     title: "식기세척기 실행",
//     date: "2024-11-21",
//     content: "강력 세척 모드",
//     exeHistory: [
//       {
//         name: "강력세척",
//         startTime: "2024-11-21 19:00:00",
//         endTime: "2024-11-21 20:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 1200,
//           fare: 180,
//         },
//       },
//     ],
//     exekey: "DW_20241121_1900",
//   },
//   {
//     title: "전기오븐 실행",
//     date: "2024-11-20",
//     content: "베이킹 모드",
//     exeHistory: [
//       {
//         name: "오븐베이킹",
//         startTime: "2024-11-20 16:00:00",
//         endTime: "2024-11-20 17:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 2200,
//           fare: 330,
//         },
//       },
//     ],
//     exekey: "OV_20241120_1600",
//   },
//   {
//     title: "전기밥솥 실행",
//     date: "2024-11-21",
//     content: "백미 취사",
//     exeHistory: [
//       {
//         name: "일반취사",
//         startTime: "2024-11-21 17:30:00",
//         endTime: "2024-11-21 18:15:00",
//         status: "success",
//         duration: 2700,
//         eleUsage: {
//           Wh: 1000,
//           fare: 150,
//         },
//       },
//     ],
//     exekey: "RC_20241121_1730",
//   },
//   {
//     title: "무선청소기 실행",
//     date: "2024-11-20",
//     content: "터보 모드",
//     exeHistory: [
//       {
//         name: "터보청소",
//         startTime: "2024-11-20 18:00:00",
//         endTime: "2024-11-20 18:30:00",
//         status: "success",
//         duration: 1800,
//         eleUsage: {
//           Wh: 150,
//           fare: 22,
//         },
//       },
//     ],
//     exekey: "VC_20241120_1800",
//   },
//   {
//     title: "의류관리기 실행",
//     date: "2024-11-21",
//     content: "표준 관리",
//     exeHistory: [
//       {
//         name: "표준케어",
//         startTime: "2024-11-21 20:00:00",
//         endTime: "2024-11-21 21:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 800,
//           fare: 120,
//         },
//       },
//     ],
//     exekey: "CS_20241121_2000",
//   },
// ];
// export const records: Record[] = [
//   {
//     title: "에어컨 실행",
//     date: "2024-11-20",
//     content: "에어컨의 대활약",
//     exeHistory: [
//       {
//         name: "파워냉방모드",
//         startTime: "2024-11-20 09:00:00",
//         endTime: "2024-11-20 10:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 3000,
//           fare: 450,
//         },
//       },
//       {
//         name: "열대야모드",
//         startTime: "2024-11-20 13:00:00",
//         endTime: "2024-11-20 14:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 2500,
//           fare: 375,
//         },
//       },
//     ],
//     exekey: "WM_20241120_0900",
//   },
//   {
//     title: "건조기 실행",
//     date: "2024-11-20",
//     content: "모조리 다 말려버리겠어!",
//     exeHistory: [
//       {
//         name: "표준건조",
//         startTime: "2024-11-20 15:00:00",
//         endTime: "2024-11-20 16:00:00",
//         status: "running",
//         duration: 3600,
//         eleUsage: {
//           Wh: 2000,
//           fare: 300,
//         },
//       },
//     ],
//     exekey: "DR_20241120_1500",
//   },
//   {
//     title: "로봇청소기 실행",
//     date: "2024-11-02",
//     content: "전체 청소",
//     exeHistory: [
//       {
//         name: "자동청소",
//         startTime: "2024-11-02 11:00:00",
//         endTime: "2024-11-02 11:45:00",
//         status: "fail",
//         duration: 2700,
//         eleUsage: {
//           Wh: 100,
//           fare: 15,
//         },
//       },
//     ],
//     exekey: "RC_20241102_1100",
//   },
//   {
//     title: "세탁기 실행",
//     date: "2024-11-18",
//     content: "섬세 세탁 코스",
//     exeHistory: [
//       {
//         name: "섬세세탁",
//         startTime: "2024-11-18 07:30:00",
//         endTime: "2024-11-18 08:30:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 500,
//           fare: 75,
//         },
//       },
//     ],
//     exekey: "WM_20241118_0730",
//   },
//   {
//     title: "건조기 실행",
//     date: "2024-11-18",
//     content: "",
//     exeHistory: [
//       {
//         name: "속건조",
//         startTime: "2024-11-18 09:00:00",
//         endTime: "2024-11-18 09:45:00",
//         status: "success",
//         duration: 2700,
//         eleUsage: {
//           Wh: 1500,
//           fare: 225,
//         },
//       },
//     ],
//     exekey: "DR_20241118_0900",
//   },
//   {
//     title: "공기청정기 실행",
//     date: "2024-11-19",
//     content: "오염도 제거 모드",
//     exeHistory: [
//       {
//         name: "고속정화",
//         startTime: "2024-11-19 12:00:00",
//         endTime: "2024-11-19 13:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 60,
//           fare: 9,
//         },
//       },
//     ],
//     exekey: "AP_20241119_1200",
//   },
//   {
//     title: "로봇청소기 실행",
//     date: "2024-11-19",
//     content: "거실 청소",
//     exeHistory: [
//       {
//         name: "거실청소",
//         startTime: "2024-11-19 14:00:00",
//         endTime: "2024-11-19 14:30:00",
//         status: "success",
//         duration: 1800,
//         eleUsage: {
//           Wh: 50,
//           fare: 7,
//         },
//       },
//     ],
//     exekey: "RC_20241119_1400",
//   },
//   {
//     title: "에어컨 실행",
//     date: "2024-11-10",
//     content: "냉방 모드",
//     exeHistory: [
//       {
//         name: "쿨링",
//         startTime: "2024-11-10 10:00:00",
//         endTime: "2024-11-10 11:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 1800,
//           fare: 270,
//         },
//       },
//     ],
//     exekey: "AC_20241110_1000",
//   },
//   {
//     title: "세탁기 실행",
//     date: "2024-11-25",
//     content: "표준 세탁 코스",
//     exeHistory: [
//       {
//         name: "표준세탁",
//         startTime: "2024-11-25 08:00:00",
//         endTime: "2024-11-25 09:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 700,
//           fare: 105,
//         },
//       },
//       {
//         name: "강력세척",
//         startTime: "2024-11-25 14:00:00",
//         endTime: "2024-11-25 15:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 900,
//           fare: 135,
//         },
//       },
//     ],
//     exekey: "WM_20241125_0800",
//   },
//   {
//     title: "공기청정기 실행",
//     date: "2024-11-25",
//     content: "야간 모드",
//     exeHistory: [
//       {
//         name: "저속정화",
//         startTime: "2024-11-25 22:00:00",
//         endTime: "2024-11-25 23:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 30,
//           fare: 4,
//         },
//       },
//     ],
//     exekey: "AP_20241125_2200",
//   },
// ];

// import { Record } from "@/types/record.types";

// export const records: Record[] = [
//   {
//     title: "에어컨 실행",
//     date: "2024-11-20",
//     content: "에어컨의 대활약",
//     exeHistory: [
//       {
//         name: "파워냉방모드",
//         startTime: "2024-11-20 09:00:00",
//         endTime: "2024-11-20 10:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 2000,
//           fare: 300,
//         },
//       },
//       {
//         name: "열대야모드",
//         startTime: "2024-11-20 13:00:00",
//         endTime: "2024-11-20 14:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 1800,
//           fare: 270,
//         },
//       },
//     ],
//     exekey: "WM_20241120_0900",
//   },
//   {
//     title: "건조기 실행",
//     date: "2024-11-20",
//     content: "모조리 다 말려버리겠어!",
//     exeHistory: [
//       {
//         name: "표준건조",
//         startTime: "2024-11-20 15:00:00",
//         endTime: "2024-11-20 16:00:00",
//         status: "running",
//         duration: 3600,
//         eleUsage: {
//           Wh: 2500,
//           fare: 375,
//         },
//       },
//     ],
//     exekey: "DR_20241120_1500",
//   },
//   {
//     title: "로봇청소기 실행",
//     date: "2024-11-02",
//     content: "전체 청소",
//     exeHistory: [
//       {
//         name: "자동청소",
//         startTime: "2024-11-02 11:00:00",
//         endTime: "2024-11-02 11:45:00",
//         status: "fail",
//         duration: 2700,
//         eleUsage: {
//           Wh: 500,
//           fare: 75,
//         },
//       },
//     ],
//     exekey: "RC_20241102_1100",
//   },
//   {
//     title: "세탁기 실행",
//     date: "2024-11-18",
//     content: "섬세 세탁 코스",
//     exeHistory: [
//       {
//         name: "섬세세탁",
//         startTime: "2024-11-18 07:30:00",
//         endTime: "2024-11-18 08:30:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 1500,
//           fare: 225,
//         },
//       },
//     ],
//     exekey: "WM_20241118_0730",
//   },
//   {
//     title: "건조기 실행",
//     date: "2024-11-18",
//     content: "",
//     exeHistory: [
//       {
//         name: "속건조",
//         startTime: "2024-11-18 09:00:00",
//         endTime: "2024-11-18 09:45:00",
//         status: "success",
//         duration: 2700,
//         eleUsage: {
//           Wh: 1200,
//           fare: 180,
//         },
//       },
//     ],
//     exekey: "DR_20241118_0900",
//   },
//   {
//     title: "공기청정기 실행",
//     date: "2024-11-19",
//     content: "오염도 제거 모드",
//     exeHistory: [
//       {
//         name: "고속정화",
//         startTime: "2024-11-19 12:00:00",
//         endTime: "2024-11-19 13:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 800,
//           fare: 120,
//         },
//       },
//     ],
//     exekey: "AP_20241119_1200",
//   },
//   {
//     title: "로봇청소기 실행",
//     date: "2024-11-19",
//     content: "거실 청소",
//     exeHistory: [
//       {
//         name: "거실청소",
//         startTime: "2024-11-19 14:00:00",
//         endTime: "2024-11-19 14:30:00",
//         status: "success",
//         duration: 1800,
//         eleUsage: {
//           Wh: 300,
//           fare: 45,
//         },
//       },
//     ],
//     exekey: "RC_20241119_1400",
//   },
//   {
//     title: "에어컨 실행",
//     date: "2024-11-10",
//     content: "냉방 모드",
//     exeHistory: [
//       {
//         name: "쿨링",
//         startTime: "2024-11-10 10:00:00",
//         endTime: "2024-11-10 11:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 3500,
//           fare: 525,
//         },
//       },
//     ],
//     exekey: "AC_20241110_1000",
//   },
//   {
//     title: "세탁기 실행",
//     date: "2024-11-25",
//     content: "표준 세탁 코스",
//     exeHistory: [
//       {
//         name: "표준세탁",
//         startTime: "2024-11-25 08:00:00",
//         endTime: "2024-11-25 09:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 1900,
//           fare: 285,
//         },
//       },
//       {
//         name: "강력세척",
//         startTime: "2024-11-25 14:00:00",
//         endTime: "2024-11-25 15:30:00",
//         status: "success",
//         duration: 5400,
//         eleUsage: {
//           Wh: 2000,
//           fare: 300,
//         },
//       },
//     ],
//     exekey: "WM_20241125_0800",
//   },
//   {
//     title: "공기청정기 실행",
//     date: "2024-11-25",
//     content: "야간 모드",
//     exeHistory: [
//       {
//         name: "저속정화",
//         startTime: "2024-11-25 22:00:00",
//         endTime: "2024-11-25 23:00:00",
//         status: "success",
//         duration: 3600,
//         eleUsage: {
//           Wh: 500,
//           fare: 75,
//         },
//       },
//     ],
//     exekey: "AP_20241125_2200",
//   },
// ];
