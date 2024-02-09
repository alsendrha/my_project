import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";
import { apiKey, baseUrl, searchNumOfRows } from "../../api/api";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("keyword");
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchTour(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchTour = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}searchKeyword1?serviceKey=${apiKey}&numOfRows=${searchNumOfRows}&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&contentTypeId=12&keyword=${debouncedSearchTerm}`
      );
      setSearchResults(response.data.response.body.items.item);
    } catch (error) {
      console.log("에러입니다.", error);
    }
  };
  if (searchResults === null) return null;

  if (searchResults && searchResults.length > 0) {
    return (
      <section className="search_container">
        {searchResults.map((item) => (
          <div className="tour" key={item.contentid}>
            <div
              className="tour_column_img"
              onClick={() =>
                navigate(`/${item.title}`, {
                  state: {
                    title: item.title,
                    firstimage: item.firstimage,
                    contentid: item.contentid,
                    addr1: item.addr1,
                    addr2: item.addr2,
                    tel: item.tel,
                    mapx: item.mapx,
                    mapy: item.mapy,
                  },
                })
              }
            >
              <img
                className="tour_img"
                src={item.firstimage ? item.firstimage : "images/no_img.jpg"}
                alt="관광지 이미지"
              />
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </section>
    );
  } else {
    return (
      <section className="no_results">
        <div className="no_results_text">
          <p>찾고자하는 검색어 {debouncedSearchTerm} 관광지가 없습니다.</p>
        </div>
      </section>
    );
  }
};

export default SearchPage;
