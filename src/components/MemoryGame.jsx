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
  const [evenClick, setEvenClick] = useState(null);

  const handleClick = (selectedIndex) => {
    if (imageState[selectedIndex]) return;
    const resetImage = imageState;
    resetImage[selectedIndex] = true;
    if (evenClick === null) {
      setEvenClick(selectedIndex);
      setImageState(resetImage);
    } else {
      if (randomImages[evenClick] !== randomImages[selectedIndex]) {
        resetImage[selectedIndex] = false;
        resetImage[evenClick] = false;
        setImageState(resetImage);
      }
      setEvenClick(null);
    }
  };

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
