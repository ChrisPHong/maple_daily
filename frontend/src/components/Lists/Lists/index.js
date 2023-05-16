import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserLists } from "../../../store/list";

const Lists = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if(userId){
      dispatch(getUserLists({userId}));
      console.log('were in the dispatch!');
    }

  }, [dispatch, userId]);

  return (
    <>
      These are all the lists
      <div>List One!</div>
    </>
  );
};

export default Lists;
