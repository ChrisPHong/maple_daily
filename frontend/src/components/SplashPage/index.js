import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import About from "../About";
const SplashPage = () => {
  const history = useHistory();
  return (
    <div className="mt-20 flex flex-col justify-center items-center">
      <div
        className="Introduction flex flex-col justify-center items-center h-screen"
        style={{
          backgroundImage:
            "url(https://external-preview.redd.it/rhuCRVXQnIQWzI_fqi46lepYqVpwSe5O-uKHNsGSzvs.jpg?width=1080&crop=smart&auto=webp&s=48c9644a51ce793b2fd6b5a375b59abb0b35f121)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-52 flex flex-col items-center bg-gray-500 bg-opacity-40 rounded p-3">
          <h1 className="text-xxl font-bold text-white">WELCOME</h1>
          <h1 className="text-xl font-bold text-white">Daily Mapler!</h1>
          <span className="text-white font-bold mt-2">
            Track all of your bossing and quests with Daily Mapler! You'll be
            able to load in your character and check off daily/weekly quests and
            bosses so that you don't have to remember everything you did for
            each character! Click on the button below to get started!
          </span>
          <button
            className="submit-btn mt-10 margin-14"
            onClick={(e) => {
              e.preventDefault();
              history.push("/signup");
            }}
          >
            Get Started
          </button>
        </div>
      </div>
      <About />
    </div>
  );
};

export default SplashPage;
