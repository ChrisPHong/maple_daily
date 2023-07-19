import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store/news";

const MapleNews = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state?.newsReducer?.news);
  console.log(news, "<<<<");
  useEffect(() => {
    dispatch(fetchNews());
  }, []);
  return (
    <div>
      <h1>Maple News</h1>
      {news?.map((item, idx) => {
        return (
          <div
            key={`item.link ${idx}`}
            className="flex flex-row justify-content items-align"
          >
            <img src={item.photoLink} />
            <div>
              <h1>
                <a href={item.link}>{item?.header}</a>
              </h1>
              <p>{item.title}</p>
              <p>
                <a href={item.link}>Read More</a>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapleNews;
