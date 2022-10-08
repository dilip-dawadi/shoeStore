// react
import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserVerification = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = React.useState('');
    const verify = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}user/${params.userId}/verify/${params.verifyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(
                    `User verification failed. Note: You can only verify your account once.`
                );
            }
        }).then(response => {
            setMessage(response.verifyMessage);
            if (response.token && response.data) {
                localStorage.setItem("token", response?.token);
                localStorage.setItem("userData", JSON.stringify(response?.data));
            }
            alert(response.verifyMessage);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }).catch(error => {
            setMessage(error.message);
            alert(error.message);
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
        );
    };

    return (
        // user verification page
        <div className="flex flex-col items-center justify-center h-[30vw]">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-800">User Verification</h1>
                <p className="text-sm text-gray-500">Click on the button to verify your account</p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <button className="
                    w-40
                    h-10
                    mt-4
                    text-white
                    bg-rose-500
                    rounded-md
                    hover:bg-rose-600
                    focus:outline-none
                    focus:ring-2
                    focus:ring-rose-600
                    focus:ring-opacity-50
                    transition
                    duration-300
                " onClick={verify}>Verify</button>
                <p className="mt-2 text-sm text-gray-500">{
                    message.includes('//') ?
                        message.split('//')[1]
                        : message
                }</p>
            </div>
        </div>
    );
}
export default UserVerification;