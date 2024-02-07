import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";

const containerStyle = {
  width: "700px",
  height: "400px",
};

const MyComponent = () => {
  const [mapInfo, setMapInfo] = useState({
    center: {
      lat: 0,
      lng: 0,
    },
  });
  useEffect(() => {
    dataInfo();
  }, []);

  const dataInfo = async () => {
    const res = await axios.get(
      "https://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=D6HvbqfFj6otDTGY3883h0C51xIplWlMUXEF%2Bl5ZX9DTpTTNODdcI%2F6StO1BbYtjTAtOOKyj25hhnMVj4ASszw%3D%3D&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&keyword=서울&contentTypeId=12"
    );
    console.log(res.data.response.body.items.item[0]);
    const newCenter = {
      lat: parseFloat(res.data.response.body.items.item[0].mapy),
      lng: parseFloat(res.data.response.body.items.item[0].mapx),
    };
    setMapInfo({ center: newCenter });
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAMUowo4dL4hO_oLvHA3CvHyINSAXjUIjI"
      loadingElement={<div style={{ height: "100%" }} />}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapInfo.center}
        zoom={14}
      >
        <MarkerF position={mapInfo.center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(MyComponent);
