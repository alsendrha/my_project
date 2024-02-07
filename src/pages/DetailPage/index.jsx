import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./DetailPage.css";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const DetailPage = () => {
  const location = useLocation();
  const dataInfo = { ...location.state };
  const [detailContent, setDetailContent] = useState("");
  const APIS_KEY =
    "D6HvbqfFj6otDTGY3883h0C51xIplWlMUXEF%2Bl5ZX9DTpTTNODdcI%2F6StO1BbYtjTAtOOKyj25hhnMVj4ASszw%3D%3D";
  const containerStyle = {
    width: "700px",
    height: "400px",
    margin: "auto",
    borderRadius: "10px",
  };

  useEffect(() => {
    async function fetchData() {
      const response2 = await axios.get(
        `https://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${APIS_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${dataInfo.contentid}&contentTypeId=12&defaultYN=Y&overviewYN=Y&numOfRows=1&pageNo=1`
      );
      setDetailContent(response2.data.response.body.items.item[0].overview);
    }
    fetchData();
  }, []);

  if (dataInfo === null) return null;

  return (
    <div className="detail_background">
      <div className="detail_container">
        <div className="detail_container_top">
          <img
            src="images/detail_image1.png"
            alt="left 이미지"
            className="detail_img_logo1"
          />
          <div className="detail_circle">우리나라 관광지</div>
          <img
            src="images/detail_image2.png"
            alt="left 이미지"
            className="detail_img_logo2"
          />
        </div>
        <section className="detail_section">
          <div className="detail_data">
            <div className="data_info">
              <h1 className="detail_title">{dataInfo.title}</h1>
              <img
                src={
                  dataInfo.firstimage
                    ? dataInfo.firstimage
                    : "images/no_img.jpg"
                }
              />
              <div className="data_text">
                <p>{`주소: ${dataInfo.addr1} ${dataInfo.addr2}`}</p>
                <br />
                <h4>상세정보</h4>
                <div
                  style={{ width: "650px", margin: "auto", textAlign: "start" }}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: detailContent
                        .replace(/<br \/>/g, "<br />")
                        .replace(/\n/g, "<br />"),
                    }}
                  ></p>
                  {/* <p>{detailContent.replace('<br />', '')}</p> */}
                </div>
              </div>
              <br />
              <LoadScript
                googleMapsApiKey="AIzaSyAMUowo4dL4hO_oLvHA3CvHyINSAXjUIjI"
                loadingElement={<div style={{ height: "100%" }} />}
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={{
                    lat: parseFloat(dataInfo.mapy),
                    lng: parseFloat(dataInfo.mapx),
                  }}
                  zoom={14}
                >
                  <MarkerF
                    position={{
                      lat: parseFloat(dataInfo.mapy),
                      lng: parseFloat(dataInfo.mapx),
                    }}
                  />
                </GoogleMap>
              </LoadScript>
              <br />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailPage;
