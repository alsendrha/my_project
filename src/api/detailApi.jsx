import axios from "axios";

const request = axios.create({
  baseURL: "https://apis.data.go.kr/B551011/KorService1/detailCommon1",
  params: {
    serviceKey:
      "D6HvbqfFj6otDTGY3883h0C51xIplWlMUXEF+l5ZX9DTpTTNODdcI/6StO1BbYtjTAtOOKyj25hhnMVj4ASszw==",
    MobileOS: "ETC",
    MobileApp: "AppTest",
    _type: "json",
    contentTypeId: 12,
    defaultYN: "Y",
    overviewYN: "Y",
    numOfRows: 1,
    pageNo: 1,
  },
});

export default request;
