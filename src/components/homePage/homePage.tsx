import React, { useEffect, useState } from "react";
import { Div } from "../../divComponent/div";
import backgroundImg from "../../images/backgroundimg (2).png";
import { Button } from "../../Button/button";
import { TypedText } from "../animations/animatedText";
import { TiltImage } from "../animations/titlimageHover";
import './homePage.css'

export function HomeComponent() {
  const [showImage, setShowImage] = useState(true);
  const [showNextDiv, setShowNextDiv] = useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)

    const toggleDropdown = (dropdown: string) => {
        setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
    }

  return (
    <Div className="mainDiv overflow-hidden w-full h-full bg-white container overflow-y-auto">
      <Div className="w-full h-20 flex items-center px-10">
        <Div className="w-1/2 h-full flex items-center">
        <Div className="w-12 h-12 ring-2 ring-black/60 rounded-lg"></Div>
        <p className="font3 ml-4 text-xl font-medium">Mindmile</p>
        </Div>

        <Div className="w-1/2 h-full flex items-center relative">
        <Div className="w-fit h-1/2 absolute right-0 flex items-center">
                    <div className="relative mr-5">
                        <div 
                            className="flex items-center cursor-pointer"
                            onClick={() => toggleDropdown('About')}
                        >
                            <h1 
                                className={`text-base font-medium hover:text-blue-800 ${openDropdown === 'About' ? 'text-blue-800' : 'text-gray-800'}`}
                            >
                                About
                            </h1>
                            <svg 
                                className={`w-4 h-4 ml-1 transform transition-transform ${openDropdown === 'About' ? 'rotate-180' : 'rotate-0'}`} 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                         </div>
                        <div
                            className={`absolute top-10 -left-20 w-72 bg-white border rounded shadow-lg transition-all duration-300 ease-in-out ${openDropdown === 'About' ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'} overflow-hidden`}
                        >
                            <ul>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Blog</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Guides</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Webinars</li>
                            </ul>
                        </div>
                </div>        
                <p className="mr-7 font-semibold text-base cursor-pointer hover:text-gray-700 duration-200">Login</p>
          <Button
          type="button"
          btnText="Sign Up"
          className="w-22 font-medium rounded-lg text-white transition-colors duration-200 hover:text-black h-full bg-blue-800 hover:bg-white border hover:border-black/90 backdrop-blur-sm"
          >Sign Up</Button>
        </Div>
        </Div>
      </Div>
<hr />
      <Div className="w-full h-h650 container bg-white flex items-center mobileResTopLan">
        <Div className="w-w130 h-h450 flex flex-col mobileResTopLanInner">
          <TypedText
            strings={["Plan Better.", "Habit Smarter."]}
            className="bg-white mt-10 text-6xl animateTxtRes"
          />
          <Div className="w-full h-28 mt-7 trackResDiv">
            <p className="text-xl tracking-tight">Track your Progress and achieve your goals with personalized daily habit plans and an AI-Powered coach</p>
          </Div>
          <Button 
          type="button"
          btnText="Start Free Trial"
          className="w-44 h-12 bg-blue-800 hover:bg-blue-700 text-white font-medium font3 startFreeDashRes"
          >start</Button>
        </Div>

            <Div className="flex justify-center mt-10 animateImgDiv containerX">
      <TiltImage
        src="https://i0.wp.com/mindeasy.com/wp-content/uploads/2021/10/Header--1024x536.jpg"
        alt="Cool 3D Tilt"
        containerClassName="rounded-xl animateImgDiv"
        className="brightness-90"
      />
    </Div>
      </Div>
 
    </Div>
  );
}
