import { useState, useEffect } from "react";
import { csrfFetch } from '../../store/csrf';
import { useHistory } from 'react-router-dom';



const ResetPassword = () => {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [reveal, setReveal] = useState(false);
    const [message, setMessage] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {

    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return;

        const res = await csrfFetch(`/api/users/resetPassword/`, {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        })

        if (res.ok) {

            const response = await res.json()
            setMessage(response.message)
            setReveal(true);

        } else {
            const response = await res.json()
            setMessage(response.message)

        }

        return;

    }
    return (
        <div className="flex flex-col items-center justify-center">
            <form className="flex flex-col items-center justify-center my-40 border-black border rounded p-1 font-sans max-w-fit">
                <h3 className="text-l font-bold mb-2">Change Password</h3>
                <div className="p-2 text-red-400 max-w-md ">
                    Reset Your Password
                </div>
                {reveal ?
                    <div>
                        {message}
                    </div>
                    : ''}
                <input placeholder="Email" className="border-black border rounded p-1 mb-2 font-sans" onChange={(e) => {
                    e.preventDefault();

                    setEmail(e.target.value)
                }}></input>
                <input placeholder="Password" className="border-black border rounded p-1 mb-2 font-sans" onChange={(e) => {
                    e.preventDefault();

                    setPassword(e.target.value)
                }}></input>
                <input placeholder="Confirmed Password" className="border-black border rounded p-1 mb-2 font-sans" onChange={(e) => {
                    e.preventDefault();

                    setConfirmPassword(e.target.value)
                }}></input>
                <button
                    className="submit-btn"
                    onClick={(e) => {
                        onSubmit(e);
                    }
                    }>Reset Password</button>
            </form>

        </div>
    )
}


export default ResetPassword;
