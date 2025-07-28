import { useContext, useState } from "react";
import { Div } from "../../divComponent/div";
import { Input } from "../../Input/Input.component";
import "./signUp.css";
import ImageSignUp from "../../images/Image.png";
import { Button } from "../../Button/button";
import { errorResponse, userAttributes } from "../../utilities/typedec";
import { Icon } from "../../Icon.component/Icon";
import { RegisterData } from "../../data";
import { useNavigate } from "react-router-dom";
import { GlobalUseContext } from "../../context/context";
import { useHttpFetcher } from "../../hooks/customhooks";

export function SignUp() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { fetchIt } = useHttpFetcher();
  const { state, dispatch } = useContext(GlobalUseContext);

  const [registerUser, setRegisterUser] = useState<userAttributes>({
    password: "",
    email: "",
    userName: "",
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleOnchange = (text: string, payload: keyof userAttributes) => {
    setRegisterUser((prev) => ({
      ...prev,
      [payload]: text,
    }));
  };

  const isEmailValid =
    registerUser.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerUser.email);
  const isPasswordValid =
    registerUser.password.length >= 6 &&
    /[A-Z]/.test(registerUser.password) &&
    /[a-z]/.test(registerUser.password) &&
    /[^A-Za-z0-9]/.test(registerUser.password);
  const isUserNameValid = registerUser.userName;
  const isFormValid = isEmailValid && isPasswordValid && isUserNameValid;

  const handleRegister = async () => {
    const regObj = {
      email: registerUser.email,
      password: registerUser.password,
      userName: registerUser.userName,
    };

    if (!isFormValid) {
      dispatch({
        type: "SET_TOAST",
        payload: {
          notificationState: true,
          notificationText: "All fields are required!",
          icon: "ri-error-warning-fill",
          backgroundColor: "red",
        },
      });
      return;
    }

try {
  const res = await fetchIt({
    apiEndPoint: `register/create`,
    httpMethod: "post",
    reqData: regObj,
    isSuccessNotification: {
      notificationText: "",
      notificationState: false,
    },
  }) as errorResponse;

  localStorage.setItem("signupEmail", registerUser.email);
  localStorage.setItem("signupUserId", String(res?.payload));

  setRegisterUser({ password: "", email: "", userName: "" });

  dispatch({
    type: "SET_TOAST",
    payload: {
      notificationState: true,
      notificationText: "Account created successfully..",
      icon: "ri-check-fill",
      backgroundColor: "green",
      iconClassName: "text-white",
    },
  });

  navigate("/otp/veri", {
    state: {
      email: registerUser.email,
      userId: res?.payload,
    },
  });
} catch (error: any) {

  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Registration failed. Please try again.";

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

}


  return (
    <Div className="w-full h-full overflow-hidden flex">
      <Div className="flex justify-center items-center w-[65%] containerOr">
        <Div className="bg-white w-[85%] h-[80%] signUpDivRes overflow-y-auto hideScrollbar inner-shadow">
          <h1 className="text-4xl font-medium font3 mb-2">Welcome to Mindmile</h1>
          <p className="text-base font3">Start building better habits today.</p>
          <p className="text-md font3 tracking-wider">
            Already have an account? <a className="cursor-pointer underline hover:no-underline">Log In</a>
          </p>

          <div className="w-[80%] h-fit flex flex-col mt-4 signUpInputResSec">
            {RegisterData?.map((item, index) => (
              <div key={index} className="relative w-full">
                <Input
                  displayText={item.field}
                  displayTextClassName="font12 text-gray-600 mt-7"
                  type={
                    item?.name === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  placeHolder={item.field}
                  payload={item.name}
                  className="w-full h-[50px] rounded-2xl signUpInputRes text-gray-700 font-3"
                  onChange={handleOnchange}
                  value={registerUser[item.name] as keyof userAttributes}
                />

                {item?.name === "password" && (
                  <>
                    <span
                      className="absolute right-3 top-[92px] transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <Icon
                          icon="ri-eye-fill"
                          className="text-xl text-gray-500 cursor-pointer"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95m1.414-1.414A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3l18 18"
                          />
                        </svg>
                      )}
                    </span>

                    <div className="w-full h-[50%] flex signUpInputResSecInner">
                      <div
                        className={`font12 signUpInputResSecInnerX flex h-10 items-center w-[33%] ${
                          registerUser.password.length >= 6 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <span className="text-2xl -mt-1 mr-2">•</span> At least 6 characters
                      </div>
                      <div
                        className={`font12 signUpInputResSecInnerX flex h-10 items-center w-[33%] ${
                          /[A-Z]/.test(registerUser.password) ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <span className="text-2xl -mt-1 mr-2">•</span> An uppercase letter
                      </div>
                      <div
                        className={`font12 signUpInputResSecInnerX flex h-10 items-center w-[33%] ${
                          /[a-z]/.test(registerUser.password) ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <span className="text-2xl -mt-1 mr-2">•</span> A lowercase letter
                      </div>
                      <div
                        className={`font12 signUpInputResSecInnerX flex h-10 items-center w-[33%] ${
                          /[^A-Za-z0-9]/.test(registerUser.password) ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <span className="text-2xl -mt-1 mr-2">•</span> A special character
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <Div className="w-[70%] h-10 mt-7 flex items-center containerOr">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 text-blue-600 accent-black mt-[3px]" />
              <span className="text-md font3 text-gray-800 translate-y-[2px]">
                I want to receive emails about the product, feature updates, events, and marketing promotions
              </span>
            </label>
          </Div>

          <Div className="w-[70%] h-10 mt-5 flex items-center containerOr byRes">
            <p className="text-md font3 text-gray-800">
              By creating an account, you agree to the <a className="underline cursor-pointer">Terms of Use</a> and <a className="underline cursor-pointer">Privacy Policy</a>.
            </p>
          </Div>

          <Div className="w-[35%] h-32 flex justify-center flex-col space-y-3 containerOr crBtnRes">
            <Button
              type="button"
              btnText="Create an Account"
              disabled={!isFormValid}
              className="w-[200px] h-[44px] rounded-full bg-blue-600 hover:bg-blue-700 text-lg font-medium text-white"
              onClick={handleRegister}
            >
              Create an Account
            </Button>
            <p className="font3">
              Already have an account? <a className="underline cursor-pointer">Log in</a>
            </p>
          </Div>
        </Div>
      </Div>
      <img src={ImageSignUp} className="w-[35%] signImgRes" />
    </Div>
  );
}
