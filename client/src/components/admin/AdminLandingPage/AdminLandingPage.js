import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Icon, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import SearchFeature from "./Sections/SearchFeature";
import { genres, price } from "./Sections/Datas";
import "./css/AdminLandingPage.css";
import HorizontalScroll from "react-scroll-horizontal";

function AdminLandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    genres: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");

  //처음 실행시 getProducts 작동!
  useEffect(() => {
    let body = {
      skip: Skip,
    };
    getProducts(body);
  }, []);

  //새롭게 아이템들을 가져와줌
  const getProducts = (body) => {
    axios.post("/api/product/products_admin", body).then((response) => {
      if (response.data.success) {
        setProducts(response.data.productInfo);
        setPostSize(response.data.postSize);
      } else {
        alert(" 상품을 가져오는데 실패했습니다.");
      }
    });
  };

  function handleMouseover(e) {
    e.currentTarget.play();
  }

  function handleMouseout(e) {
    e.currentTarget.pause();
    e.currentTarget.currentTime = 0;
  }

  const renderCards = Products.map((product, index) => {
    return (
      <div key={index} className="tile">
        {/* <StackGrid> */}
        <div
          id="card-video"
          style={{ backgroundImage: `url(${product.s3thumbnail})` }}
        >
          <a href={`/product_admin/${product._id}`}>
            <video
              src={`${product.filePath}`}
              onMouseOver={handleMouseover}
              onMouseOut={handleMouseout}
              muted
            />
          </a>
        </div>
        <div id="card-avatar">
          <Meta
            avatar={
              <a href={`/videos/${product.writer._id}`}>
                <Avatar src={product.writer.image} />
              </a>
            }
            title={product.title}
          />
          <a href={`/videos/${product.writer._id}`}>
            <span>{product.writer.name}</span>
          </a>
          <span id="card-price">{`${product.price.toLocaleString(
            "ko-KR"
          )} 원`}</span>
          <br />
        </div>
        {/* </StackGrid> */}
      </div>
    );
  });

  //장르 변화 줄때도 getProducts 작동!
  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      filters: filters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  //search할 때 getProducts 작동!
  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0, //DB에서 처음 상품부터 가져와야 함
      filters: Filters, //현재 genres와 price에 적용된 필터 그대로 적용 + 검색어
      searchTerm: newSearchTerm,
    };

    setSkip(0);

    //자식 컴포넌트인 SearchFeature에서 전달해준 값으로 업데이트됨
    setSearchTerm(newSearchTerm);
    getProducts(body); //백엔드에 보내서 처리!
  };

  return (
    <div
      id="filters"
      style={{ width: "100%", paddingTop: "1em", borderTop: "#1C1C1C" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "1em",
          margin: "1em auto",
          backgroundColor: "#1C1C1C",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
        <br />
      </div>

      {/* Cards */}
      <div id="scroll-horizontal" style={{ height: `43em` }}>
        {/* <StackGrid columnWidth="20%" columnHeight> */}
        <HorizontalScroll>{renderCards}</HorizontalScroll>
        {/* </StackGrid> */}
      </div>
    </div>
  );
}

export default AdminLandingPage;