import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Div } from "../../divComponent/div";
import { Button } from "../../Button/button";

export function GetStarted() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [customOpen, setCustomOpen] = useState(false);
  const [customText, setCustomText] = useState("");
const [answers, setAnswers] = useState<{ [key: string]: string | string[] }>({});
  const [step2Selections, setStep2Selections] = useState<string[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string[] }>({});



  const handleOptionClick = (stepKey: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepKey]: value }));
    if (step < 4) {
      setTimeout(() => setStep((prev) => prev + 1), 200);
    }
  };


  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleContinue = () => {
    console.log("Collected Answers:", { ...answers, customText });
    navigate("/signup");
  };

const handleOptionSelect = (stepKey: string, value: string) => {
  const isStep2 = stepKey === "step2";

  setAnswers((prev) => {
    const current = prev[stepKey];

    // ✅ Step 2: Multi-select
    if (isStep2) {
      const selected = (current as string[]) || [];

      if (selected.includes(value)) {
        return { ...prev, [stepKey]: selected.filter((v) => v !== value) };
      }

      if (selected.length >= 3) return prev;

      return { ...prev, [stepKey]: [...selected, value] };
    }

    // ✅ Single select steps (e.g., step 3)
    if (current === value) return prev;

    return { ...prev, [stepKey]: value };
  });

  // ✅ Auto-advance for single-select steps
  if (!isStep2) {
    setTimeout(() => {
      if (step < 4) setStep((prev) => prev + 1);
    }, 200);
  }
};




const optionBox = (stepKey: string, option: string) => {
  const current = answers[stepKey];
  const isSelected =
    stepKey === "step3"
      ? (current as string[])?.includes(option)
      : current === option;

  return (
    <Div
      key={option}
      onClick={() => handleOptionSelect(stepKey, option)}
      className={`flex items-center justify-between p-4 mb-2 rounded cursor-pointer border transition-all duration-200 ${
        isSelected
          ? "bg-gradient-to-r from-pink-100 to-white border-green-400"
          : "bg-white border-gray-300 hover:bg-gray-100"
      }`}
    >
      <span className="">{option}</span>

      {isSelected && (
        <svg
          className="w-5 h-5 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </Div>
  );
};




  return (
    <Div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-tr from-blue-200 to-pink-200">
        
<Div className="w-[90%] h-[600px] sm:w-[450px] bg-gradient-to-b from-blue-100 to-white rounded-xl p-6 transition-all duration-300 relative">
            {/* Close (X) Button */}
    <Div className="absolute top-4 right-4 cursor-pointer" onClick={() => navigate(-1)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-500 hover:text-black transition duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </Div>
        {/* Progress Indicators */}
        <Div className="mb-4 flex justify-center gap-1">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition ${
                step === s ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </Div>
                {/* Step Content */}
        {step === 1 && (
          <>
          <Div className="w-full h-[95%] flex flex-col items-center relative">
             <Div className="w-14 h-14 ring-2 ring-black/60 rounded-lg mt-24" />
             <p className="mt-12 text-4xl font-medium">Plan Better.</p>
             <p className="text-4xl font-medium">Habit Smarter.</p>
             {[
                <Button
                type="button"
                btnText="Get Started"
                className="w-[70%] h-[55px] text-white bg-blue-600 absolute bottom-0 hover:bg-blue-700 text-xl transition-colors duration-150"
                onClick={() => setStep(2)}
                >x</Button>
             ]}
          </Div>
          </>
        )}

{step === 2 && (
  <>
    <h2 className="text-xl font-semibold mb-4">
      What do you love spending time on?
    </h2>
    <p className="font-medium mb-4">
      Pick 1–3 areas you enjoy or want to explore more.
    </p>

    {[
        "Fitness & Health",
        "Reading & Learning",
        "Business & Productivity",
        "Outdoor Adventures",
        "Cooking & Nutrition",
        "Other",
    ].map((option) => {
      const isSelected = step2Selections.includes(option);
      const isDisabled = !isSelected && step2Selections.length >= 3;

return (
  <Div
    key={option}
    onClick={() => {
      if (isSelected) {
        setStep2Selections((prev) => prev.filter((item) => item !== option));
      } else if (!isDisabled) {
        setStep2Selections((prev) => [...prev, option]);
      }
    }}
    className={`p-3 mb-2 border rounded cursor-pointer transition-colors flex justify-between items-center ${
      isSelected
        ? "bg-gradient-to-r from-pink-100 via-white to-white text-gray-800 border-pink-300"
        : isDisabled
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "border-gray-300 hover:bg-gray-100"
    }`}
  >
    <span>{option}</span>

    {/* ✅ Tick icon if selected */}
    {isSelected && (
      <svg
        className="w-5 h-5 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    )}
  </Div>
);

    })}

    {step2Selections.length > 0 && (
      <Div className="mt-6 flex justify-between">
          <button
    onClick={handleBack}
    className={`px-4 py-2 bg-gray-300 text-gray-800 rounded transition-opacity duration-200 ${
      step > 1 ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    Back
  </button>
 <button
           onClick={() => {
            setAnswers((prev) => ({ ...prev, UserOnboard2: step2Selections }));
            setStep(3);
          }}

    className={`px-4 py-2 bg-blue-600 text-white rounded transition-opacity duration-200 ${
      step === 2 || step === 4 ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    Continue
  </button>
      </Div>
    )}
  </>
)}



        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              How do you want your AI to coach you?
            </h2>
            {[
             "Gentle & Encouraging",
             "Motivational & Tough Love",
             "Data-Driven & Analytical",
             "Spiritual & Reflective",
             "Flexible & Chill",
            ].map((option) => optionBox("AI-Coach-3", option))}
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold mb-4">
              What would you like to improve?
            </h2>
            {[
               "Consistency & Routine",
               "Focus & Attention",
               "Energy & Motivation",
                "Sleep & Recovery",
            ].map((option) => optionBox("Improvement-4", option))}
            <Div
              onClick={() => setCustomOpen((prev) => !prev)}
              className="p-3 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 transition-colors mb-3"
            >
              Add custom response
            </Div>

            <Div
              className={`overflow-hidden transition-all duration-300 ${
                customOpen ? "max-h-40" : "max-h-0"
              }`}
            >
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type your response..."
                className="w-full mt-2 p-2 border border-gray-300 outline-none rounded"
              />
            </Div>
          </>
        )}
{/* Navigation Buttons */}
<Div className="mt-6 flex justify-between items-center w-full">
  {/* Back button */}
  <button
    onClick={handleBack}
    className={`px-4 py-2 bg-gray-300 text-gray-800 rounded transition-opacity duration-200 ${
      step > 2 ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    Back
  </button>
            {step === 4 && (
            <button
              onClick={handleContinue}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Continue
            </button>
          )}
</Div>



        </Div>
      </Div>
  );
}
