import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteList from '../DeleteList'
import { useHistory } from "react-router-dom";
import { getUserLists } from "../../../store/list";

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
    <>
      <button onClick={()=>{history.push('/createlist')}}>Create a list</button>
    {
      lists.map(list =>{
      return (
        <div key={list.id}>
          <DeleteList id={list.id}/>
          <img src={list.apiContent}/>
          <div>
            {list.characterClass}
          </div>
          <div>
            {list.character}
          </div>
          <div>
            {list.level}
          </div>
          <div>
            {list.server}
          </div>
        {list.name}
        </div>
      )
     })
    }
    </>
  );
};

export default Lists;
