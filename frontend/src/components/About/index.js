import maplestory from "./assets/maplestory.mp4";
import ChangingOrder from "./assets/Changing_Order.mp4";
import CreatingTask from "./assets/Create_Task.mp4";
import LoadingCharacter from "./assets/Loading_Character.mp4";
const About = () => {
  return (
    <div
      className="flex flex-col justify-center items-center mt-28"
      style={{
        backgroundImage:
          "url(https://nxcache.nexon.net/maplestory/assets-new/img/explore_world_mapleisland_large.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* <div
      className="flex flex-col justify-center items-center mt-28"

    > */}
      <div className="flex justify-center flex-col items-center max-w-4xl">
        <div
          className="flex flex-row justify-center items-center bg-opacity-40 bg-black"
          //   style={{
          //     backgroundImage:
          //       "url(https://nxcache.nexon.net/maplestory/assets-new/img/explore_world_mapleisland_large.jpg)",
          //     backgroundSize: "cover",
          //     backgroundRepeat: "no-repeat",
          //     backgroundPosition: "center right",
          //   }}
        >
          <video
            src={LoadingCharacter}
            playsInline
            autoPlay
            loop
            muted
            type="video/mp4"
            className="video-class"
          />

          <div className="flex flex-col justify-start items-start mx-5">
            <span className="text-white font-bold text-xl">How to Start</span>
            <span className="text-white font-bold">
              Loading your character is essential! Make sure that you type in
              your maplestory character's name accurately! Once you have loaded
              your character in, You'll be able to add your quests and bosses
              for this character!
            </span>
          </div>
        </div>
      </div>

      <div
        className="flex justify-center flex-col items-center max-w-4xl mt-10 bg-opacity-40 bg-black"
        // style={{
        //   backgroundImage:
        //     "url(https://nxcache.nexon.net/maplestory/assets-new/img/explore_world_mapleisland_large.jpg)",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "center left",
        // }}
      >
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-col justify-start items-start mx-5">
            <span className="text-white font-bold text-xl">
              Loading A Character
            </span>
            <span className="text-white font-bold ">
              Loading your character is essential! Make sure that you type in
              your maplestory character's name accurately! Once you have loaded
              your character in, You'll be able to add your quests and bosses
              for this character!
            </span>
          </div>
          <video
            src={CreatingTask}
            playsInline
            autoPlay
            loop
            muted
            type="video/mp4"
            className="video-class"
          />
        </div>
      </div>

      <div
        className="flex justify-center flex-col items-center max-w-4xl mt-10 bg-opacity-40 bg-black"
        // style={{
        //   backgroundImage:
        //     "url(https://nxcache.nexon.net/maplestory/assets-new/img/explore_world_mapleisland_large.jpg)",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "right bottom",
        // }}
      >
        <div className="flex flex-row justify-center items-center">
          <video
            src={ChangingOrder}
            playsInline
            autoPlay
            loop
            muted
            type="video/mp4"
            className="video-class"
          />
          <div className="flex flex-col justify-start items-start mx-5">
            <span className="text-white font-bold text-xl">
              Changing The Order!
            </span>
            <span className="text-white font-bold">
              Creating a new bossing mule, but that character is in the back?
              Change the order of your characters! You can do that by simply
              clicking on the "Change Order" button and move those characters
              around!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
