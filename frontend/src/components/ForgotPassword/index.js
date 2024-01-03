import { useState, useEffect } from "react";
import { csrfFetch } from '../../store/csrf';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [reveal, setReveal] = useState(false);
    const [message, setMessage] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await csrfFetch(`/api/users/fp/`, {
            method: "POST",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email })
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
                <h3 className="text-l font-bold mb-2">Forgot Password</h3>
                <div className="p-2 text-red-400">
                    We will send you an email about how to reset your password.
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
                <button
                    className="submit-btn"
                    // disabled={email === '' ? true : false}
                    onClick={(e) => {

                        onSubmit(e);
                    }
                    }>Reset Password</button>
            </form>

        </div>
    )
}

export default ForgotPassword;
