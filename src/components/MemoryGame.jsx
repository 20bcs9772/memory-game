import { useState } from "react";
import "../index.css";

const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const generateInitialState = () => {
  const arr = [];
  for (var num = 0; num < 12; num++) {
    arr.push(false);
  }
  return arr;
};

const MemoryGame = ({ images }) => {
  const [randomImages] = useState(() => shuffle([...images, ...images]));
  const [imageState, setImageState] = useState(generateInitialState);
  const [checked, setChecked] = useState(generateInitialState);
  const [evenClick, setEvenClick] = useState(null);

  console.log(randomImages);

  const handleClick = (selectedIndex) => {
    const imageStates = [];
    const checkedStates = checked;
    console.log(evenClick);
    if (evenClick === null && !checked[selectedIndex]) {
      console.log("inside if");
      imageState.map((images, index) => {
        if (selectedIndex === index) {
          imageStates.push(!imageState[index]);
        } else {
          imageStates.push(imageState[index]);
        }
      });
      setEvenClick(selectedIndex);
    } else {
      if (randomImages[evenClick] === randomImages[selectedIndex]) {
        imageState.map((images, index) => {
          if (selectedIndex === index || selectedIndex === evenClick) {
            imageStates.push(true);
          } else {
            imageStates.push(imageState[index]);
          }
        });

        checkedStates[evenClick] = true;
        checkedStates[selectedIndex] = true;
        setChecked(checkedStates);
      } else {
        console.log(evenClick);
        imageState.map((images, index) => {
          if (selectedIndex === index || selectedIndex === evenClick) {
            imageStates.push(false);
          } else {
            imageStates.push(imageState[index]);
          }
        });
      }
      setEvenClick(null);
    }
    console.log(imageStates);
    setImageState(imageStates);
  };

  console.log("imageState", imageState);
  return (
    <div className="container w-full">
      <h1>Memory Game</h1>
      <p>Build your memory game! </p>
      <p>Here are the sample images:</p>
      <div className="container flex flex-row justify-center flex-wrap w-50">
        {randomImages.map((image, index) => (
          <div className="m-1" onClick={() => handleClick(index)}>
            {imageState[index] ? (
              <img
                key={index}
                src={image}
                style={{ width: "300px", height: "400px" }}
              />
            ) : (
              <div
                className="bg-secondary"
                style={{ width: "300px", height: "400px", padding: "10px" }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
