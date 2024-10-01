import "./App.css";

import MainBackground from "./assets/MainBackground.jpg";
import HomePage from "./organisms/HomePage/HomePage";

function App() {
  return (
    <>
      {/* Please ignore this image, it is just a default background */}
      <img
        src={MainBackground}
        alt={"background"}
        style={{
          opacity: "0.9",
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: -10,
        }}
      />

      {/* In the homepage you can find the slider */}
      <HomePage />
    </>
  );
}

export default App;
