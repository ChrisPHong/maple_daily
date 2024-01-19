import { useState } from "react";
import { useDispatch } from "react-redux";


const ClassListForm = () => {

    const [selected, setSelected] = useState('Reboot Kronos');
    const dispatch = useDispatch();

    const handleOnChange = async (e) => {
        await setSelected(e.target.value)
        return;
    }

    const onSubmit = () => {
        const payload = { selected }


        dispatch()
    }
    return (
        <form className="flex flex-col items-center rounded border border-black">
            <div className="flex flex-col items-start p-4">
                Want to see which classes you're missing? Choose the server you're playing in!
                <select
                    value={selected}
                    onChange={handleOnChange}
                    className="p-2 border border-black rounded m-2 text-red-700"
                >
                    <option value='Reboot Kronos'>Reboot Kronos</option>
                    <option value='Reboot Hyperion'>Reboot Hyperion</option>
                    <option value='Reboot Solis'>Reboot Solis</option>
                    <option value='Aurora'>Aurora</option>
                    <option value='Bera'>Bera</option>
                    <option value='Elysium'>Elysium</option>
                    <option value='Luna'>Luna</option>
                    <option value='Scania'>Scania</option>
                </select>
            </div>
            <button className="submit-btn" onClick={() => { onSubmit() }}>Submit</button>
        </form>
    )
}



export default ClassListForm;
