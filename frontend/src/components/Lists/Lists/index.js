import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserLists } from "../../../store/list";

const Lists = () => {
  const userId = useSelector((state) => state?.session?.user?.username);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserLists());

  }, [dispatch]);

  return (
    <>
      These are all the lists
      <div>List One!</div>
    </>
  );
};

export default Lists;
