import axios from "../../api/detailApi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./DetailPage.css";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const DetailPage = () => {
  const location = useLocation();
  const dataInfo = { ...location.state };
  const [detailContent, setDetailContent] = useState("");
  const containerStyle = {
    width: "700px",
    height: "400px",
    margin: "auto",
    borderRadius: "10px",
  };

  useEffect(() => {
    async function fetchData() {
      const response2 = await axios.get("", {
        params: {
          contentId: dataInfo.contentid,
        },
      });
      console.log(response2.data.response.body.items.item[0]);
      setDetailContent(response2.data.response.body.items.item[0]);
    }
    fetchData();
  }, []);

  if (dataInfo === null || detailContent === null) return null;
  console.log(detailContent.homepage);
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
                <div>
                  <p>
                    {`페이지 바로 가기: `}
                    {detailContent.homepage ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: detailContent.homepage,
                        }}
                      ></span>
                    ) : (
                      <span>정보 없음</span>
                    )}
                  </p>
                </div>
                <br />
                <h4>상세정보</h4>
                <div
                  style={{ width: "650px", margin: "auto", textAlign: "start" }}
                >
                  {typeof detailContent === "object" &&
                    detailContent.overview && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: detailContent.overview
                            .replace(/<br \/>/g, "<br />")
                            .replace(/\n/g, "<br />"),
                        }}
                      ></p>
                    )}
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
