import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/api";
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const [page, setPage] = useState(1);
  const divElement = useRef(null);
  let query = useQuery();
  const searchTerm = query.get("keyword");
  const [hashMore, setHashMore] = useState(true);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const interception = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      fetchTour();
    }
  };
  useEffect(() => {
    const interceptor = new IntersectionObserver(interception);
    if (interception && searchResults.length > 0) {
      interceptor.observe(divElement.current);
    }
    return () => {
      interceptor.disconnect();
    };
  }, [page]);

  useEffect(() => {
    setPage(1);
    setSearchResults([]);
    setHashMore(true);
    fetchTour(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchTour = async () => {
    try {
      const response = await axios.get("", {
        params: {
          numOfRows: 60,
          pageNo: page,
          keyword: debouncedSearchTerm,
        },
      });
      if (
        !response.data.response.body.items.item ||
        response.data.response.body.items.item.length === 0
      ) {
        setHashMore(false);
      } else {
        setSearchResults((prev) => [
          ...prev,
          ...response.data.response.body.items.item,
        ]);
        console.log(response.data.response.body.items.item);
        setPage((prev) => prev + 1);
      }
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
        {!hashMore && <div>더이상 검색결과가 없습니다.</div>}
        <div ref={divElement} style={{ height: "10px" }}></div>
      </section>
    );
  } else {
    return (
      <section className="no_results">
        <div className="no_results_text">
          <p>찾고자하는 검색어 {debouncedSearchTerm} 관광지가 없습니다.</p>
          <div ref={divElement} style={{ height: "10px" }}></div>
        </div>
      </section>
    );
  }
};

export default SearchPage;
