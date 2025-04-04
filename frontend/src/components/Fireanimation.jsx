import React from "react";

const FireAnimation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-[100px] h-[100px]">
        {/* Fire Left */}
        <div className="absolute h-full w-full animate-[shake_3s_ease-out_0s_infinite_both]">
          <div className="absolute top-[15%] left-[-20%] w-[80%] h-[80%] bg-[#ef5a00] scale-x-[0.8] rotate-[45deg] rounded-[0_40%_60%_40%] drop-shadow-[0_0_10px_#d43322]"></div>
          <div className="absolute top-[10%] left-[20%] w-[10%] h-[10%] bg-[#ef5a00] rounded-full drop-shadow-[0_0_10px_#d43322] animate-[particleUp_3s_infinite_ease-out_0s_both]"></div>
        </div>

        {/* Fire Center */}
        <div className="absolute h-full w-full animate-[scaleUpDown_3s_ease-out_infinite_both]">
          <div
            className="absolute w-full h-full scale-x-[0.8] rotate-[45deg] rounded-[0_40%_60%_40%] drop-shadow-[0_0_10px_#d43322]"
            style={{
              backgroundImage:
                "radial-gradient(farthest-corner at 10px 0, #d43300 0%, #ef5a00 95%)",
            }}
          ></div>
          <div className="absolute top-[60%] left-[45%] w-[10px] h-[10px] bg-[#ef5a00] rounded-full drop-shadow-[0_0_10px_#d43322] animate-[particleUp_2s_ease-out_0s_infinite_both]"></div>
        </div>

        {/* Fire Right */}
        <div className="absolute h-full w-full animate-[shake_2s_ease-out_0s_infinite_both]">
          <div className="absolute top-[15%] right-[-25%] w-[80%] h-[80%] bg-[#ef5a00] scale-x-[0.8] rotate-[45deg] rounded-[0_40%_60%_40%] drop-shadow-[0_0_10px_#d43322]"></div>
          <div className="absolute top-[45%] left-[50%] w-[15px] h-[15px] bg-[#ef5a00] scale-x-[0.8] rotate-[45deg] rounded-full drop-shadow-[0_0_10px_#d43322] animate-[particleUp_2s_ease-out_0s_infinite_both]"></div>
        </div>

        {/* Fire Bottom */}
        <div className="absolute top-[30%] left-[20%] w-[75%] h-[75%] bg-[#ff7800] scale-x-[0.8] rotate-[45deg] rounded-[0_40%_100%_40%] blur-[10px] animate-[glow_2s_ease-out_0s_infinite_both]"></div>
      </div>
    </div>
  );
};

const FireAnimationStyles = () => (
  <style jsx global>{`
    @keyframes scaleUpDown {
      0%,
      100% {
        transform: scaleY(1) scaleX(1);
      }
      50%,
      90% {
        transform: scaleY(1.1);
      }
      75% {
        transform: scaleY(0.95);
      }
      80% {
        transform: scaleX(0.95);
      }
    }

    @keyframes shake {
      0%,
      100% {
        transform: skewX(0) scale(1);
      }
      50% {
        transform: skewX(5deg) scale(0.9);
      }
    }

    @keyframes particleUp {
      0% {
        opacity: 0;
      }
      20% {
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        top: -100%;
        transform: scale(0.5);
      }
    }

    @keyframes glow {
      0%,
      100% {
        background-color: #ef5a00;
      }
      50% {
        background-color: #ff7800;
      }
    }
  `}</style>
);

const FireComponent = () => (
  <>
    <FireAnimationStyles />
    <FireAnimation />
  </>
);

export default FireComponent;