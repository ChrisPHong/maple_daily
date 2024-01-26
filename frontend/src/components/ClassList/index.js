import { useEffect, useState, } from 'react';
import ClassListForm from './ClassListForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServers } from '../../store/server'
import ServerList from './ServerList';


const ClassList = () => {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state?.session?.user?.id);
    const serverLists = useSelector((state) => Object.keys(state?.serversReducer?.servers));
    const servers = useSelector((state) => Object.values(state?.serversReducer?.servers));
    const serverData = useSelector((state) => Object.entries(state?.serversReducer?.servers));
    // const [servers, setServers] = useState([]);
    const [toggleState, setToggleState] = useState(0);
    const toggleTab = (idx) => {
        setToggleState(idx);
    };

    useEffect(() => {
        if (userId) {
            dispatch(fetchServers({ userId }))
        }

    }, [userId, dispatch])



    return (
        <div className='border rounded'>

            <div className='flex justify-center'>
                <div className='flex flex-col'>
                    {serverData.map((server, idx) => {

                        return (
                            <div key={idx} className='flex '>
                                <button
                                    className={
                                        toggleState === idx ? "tabs serveractive-tabs servertab" : "tabs rounded servertab"
                                    }
                                    onClick={() => toggleTab(idx)}
                                >
                                    {server[0]}
                                </button>
                            </div>
                        )

                    })}
                </div>
                <div className=''>

                    {serverData.map((server, idx) => {

                        return (
                            <div key={idx} className='flex '>

                                <div className='flex justify-around'>

                                    <div className={toggleState === idx ? "serverContent  active-contentServer " : "serverContent"}>
                                        <ServerList obj={server[1]} term={'available'} />
                                    </div>
                                    <div className={toggleState === idx ? "serverContent  active-contentServer " : "serverContent"}>
                                        <ServerList obj={server[1]} term={'created'} />
                                    </div>
                                </div>
                            </div>
                        )

                    })}
                </div>

            </div>
        </div>
    )
}



export default ClassList;
