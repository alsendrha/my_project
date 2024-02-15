import axios from "../api/api";
import "./Row.css";
import DetailModal from "./Modal";
import { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import styled from "styled-components";

const Row = ({ city }) => {
  const [dataInfo, setDataInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleClick = (data) => {
    setModalOpen(true);
    setSelected(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("", {
        params: {
          numOfRows: 20,
          keyword: city,
        },
      });
      setDataInfo(response.data.response.body.items.item);
      console.log(response);
    } catch (error) {
      console.log("error입니다,", error);
    }
  };

  return (
    <div>
      <h3 className="row_title">{city}</h3>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        <div className="slider">
          <div id={city} className="row_posters">
            {dataInfo.map((item) => (
              <SwiperSlide key={item.contentid}>
                <div style={{ display: "inline-block", marginTop: "20px" }}>
                  <img
                    className="row_poster"
                    src={
                      item.firstimage ? item.firstimage : "images/no_img.jpg"
                    }
                    alt="관광지 이미지"
                    onClick={() => handleClick(item)}
                  />
                  <div>
                    <p className="row_main_title">{item.title}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </div>
      </Swiper>
      {modalOpen ? (
        <DetailModal {...selected} setModalOpen={setModalOpen} />
      ) : null}
    </div>
  );
};

export default Row;
