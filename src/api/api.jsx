import axios from "axios";

const request = axios.create({
  baseURL: "https://apis.data.go.kr/B551011/KorService1/searchKeyword1",
  params: {
    serviceKey:
      "D6HvbqfFj6otDTGY3883h0C51xIplWlMUXEF+l5ZX9DTpTTNODdcI/6StO1BbYtjTAtOOKyj25hhnMVj4ASszw==",
    MobileOS: "ETC",
    MobileApp: "AppTest",
    _type: "json",
    listYN: "Y",
    arrange: "A",
    contentTypeId: 12,
  },
});

// export const baseUrl = "https://apis.data.go.kr/B551011/KorService1/";
// export const apiKey =
//   "D6HvbqfFj6otDTGY3883h0C51xIplWlMUXEF%2Bl5ZX9DTpTTNODdcI%2F6StO1BbYtjTAtOOKyj25hhnMVj4ASszw%3D%3D";
// export const numOfRows = 20;
// export const searchNumOfRows = 60;

export default request;
