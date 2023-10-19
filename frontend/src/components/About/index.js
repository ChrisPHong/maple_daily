import ChangingOrder from "./assets/Changing_Order.mp4";
import CreatingTask from "./assets/Create_Task.mp4";
import LoadingCharacter from "./assets/Loading_Character.mp4";
import maplestoryBG from './assets/maplestorybackground.png'
import { useState } from 'react';
import ImageSlider from "../ImageSlider";
import './About.css'


const About = () => {

  const loadingCharacterObj = {
    video: LoadingCharacter,
    title: "Loading A Character",
    description: "Loading your character is essential! Make sure that you type in your maplestory character's name accurately! Once you have loaded your character in, You'll be able to add your quests and bosses for this character!"
  }

  const creatingTaskObj = {
    video: CreatingTask,
    title: "Create Your Own Tasks!",
    description: "This is a test! This is a test! This is a test! This is a test! This is a test! This is a test! This is a test! This is a test! This is a test! This is a test! "
  }

  const changingOrderObj = {
    video: ChangingOrder,
    title: "Changing the Order!",
    description: "Creating a new bossing mule, but that character is in the back? Change the order of your characters! You can do that by simply clicking on the 'Change Order' button and move those characters around!"
  }

  const infoArr = [loadingCharacterObj, creatingTaskObj, changingOrderObj,]

  const [imageIdx, setImageIdx] = useState(0)


  return (
    <div
      className="flex flex-row items-center mt-28 justify-center"
      style={{
        backgroundImage: `url(${maplestoryBG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-row flex gap-3 p-5 shadow-xs justify-center">

        <div className="w-8/12">
          <ImageSlider infoArr={infoArr} imageIdx={imageIdx} setImageIdx={setImageIdx} />
        </div>
        <div>
          {infoArr.map((item, idx) => {
            return (
              <>
                {imageIdx === idx ?
                  <div key={idx} className="flex justify-center items-center w-80" >
                    <div
                      className="flex flex-row bg-opacity-70 bg-black rounded p-4 max-h-full"
                    >
                      <div className="flex flex-col justify-start items-start mx-5">
                        <span className="text-white font-bold text-xl">{item.title}</span>
                        <span className="text-white font-bold">
                          {item.description}
                        </span>
                      </div>
                    </div>
                  </div>
                  : ''}
              </>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
