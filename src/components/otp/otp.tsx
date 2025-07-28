import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { errorResponse, OtpInputRefs, OtpKeyDownHandler } from "../../utilities/typedec";
import { useHttpFetcher } from "../../hooks/customhooks";
import './otp.css'
import { GlobalUseContext } from "../../context/context";
import { Button } from "../../Button/button";
import { Div } from "../../divComponent/div";
import OtpImage from "../../images/otpimage.png"

export function OtpComponent () {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputs = useRef<OtpInputRefs>([]);
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showRedirectCard, setShowRedirectCard] = useState(false);
    const navigate = useNavigate();
    const { dispatch } = useContext(GlobalUseContext);
    const { fetchIt } = useHttpFetcher();


useEffect(() => {
  const savedEmail = localStorage.getItem("signupEmail");
  const savedUserId = localStorage.getItem("signupUserId");

  if (savedEmail) {
    setEmail(savedEmail); // setEmail should be part of your component state
  }

  if (savedUserId) {
    setUserId(savedUserId); // optional, if you need it
  }
}, []);




    // Handle OTP input change
    const handleChange = (value: string, idx: number) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[idx] = value.slice(-1);
        setOtp(newOtp);
        if (value && idx < 5) {
            inputs.current[idx + 1]?.focus();
        }
    };

    // Handle OTP paste
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData("text").replace(/\D/g, "");
        if (paste.length === 0) return;
        const pasteArr = paste.slice(0, 6).split("");
        const newOtp = [...otp];
        pasteArr.forEach((digit, idx) => {
            newOtp[idx] = digit;
            if (inputs.current[idx]) {
                inputs.current[idx]!.value = digit;
            }
        });
        setOtp(newOtp);
        const lastIdx = pasteArr.length - 1;
        if (inputs.current[lastIdx]) {
            inputs.current[lastIdx]!.focus();
        }
        e.preventDefault();
    };

    // Handle keyboard navigation
    const handleKeyDown: OtpKeyDownHandler = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            inputs.current[idx - 1]?.focus();
        }
    };

const handleVerifyOtp = async () => {
  setLoading(true);
  setError("");

  const otpCode = otp.join("");
  if (otpCode.length !== 6) {
    setError("Please enter the 6-digit OTP code.");
    setLoading(false);
    return;
  }

  try {
    const res = await fetchIt({
      apiEndPoint: "otp/verify",
      httpMethod: "post",
      reqData: { otp: otpCode, email },
      isSuccessNotification: {
        notificationText: "", // set dynamically below
        notificationState: false,
      },
    });

    setLoading(false);

    dispatch({
      type: "SET_TOAST",
      payload: {
        notificationState: true,
        notificationText: res?.message || "Account verified!",
        icon: "ri-check-fill",
        backgroundColor: "green",
        iconClassName: "text-white",
      },
    });

    localStorage.removeItem("signupEmail");
localStorage.removeItem("signupUserId");

    setTimeout(() => {
      setShowRedirectCard(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }, 3500);
  } catch (error) {
return
  }
};


    // Resend OTP
    const handleResendOtp = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetchIt({
                apiEndPoint: "otp/resend",
                httpMethod: "post",
                reqData: { email },
                isSuccessNotification: {
                    notificationText: "",
                    notificationState: false,
                }
            });
            dispatch({
                type: "SET_TOAST",
                payload: {
                    notificationState: true,
                    notificationText: res?.message || "OTP code resent!",
                    icon: "ri-check-fill",
                    backgroundColor: "green",
                    iconClassName: "text-white",
                },
            });
        } catch (error: any) {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "OTP Verification failed. Please try again.";

  dispatch({
    type: "SET_TOAST",
    payload: {
      notificationState: true,
      notificationText: message,
      icon: "ri-error-warning-fill",
      backgroundColor: "red",
    },
  });
}
    };


    
    return (
        <div className="h-screen w-full flex items-center imgPhoneResDivMain">
            <div className="w-full h-[20%] hidden imagePhoneRes">
                <img src={OtpImage} className="imgPhoneRes"/>
            </div>
            <div className='w-full md:w-8/12 h-1/2 p-4 md:p-20 flex items-center justify-center absolute md:static top-0 left-0 mainOtpRes'>
                <div className='w-full h-4/5 rounded-xl p-6 flex flex-col justify-center'>
                    <h1 className='text-4xl font-root font-bold text-center mb-4'>Authentication</h1>
                    <p className='text-center text-xl'>Please enter the OTP sent to your email</p>
<div className="w-full flex flex-row items-center justify-center gap-3 mt-6 inputOtpRes">
  {otp.map((digit, idx) => (
      <input
        key={idx}
        ref={el => { inputs.current[idx] = el; }}
        type="text"
        inputMode="numeric"
        value={digit}
        onChange={e => handleChange(e.target.value, idx)}
        onPaste={handlePaste}
        onKeyDown={e => handleKeyDown(e, idx)}
        maxLength={1}
        className="w-10 sm:w-12 text-center border-b-2 border-black outline-none text-lg sm:text-xl bg-transparent"
      />
    ))}
</div>


                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                    <div className="w-full flex justify-center h-10 mt-10">
                        <Button
                            type="button"
                            btnText="Verify"
                            className="resBtn w-20 h-full bg-gray-900 text-white hover:bg-blue-900 transition-colors duration-300"
                            onClick={handleVerifyOtp}
                        >Verify</Button>
                    </div>
                    <p className="text-center text-sm mt-4 resenRes">
                        Didn't receive the code?{" "}
                        <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={handleResendOtp}
                        >
                            Resend
                        </span>
                    </p>
                    {/* Redirect Card */}
                    {showRedirectCard && (
                        <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg px-8 py-6 flex flex-col items-center animate-fadeIn">
                            <span className="text-green-600 text-3xl mb-2">
                                <i className="ri-check-fill"></i>
                            </span>
                            <p className="text-lg font-semibold mb-1">Account Verified</p>
                            <p className="text-gray-600">Redirecting to login...</p>
                        </div>
                    )}
                </div>
            </div>
            <Div className="w-[1300px] h-full flex items-center">
                <img src="https://media.istockphoto.com/id/1369381318/vector/otp-one-time-password-for-secure-transaction-on-digital-payment-transaction.jpg?s=612x612&w=0&k=20&c=6zClJ7mOzkKikt5r0PqiU6HLixos9yakSUyi7vKD7lg=" className="w-[70%] h-[50%] otpImgRes" />
            </Div>
        </div>
    );
}