import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import './ImageSlider.css'


const ImageSlider = ({ infoArr, imageIdx, setImageIdx }) => {

    const showPreviousImage = () => {
        setImageIdx(index => {
            if (index === 0) return infoArr.length - 1;
            return index - 1;
        })
    }

    const showNextImage = () => {
        setImageIdx(index => {
            if (index === infoArr.length - 1) return 0;
            return index + 1;
        })
    }

    return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex' }}>
                {infoArr.map((item) => {
                    return (
                        <video
                            key={item}
                            src={item.video}
                            playsInline
                            autoPlay
                            loop
                            muted
                            type="video/mp4"
                            className="img-slider-img" alt='showing'
                            style={{ translate: `${-100 * imageIdx}%` }}
                        />
                    )
                })}

            </div>
            <button className="img-slider-btn" style={{ left: 0 }} onClick={showNextImage}>
                <ArrowBigLeft />
            </button>
            <button className="img-slider-btn" style={{ right: 0 }} onClick={showPreviousImage}>
                <ArrowBigRight />
            </button>

            <div style={{
                position: 'absolute',
                bottom: ".5rem",
                left: '50%',
                translate: '-50%',
                display: "flex",
                gap: '.25rem',
            }}>
                {infoArr.map((_, index) => {
                    return (
                        <button key={index} className="img-slider-dot-btn" onClick={() => {
                            setImageIdx(index)
                        }}>
                            {index === imageIdx ? <CircleDot /> : <Circle />}
                        </button>
                    )
                })}
            </div>
        </div>

    );
};

export default ImageSlider;
