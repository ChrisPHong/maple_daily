const imagePosition = (num) => {
  if (num === 0) {
    return {
      position: "relative",
      top: "66%",
      left: "49%",
    };
  }
  if (num === 1)
    return {
      position: "relative",
      top: "66%",
      left: "24%",
    };
  if (num === 2) {
    return {
      position: "relative",
      top: "66%",
      left: "-3%",
    };
  }
  if (num === 3) {
    return {
      position: "relative",
      top: "66%",
      left: "-20%",
    };
  }
  if (num === 4) {
    return {
      position: "relative",
      top: "66%",
      left: "-45%",
    };
  }
  if (num === 5) {
    return {
      position: "relative",
      top: "66%",
      left: "-70%",
    };
  }
  if (num === 6) {
    return {
      position: "relative",
      top: "34%",
      left: "49%",
    };
  }
  if (num === 7) {
    return {
      position: "relative",
      top: "34%",
      left: "24%",
    };
  }
  if (num === 8) {
    return {
      position: "relative",
      top: "34%",
      left: "-3%",
    };
  }
  if (num === 9) {
    return {
      position: "relative",
      top: "34%",
      left: "-20%",
    };
  }
  if (num === 10) {
    return {
      position: "relative",
      top: "34%",
      left: "-45%",
    };
  }
  if (num === 11) {
    return {
      position: "relative",
      top: "34%",
      left: "-70%",
    };
  }
};

const flippedImage = (num) => {
  if (
    num === 0 ||
    num === 1 ||
    num === 2 ||
    num === 6 ||
    num === 7 ||
    num === 8
  ) {
    return "flipped";
  }
  return "normal";
};
export { imagePosition, flippedImage };
