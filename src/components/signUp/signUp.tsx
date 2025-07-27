import { useState } from "react";
import { Div } from "../../divComponent/div";
import { Input } from "../../Input/Input.component";
import { Eye, EyeOff } from "lucide-react"; 
import "./signUp.css"


export function SignUp () {

const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => setShowPassword((prev) => !prev);


    const rules = {
  minLength: password.length >= 6,
  upper: /[A-Z]/.test(password),
  lower: /[a-z]/.test(password),
  number: /\d/.test(password),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
};



    return (
<Div className=" w-full h-full overflow-hidden flex ">
    <Div className=" flex justify-center items-center w-[65%] containerOr">
  <Div className="bg-white w-[85%] h-[80%] rounded-xl signUpDivRes">
    <h1 className="text-4xl font-medium font3 mb-2">Welcome to Mindmile</h1>
    <p className="text-base font3">Start building better habits today.</p>
    <p className="text-md font3 tracking-wider">Already have an account? <a className="cursor-pointer underline hover:no-underline">Log In</a></p>

    <Input
    type="text"
    className="w-[80%] h-[50px] rounded-2xl signUpInputRes"
    displayText="Email"
    displayTextClassName="font12 text-gray-600 mt-7"
     />

         <Input
    type="text"
    className="w-[80%] h-[50px] rounded-2xl signUpInputRes"
    displayText="Username"
    displayTextClassName="font12 text-gray-600 mt-7"
     />

<div className="relative w-[80%] mt-4 signUpInputRes">
  <Input
    type={showPassword ? "text" : "password"}
    displayText="Password"
    className="w-[100%] h-[50px] rounded-2xl"
    displayTextClassName="font12 text-gray-600 mt-4"
  />
  <div
    onClick={togglePasswordVisibility}
    className="absolute items-center flex right-4 top-[40%] -translate-y-1/2 cursor-pointer text-gray-500"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    {showPassword? "Hide" : "show"}
  </div>
</div>

<div className="mt-4 w-[80%] h-20 flex flex-col signUpInputResSec">
    <div className="w-full h[50%] flex signUpInputResSecInner">
        <div
  className={`font12 signUpInputResSecInnerX transition-colors duration-300 flex h-10 items-center w-[33%] ${
    rules.minLength ? "text-green-600" : "text-gray-400"
  }`}
>
  <a className="text-2xl -mt-1 mr-2">•</a> Use 8 or more characters
</div>

<div
  className={`font12 signUpInputResSecInnerX transition-colors duration-300 flex h-10 items-center w-[33%] ${
    rules.minLength ? "text-green-600" : "text-gray-400"
  }`}
>
  <a className="text-2xl -mt-1 mr-2">•</a>One Uppercase character
</div>

<div
  className={`font12 signUpInputResSecInnerXr transition-colors duration-300 flex h-10 items-center w-[33%] ${
    rules.minLength ? "text-green-600" : "text-gray-400"
  }`}
>
  <a className="text-2xl -mt-1 mr-2">•</a>One lowercase character
</div>
    </div>


    <div className="w-full h-[50%] flex signUpInputResSecInner">
        <div
  className={`font12 signUpInputResSecInnerX transition-colors duration-300 flex h-10 items-center w-[33%] ${
    rules.minLength ? "text-green-600" : "text-gray-400"
  }`}
>
  <a className="text-2xl -mt-1 mr-2">•</a> One special character
</div>

<div
  className={`font12 signUpInputResSecInnerX transition-colors duration-300 flex h-10 items-center w-[33%] ${
    rules.minLength ? "text-green-600" : "text-gray-400"
  }`}
>
  <a className="text-2xl -mt-1 mr-2">•</a>One number
</div>
</div>
</div>




  </Div>
</Div>
<img src="src\images\Image.png" className="w-[35%] signImgRes" />


</Div>



    )
}