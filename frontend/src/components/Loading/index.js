import "./Loading.css";

const Loading = () => {
  return (
    <div className="loader-container">
      {/* <div className="spinner"></div> */}

      <div className="loading-container">
        <span className="font-bold text-black text-xxl">Loading</span>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default Loading;
