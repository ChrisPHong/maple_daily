import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store/news";

const MapleNews = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNews());
  }, []);
  return <div>Maple News</div>;
};

export default MapleNews;
