import { useEffect, useState } from "react";
import VirtualizedSlider from "../../molecules/Slider/Slider";
import styles from "./HomePage.module.scss";
import axios from "axios";

const HomePage = () => {
  // The homepage does the fetching and passes it to the slider since it has to be reusable

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [error, setIsError] = useState(false);

  useEffect(() => {
    const fetchPics = async () => {
      try {
        const picturesResponse = await axios.get(
          `https://picsum.photos/v2/list?limit=1000`
        );
        setList(picturesResponse?.data);
        setIsLoading(false);
        setIsError(false);
      } catch (e) {
        setIsError(true);
      }
    };
    fetchPics();
  }, []);

  return (
    <div className={styles.HomePage}>
      {error ? (
        "Error fetching please try again later"
      ) : isLoading ? (
        "..."
      ) : (
        <VirtualizedSlider
          list={list}
          itemWidth={200}
          itemHeight={"auto"} // In order to keep the aspect ratio part of the exam you can pass auto here
          containerWidth={100}
          containerHeight={400}
          buffer={2}
          itemsPerView={15}
        />
      )}
    </div>
  );
};

export default HomePage;
