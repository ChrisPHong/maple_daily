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
    <div className="max-w-5xl flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold border-gray-50">Maple News</h1>
      {news?.map((item, idx) => {
        return (
          <div
            key={`item.link ${idx}`}
            className="flex flex-row justify-content items-align border-black border-2 m-4 max-w-m min-w-l"
          >
            <img className="w-100px min-w-{100px}" src={item.photoLink} />
            <div className="flex flex-col justify-between m-4">
              <div className="">
                <h1 className="font-bold text-l hover:text-red-600">
                  <a href={item.link}>{item?.header}</a>
                </h1>
                <div className="mt-5">
                  <p className="m-0">{item.title}</p>
                </div>
              </div>
              <div className="flex justify-between mt-5">
                <p>{item.timestamp}</p>
                <p className="hover:text-red-600">
                  <a href={item.link}>READ MORE</a>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapleNews;
