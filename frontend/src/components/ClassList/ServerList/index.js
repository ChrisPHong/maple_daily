import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOneList } from "../../../store/list";
import './ServerList.css'


const ServerList = (props) => {

    const { obj, term } = props;
    const dispatch = useDispatch();
    const userId = useSelector((state) => state?.session?.user?.id);

    const history = useHistory();
    return (
        <div className="">
            {obj.created.length === 0 && term === 'created' ?
                <div>
                    Nothing here
                </div>
                :
                <div>

                    {term === 'created' ?

                        <div className="">
                            <div>
                                {obj['created'].map((list, idx) => {

                                    return (
                                        <div
                                            key={idx}
                                            onClick={async () => {
                                                const payload = { listId: list.id, userId };
                                                await history.push(`/lists/${list.id}`);
                                                await dispatch(getOneList(payload));
                                            }}
                                            className="listName-button-container"
                                        >
                                            <div
                                                className="characterImageList-Container transform -scale-x-100"
                                                style={{
                                                    backgroundImage: `url(${list.apiContent})`,
                                                }}
                                            ></div>
                                            <div className="list-Button-div mr-3">
                                                <h2 className="font-bold font-sans">
                                                    {list.character}
                                                </h2>
                                                <span className="text-xxs mt-2 font-bold">
                                                    {list.characterClass}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        :
                        <div className="gridOf3">

                            {obj['available'].map((char) => {
                                return (
                                    <div className="classTabs">
                                        {char}
                                    </div>
                                )
                            })}
                        </div>}
                </div>
            }
        </div>
    )
}


export default ServerList;
