import React, { useState, useEffect, useRef } from "react";

const VirtualizedSlider = ({
  list,
  itemWidth = 200,
  itemHeight = "auto",
  containerWidth = 100, // in percentages
  containerHeight = 250,
  buffer = 2,
  itemsPerView = 20,
  //can be extended if needed for additinal styling
}) => {
  const [startIndex, setStartIndex] = useState(0); // Track the first item to render
  const containerRef = useRef(null);

  // Handle scroll event to calculate which items to render
  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const currentIndex = Math.floor(scrollLeft / itemWidth);
      setStartIndex(currentIndex);
    }
  };

  // Handle mouse wheel event for horizontal scrolling
  const handleWheel = (e) => {
    if (containerRef.current) {
      e.preventDefault(); // Prevent vertical scrolling
      containerRef.current.scrollLeft += e.deltaY; // Scroll horizontally instead of vertically
    }
  };

  // Only render the visible items plus a buffer on each side
  const visibleItems = list.slice(
    Math.max(0, startIndex - buffer),
    Math.min(list.length, startIndex + itemsPerView + buffer)
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      container.addEventListener("wheel", handleWheel); // Add the wheel event listener for horizontal scroll
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("wheel", handleWheel); // Clean up event listeners
      }
    };
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${containerWidth}%`,
        overflowX: "scroll",
        whiteSpace: "nowrap",
        position: "relative",
        height: containerHeight,
      }}
    >
      <div
        style={{
          display: "inline-block",
          width: `${list.length * itemWidth}px`, // total width of all items
          position: "relative",
          height: containerHeight - 20, // should be like this to prevent overflow !
        }}
      >
        {visibleItems.map((image, index) => (
          <img
            key={index}
            src={image.download_url}
            alt={`Slide ${index}`}
            style={{
              display: "inline-block",
              width: `${itemWidth}px`,
              height: itemHeight,
              position: "absolute",
              left: `${(startIndex - buffer + index) * itemWidth}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VirtualizedSlider;
