import { Div } from "../../divComponent/div";


export function SignUp () {
    return (
<Div className="fixed inset-0 w-full h-full overflow-hidden z-0">
  <video
    src="https://cdn.pixabay.com/video/2024/09/27/233599_large.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover opacity-70"
  />
  {/* Overlay content in center */}
<Div className="fixed inset-0 z-10 flex justify-center items-center">
  <Div className="bg-white/70 backdrop-blur-lg p-10 rounded-xl shadow-lg">
    <h1 className="text-3xl font-bold mb-4 text-center">Welcome</h1>
    <p className="text-center text-lg">Start building better habits today.</p>
  </Div>
</Div>

</Div>



    )
}