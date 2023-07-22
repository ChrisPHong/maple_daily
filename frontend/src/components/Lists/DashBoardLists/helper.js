const imagePosition = (num) => {
  if (num === 0) {
    return {
      position: "relative",
      top: "72.5%",
      left: "75%",
    };
  }
  if (num === 1)
    return {
      position: "relative",
      top: "72.5%",
      left: "41%",
    };
  if (num === 2) {
    return {
      position: "relative",
      top: "72.5%",
      left: "14%",
    };
  }
  if (num === 3) {
    return {
      position: "relative",
      top: "72.5%",
      left: "-6%",
    };
  }
  if (num === 4) {
    return {
      position: "relative",
      top: "72.5%",
      left: "-23%",
    };
  }
  if (num === 5) {
    return {
      position: "relative",
      top: "72.5%",
      left: "-30%",
    };
  }
  if (num === 6) {
    return {
      position: "relative",
      top: "34%",
      left: "75%",
    };
  }
  if (num === 7) {
    return {
      position: "relative",
      top: "34%",
      left: "41%",
    };
  }
  if (num === 8) {
    return {
      position: "relative",
      top: "34%",
      left: "14%",
    };
  }
  if (num === 9) {
    return {
      position: "relative",
      top: "34%",
      left: "-6%",
    };
  }
  if (num === 10) {
    return {
      position: "relative",
      top: "34%",
      left: "-23%",
    };
  }
  if (num === 11) {
    return {
      position: "relative",
      top: "34%",
      left: "-30%",
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
