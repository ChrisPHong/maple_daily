import { useState, useEffect } from "react";
import { csrfFetch } from '../../store/csrf';
import { useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom/cjs/react-router-dom";



const ResetPassword = () => {
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [reveal, setReveal] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);
    const { token } = useParams();

    useEffect(() => {
        const error = [];
        if (password !== confirmPassword) error.push('Passwords do not match');

        setErrors(errors);
    }, [password, confirmPassword]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrors('Passwords Do Not Match');
            setReveal(true);
            return;
        };

        try {

            const res = await csrfFetch(`/api/users/resetPassword/${token}`, {
                method: "POST",
                header: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: password })
            })


            const response = await res.json()
            setReveal(true);
            setMessage(response.message)

            await history.push('/login')
        } catch (e) {
            const response = await e.json()

            setReveal(true);
            setMessage(response.message);

        }

        return;

    }
    return (
        <div className="flex flex-col items-center justify-center">
            <form className="flex flex-col items-center justify-center my-40 border-black border rounded p-1 font-sans max-w-fit">
                <h3 className="text-l font-bold mb-2">Change Password</h3>
                <div className="p-2 text-red-400 max-w-md ">
                    Change Password
                </div>
                {reveal ? <div>
                    {message}
                </div> : ''}
                <input
                    placeholder="Password"
                    type='password'
                    className="border-black border rounded p-1 mb-2 font-sans"
                    onChange={(e) => {
                        e.preventDefault();
                        setPassword(e.target.value)
                    }}></input>
                <input
                    placeholder="Confirmed Password"
                    type='password'
                    className="border-black border rounded p-1 mb-2 font-sans"
                    onChange={(e) => {
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

        </div >
    )
}


export default ResetPassword;
