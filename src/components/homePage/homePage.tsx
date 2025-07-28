import React, { useEffect, useState } from "react";
import { Div } from "../../divComponent/div";
import { Button } from "../../Button/button";
import { TypedText } from "../animations/animatedText";
import './homePage.css'
import { Icon } from "../../Icon.component/Icon";
import astroImg from "../../images/Astro_Bot.webp"
import { useNavigate } from "react-router-dom";


export function HomeComponent() {
const [openDropdown, setOpenDropdown] = useState<"About" | null>(null);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
const navigate = useNavigate();

const toggleDropdown = (section: "About" | null) => {
  setOpenDropdown(openDropdown === section ? null : section);
};


const toggleMobileMenu = () => {
  if (isMobileMenuOpen) setMobileAboutOpen(false); // close nested dropdown
  setIsMobileMenuOpen(!isMobileMenuOpen);
};

// About inside mobile menu
const toggleMobileAbout = () => {
  setMobileAboutOpen((prev) => !prev);
};


  return (
    <Div className="mainDiv overflow-hidden w-full h-full bg-white container overflow-y-auto">
<Div className="w-full h-20 flex items-center px-4 md:px-10 fixed top-0 left-0 z-50 bg-white shadow-md">
  {/* Left: Logo */}
  <Div className="w-1/2 h-full flex items-center">
    <Div className="w-12 h-12 ring-2 ring-black/60 rounded-lg" />
    <p className="font3 ml-4 text-xl font-medium">Mindmile</p>
  </Div>

  {/* Right Section */}
  <Div className="w-1/2 h-full flex justify-end items-center relative">
    {/* Desktop Navigation */}
    <Div className="hidden md:flex w-fit h-1/2 absolute right-0 items-center">
      <div className="relative mr-5">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => toggleDropdown('About')}
        >
          <h1
            className={`text-base font-medium hover:text-blue-800 ${
              openDropdown === 'About' ? 'text-blue-800' : 'text-gray-800'
            }`}
          >
            About
          </h1>
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform ${
              openDropdown === 'About' ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div
          className={`absolute top-10 -left-20 w-72 bg-white border rounded shadow-lg transition-all duration-300 ease-in-out ${
            openDropdown === 'About' ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
          } overflow-hidden`}
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
        onClick={() => navigate("/getstarted")}
      >
        Signup
      </Button>
    </Div>
<Div className="md:hidden relative z-50">
  <button
    className="w-10 h-10 flex flex-col items-center justify-center space-y-[7px] group"
    onClick={toggleMobileMenu}
  >
    <span
      className={`w-8 h-[2px] bg-black rounded transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
      }`}
    ></span>
    <span
      className={`w-5 h-[2px] bg-black rounded transition-opacity duration-300 ease-in-out ${
        isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
      }`}
    ></span>
    <span
      className={`w-8 h-[2px] bg-black rounded transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
      }`}
    ></span>
  </button>
</Div>


  </Div>

  {/* Fullscreen Mobile Dropdown */}
  <div
    className={`fixed top-0 left-0 w-full h-screen bg-white transition-all duration-300 ease-in-out z-40 ${
      isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
  >
    <Div className="p-6 pt-24 flex flex-col">
      <p className="text-base font-semibold mb-4 cursor-pointer hover:text-gray-700">Login</p>
      <Button
        type="button"
        btnText="Sign Up"
        className="w-full mb-4 font-medium rounded-lg text-white transition-colors duration-200 hover:text-black h-10 bg-blue-800 hover:bg-white border hover:border-black/90"
        onClick={() => navigate("/getstarted")}
      >
        Sign Up
      </Button>

      {/* About toggle */}
      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleMobileAbout}
        >
          <h1
            className={`text-base font-medium hover:text-blue-800 ${
              mobileAboutOpen ? 'text-blue-800' : 'text-gray-800'
            }`}
          >
            About
          </h1>
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform ${
              mobileAboutOpen ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div
          className={`mt-2 ml-2 transition-all duration-300 ease-in-out ${
            mobileAboutOpen ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
          } overflow-hidden`}
        >
          <ul>
            <li className="py-1 cursor-pointer hover:text-gray-600">Blog</li>
            <li className="py-1 cursor-pointer hover:text-gray-600">Guides</li>
            <li className="py-1 cursor-pointer hover:text-gray-600">Webinars</li>
          </ul>
        </div>
      </div>
    </Div>
  </div>
</Div>

<hr />
      <Div className="w-full h-[550px] mt-24 container bg-white overflow-hidden flex items-center mobileResTopLan">
        <Div className="w-w130 h-h450 flex flex-col mobileResTopLanInner">
          <TypedText
            strings={["Plan Better.", "Habit Smarter."]}
            className="bg-white mt-10 text-6xl animateTxtRes"
          />
          <Div className="w-full h-28 mt-7 trackResDiv">
            <p className="text-xl tracking-tight trackResTxt">Track your <a className="extended">Progress</a> and achieve your goals with personalized daily habit plans and an <a className="extended">AI-Powered</a> coach</p>
          </Div>
          <Button 
          type="button"
          btnText="Start Free Trial"
          className="w-44 h-12 bg-blue-800 hover:bg-white text-white hover:text-black font-medium font3 startFreeDashRes border rounded-lg hover:border-black/90 transition-colors duration-200"
          onClick={() => navigate("/getstarted")}
          >start</Button>
        </Div>

        <Div className="w-[550px] h-[450px] freeTopDivRes bg-slate-50 ml-20 flex flex-col p-5 ring ring-black/30 rounded-md">
          <Div className="w-full h-28 flex flex-col">
            <h1 className="text-[45px] tracking-tighter freeTopDivTxt">FREE YOUR</h1>
            <h1 className="text-[45px] tracking-tighter -mt-3 freeTopDivTxt">FULL POTENTIAL</h1>
          </Div>

          <Div className="w-full h-[280px] mt-5 flex flex-col gap-2">
            <Div className="w-full h-12 flex items-center gap-5">
              <Icon
              icon="ri-check-fill"
              className="text-2xl font-semibold text-blue-600"
               />
               <p>Track tasks and habits</p>
            </Div>
            <Div className="w-full h-12 flex items-center gap-5">
              <Icon
              icon="ri-check-fill"
              className="text-2xl font-semibold text-blue-600"
               />
               <p>Automatic schedules</p>
            </Div>
            <Div className="w-full h-12  flex items-center gap-5">
              <Icon
              icon="ri-check-fill"
              className="text-2xl font-semibold text-blue-600"
               />
               <p>Personalized Recommendation</p>
            </Div>           
            <Div className="w-full h-12 flex items-center gap-5">
              <Icon
              icon="ri-check-fill"
              className="text-2xl font-semibold text-blue-600"
               />
               <p>Weekly Reviews</p>
            </Div> 
            <h1 className="self-center text-4xl font-semibold">3-DAY FREE TRIAL</h1>         
          </Div>
        </Div>


      </Div>

<Div className="w-full h-[300px] animateImgDivMain container flex">
      <Div className="w-1/2 h-full py-10 animateImgDivMaininner">
        <h1 className="text-4xl font-medium">Build Better Habits Effortlessly</h1>
        <p className=" text-base mt-5">Mindmile uses AI to help you stay focused,organized,</p>
        <p className="text-base"> and one step ahead every single day.</p>
        <Button 
        type="button"
        btnText="Try it Free"
        onClick={() => navigate("/getstarted")}
        className="w-44 h-12 bg-blue-800 text-white mt-10 border rounded-lg hover:border-black/90 hover:bg-white hover:text-black transition-colors duration-200"
        >
          Start
        </Button>
      </Div>
<Div className="w-1/2 h-full flex items-center justify-center mt-10 animateImgDivMaininner2">
  <img
    src={astroImg}
    alt="Astro Bot"
    className="w-[300px] animate-float hover:rotate-[-10deg] transition-transform duration-500"
  />
</Div>
</Div>


<Div className="w-full h-[370px] mt-10 flex flex-col container whatsDivRes">
  <p className="text-2xl font-medium">Whats Quietly Slowing you down?</p>
  <Div className="w-full h-[90%] gap-2 flex whatsDivInner">
      <Div className="w-[25%] h-full bg-slate-50 mt-7 flex flex-col justify-between p-4 rounded-lg  hover:scale-[1.03] transition-transform duration-300 cursor-pointer whatsDivInnerDiv border-2 hover:border-purple-600">
        <div className="w-full h-12">
          <p className="text-2xl">01/</p>
        </div>
        <div className="w-full h-40">
          <p className="text-2xl font-medium">Too much Noise, Not Enough Focus</p>
          <p className="tracking-tighter mt-3">Your day's packed but are you making real progress? Mindmile clears the fog and sharpens your focus</p>
        </div>
  </Div>
        <Div className="w-[25%] h-full bg-slate-50 mt-7 flex flex-col justify-between p-4 rounded-lg hover:scale-[1.03] transition-transform duration-300 cursor-pointer whatsDivInnerDiv border-2 hover:border-blue-600">
        <div className="w-full h-12">
          <p className="text-2xl">02/</p>
        </div>
        <div className="w-full h-40">
          <p className="text-2xl font-medium">You plan... But don't follow through</p>
          <p className="tracking-tighter mt-3">We get it. Motivation fades. Our AI coach keeps you on track, adjusting to your energy and mood.</p>
        </div>
  </Div>
        <Div className="w-[25%] h-full bg-slate-50 mt-7 flex flex-col justify-between p-4 rounded-lg  hover:scale-[1.03] transition-transform duration-300 cursor-pointer whatsDivInnerDiv border-2 hover:border-yellow-600">
        <div className="w-full h-12">
          <p className="text-2xl">03/</p>
        </div>
        <div className="w-full h-40">
          <p className="text-2xl font-medium">Routine Chaos, Zero Consistency</p>
          <p className="tracking-tighter mt-3">You’re trying habits, journals, planners — yet nothing sticks. MindMile makes it all feel natural again.</p>
        </div>
  </Div>
        <Div className="w-[25%] h-full bg-slate-50 mt-7 flex flex-col justify-between p-4 rounded-lg  hover:scale-[1.03] transition-transform duration-300 cursor-pointer whatsDivInnerDiv border-2 hover:border-teal-600">
        <div className="w-full h-12">
          <p className="text-2xl">04/</p>
        </div>
        <div className="w-full h-40">
          <p className="text-2xl font-medium">Burned Out Before You Begin</p>
          <p className="tracking-tighter mt-3">Overthinking the plan can kill the momentum. Let AI do the thinking — you just show up and win.</p>
        </div>
  </Div>
  </Div>
</Div>


<Div className="w-full h-50 mt-20"></Div>

    </Div>
  );
}
