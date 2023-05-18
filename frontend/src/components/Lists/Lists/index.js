import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserLists } from "../../../store/list";
import OneList from '../OneList'
import './Lists.css'


const Lists = () => {
  const userId = useSelector((state) => state?.session?.user?.id);
  const lists = useSelector((state) => Object.values(state?.listReducer?.lists));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if(userId){
      dispatch(getUserLists({userId}));
    }

  }, [dispatch, userId]);

  return (
    <div className="All-lists-Container">
      <button onClick={()=>{history.push('/createlist')}}>Create a list</button>
    {
      lists.map(list =>{
      return (
        <div key={list.id}>

        <OneList props={list}/>

        </div>
      )
     })
    }
    </div>
  );
};

export default Lists;
