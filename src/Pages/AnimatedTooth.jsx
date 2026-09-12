import React from "react";

export default function AnimatedTooth() {
  return (
    <>
      <div className="animated-tooth-scene">

        {/* الخلفية Glow */}
        <div className="tooth-big-glow" />

        {/* دوائر الطاقة */}
        <div className="energy-ring ring-1" />
        <div className="energy-ring ring-2" />
        <div className="energy-ring ring-3" />

        {/* خطوط Orbit */}
        <div className="orbit orbit-1">
          <span />
        </div>

        <div className="orbit orbit-2">
          <span />
        </div>

        <div className="orbit orbit-3">
          <span />
        </div>

        {/* Particles */}
        <div className="tooth-particles">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>

        {/* السن */}
        <div className="tooth-floating">

          <svg
            viewBox="0 0 300 390"
            className="tooth-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>

              {/* جسم السن */}
              <linearGradient
                id="toothBody"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                />

                <stop
                  offset="22%"
                  stopColor="#c9f7ff"
                />

                <stop
                  offset="48%"
                  stopColor="#65dfff"
                />

                <stop
                  offset="72%"
                  stopColor="#167dcc"
                />

                <stop
                  offset="100%"
                  stopColor="#031b38"
                />
              </linearGradient>

              {/* Inner glow */}
              <radialGradient
                id="toothLight"
                cx="50%"
                cy="35%"
                r="65%"
              >
                <stop
                  offset="0%"
                  stopColor="#ffffff"
                  stopOpacity=".95"
                />

                <stop
                  offset="35%"
                  stopColor="#9cefff"
                  stopOpacity=".75"
                />

                <stop
                  offset="75%"
                  stopColor="#1da7e9"
                  stopOpacity=".25"
                />

                <stop
                  offset="100%"
                  stopColor="#006bba"
                  stopOpacity="0"
                />
              </radialGradient>

              {/* Glow */}
              <filter
                id="toothGlow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur
                  stdDeviation="7"
                  result="blur"
                />

                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="
                    0 0 0 0 0.1
                    0 0 0 0 0.75
                    0 0 0 0 1
                    0 0 0 1 0
                  "
                />

                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Sparkle */}
              <filter
                id="smallGlow"
                x="-200%"
                y="-200%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur
                  stdDeviation="2"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

            </defs>

            {/* Glow خلف السن */}
            <path
              d="
                M150 22
                C112 15 73 25 57 61
                C42 95 53 130 69 154
                C82 173 84 202 88 239
                C91 274 103 329 121 353
                C130 365 140 361 145 346
                L150 303
                L155 346
                C160 361 170 365 179 353
                C197 329 209 274 212 239
                C216 202 218 173 231 154
                C247 130 258 95 243 61
                C227 25 188 15 150 22
                Z
              "
              fill="none"
              stroke="#36ddff"
              strokeWidth="13"
              opacity=".45"
              filter="url(#toothGlow)"
            />

            {/* السن الأساسي */}
            <path
              d="
                M150 22
                C112 15 73 25 57 61
                C42 95 53 130 69 154
                C82 173 84 202 88 239
                C91 274 103 329 121 353
                C130 365 140 361 145 346
                L150 303
                L155 346
                C160 361 170 365 179 353
                C197 329 209 274 212 239
                C216 202 218 173 231 154
                C247 130 258 95 243 61
                C227 25 188 15 150 22
                Z
              "
              fill="url(#toothBody)"
              stroke="#b9f5ff"
              strokeWidth="2"
              filter="url(#toothGlow)"
            />

            {/* الإضاءة الداخلية */}
            <path
              d="
                M150 35
                C115 27 84 39 72 68
                C62 94 72 120 87 144
                C101 166 100 207 104 240
                C107 273 114 310 124 330
                C131 342 137 335 139 320
                L150 265
                L161 320
                C163 335 169 342 176 330
                C186 310 193 273 196 240
                C200 207 199 166 213 144
                C228 120 238 94 228 68
                C216 39 185 27 150 35
                Z
              "
              fill="url(#toothLight)"
              opacity=".75"
            />

            {/* لمعان الشمال */}
            <path
              d="
                M82 69
                C91 44 118 35 139 39
                C117 48 104 67 103 93
                C101 122 111 146 112 172
                C113 189 107 200 101 183
                C94 163 88 139 79 119
                C72 103 76 84 82 69
                Z
              "
              fill="#ffffff"
              opacity=".32"
            />

            {/* تفاصيل داخل السن */}
            <path
              d="M150 72 C137 105 136 139 150 174"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              opacity=".28"
            />

            <path
              d="M150 72 C163 105 164 139 150 174"
              fill="none"
              stroke="#b7f7ff"
              strokeWidth="2"
              opacity=".22"
            />

            {/* نقاط مضيئة داخل السن */}
            <g
              fill="#ffffff"
              filter="url(#smallGlow)"
            >
              <circle cx="107" cy="85" r="1.8" />
              <circle cx="126" cy="61" r="1.2" />
              <circle cx="178" cy="79" r="1.5" />
              <circle cx="195" cy="115" r="1.2" />
              <circle cx="94" cy="130" r="1" />
              <circle cx="184" cy="151" r="1.6" />
              <circle cx="117" cy="180" r="1.3" />
              <circle cx="170" cy="204" r="1" />
              <circle cx="101" cy="221" r="1.4" />
              <circle cx="188" cy="245" r="1" />
              <circle cx="130" cy="263" r="1.3" />
              <circle cx="169" cy="285" r="1" />
            </g>
          </svg>

        </div>

        {/* قاعدة الطاقة */}
        <div className="tooth-platform">

          <div className="platform-glow" />

          <div className="platform-ring platform-ring-1" />
          <div className="platform-ring platform-ring-2" />
          <div className="platform-ring platform-ring-3" />

          <div className="platform-core" />
        </div>

      </div>

      <style>{`

        /* =========================================
           MAIN SCENE
        ========================================= */

        .animated-tooth-scene {
          position: relative;
          width: 430px;
          height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        /* =========================================
           BIG GLOW
        ========================================= */

        .tooth-big-glow {
          position: absolute;
          width: 310px;
          height: 400px;
          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(35, 220, 255, .22) 0%,
              rgba(0, 130, 255, .10) 35%,
              transparent 72%
            );

          filter: blur(35px);

          animation:
            toothGlowPulse
            3.5s
            ease-in-out
            infinite;
        }

        @keyframes toothGlowPulse {

          0%,
          100% {
            transform: scale(.9);
            opacity: .55;
          }

          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        /* =========================================
           FLOATING TOOTH
        ========================================= */

        .tooth-floating {
          position: absolute;
          z-index: 10;

          width: 250px;
          height: 350px;

          display: flex;
          align-items: center;
          justify-content: center;

          animation:
            toothFloat
            4.2s
            ease-in-out
            infinite;
        }

        @keyframes toothFloat {

          0%,
          100% {
            transform:
              translateY(-15px)
              rotate(-1deg);
          }

          50% {
            transform:
              translateY(12px)
              rotate(1deg);
          }
        }

        .tooth-svg {
          width: 250px;
          height: auto;

          overflow: visible;

          filter:
            drop-shadow(
              0 0 8px
              rgba(74, 226, 255, .95)
            )
            drop-shadow(
              0 0 25px
              rgba(0, 157, 255, .65)
            )
            drop-shadow(
              0 20px 40px
              rgba(0, 100, 220, .30)
            );
        }

        /* =========================================
           ENERGY RINGS
        ========================================= */

        .energy-ring {
          position: absolute;

          left: 50%;
          top: 50%;

          border-radius: 50%;

          border:
            1px solid
            rgba(30, 215, 255, .42);

          transform:
            translate(-50%, -50%)
            rotateX(65deg);

          animation:
            ringPulse
            3s
            ease-in-out
            infinite;
        }

        .ring-1 {
          width: 290px;
          height: 115px;
        }

        .ring-2 {
          width: 350px;
          height: 145px;

          opacity: .45;

          animation-delay: .7s;
        }

        .ring-3 {
          width: 405px;
          height: 170px;

          opacity: .22;

          animation-delay: 1.3s;
        }

        @keyframes ringPulse {

          0%,
          100% {
            transform:
              translate(-50%, -50%)
              rotateX(65deg)
              scale(.88);

            opacity: .2;
          }

          50% {
            transform:
              translate(-50%, -50%)
              rotateX(65deg)
              scale(1.08);

            opacity: .8;
          }
        }

        /* =========================================
           ORBITS
        ========================================= */

        .orbit {
          position: absolute;

          left: 50%;
          top: 45%;

          width: 360px;
          height: 170px;

          border:
            1px solid
            rgba(0, 207, 255, .28);

          border-radius: 50%;

          transform:
            translate(-50%, -50%)
            rotateX(65deg)
            rotateZ(15deg);

          animation:
            orbitRotate
            8s
            linear
            infinite;
        }

        .orbit-2 {
          width: 330px;
          height: 145px;

          transform:
            translate(-50%, -50%)
            rotateX(65deg)
            rotateZ(-25deg);

          animation-duration: 10s;
          animation-direction: reverse;
        }

        .orbit-3 {
          width: 410px;
          height: 190px;

          transform:
            translate(-50%, -50%)
            rotateX(65deg)
            rotateZ(55deg);

          opacity: .35;

          animation-duration: 13s;
        }

        .orbit span {
          position: absolute;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #42eaff;

          box-shadow:
            0 0 8px #42eaff,
            0 0 18px #009dff;

          left: 50%;
          top: -3px;
        }

        @keyframes orbitRotate {

          from {
            transform:
              translate(-50%, -50%)
              rotateX(65deg)
              rotateZ(0deg);
          }

          to {
            transform:
              translate(-50%, -50%)
              rotateX(65deg)
              rotateZ(360deg);
          }
        }

        /* =========================================
           PARTICLES
        ========================================= */

        .tooth-particles {
          position: absolute;

          inset: 0;

          pointer-events: none;
        }

        .tooth-particles i {
          position: absolute;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: #7beeff;

          box-shadow:
            0 0 7px #3de5ff,
            0 0 15px rgba(0, 180, 255, .8);

          animation:
            particleFloat
            3s
            ease-in-out
            infinite;
        }

        .tooth-particles i:nth-child(1) {
          left: 15%;
          top: 31%;
          animation-delay: .2s;
        }

        .tooth-particles i:nth-child(2) {
          left: 25%;
          top: 19%;
          animation-delay: 1s;
        }

        .tooth-particles i:nth-child(3) {
          left: 75%;
          top: 22%;
          animation-delay: 1.5s;
        }

        .tooth-particles i:nth-child(4) {
          left: 86%;
          top: 38%;
          animation-delay: .7s;
        }

        .tooth-particles i:nth-child(5) {
          left: 13%;
          top: 52%;
          animation-delay: 2s;
        }

        .tooth-particles i:nth-child(6) {
          left: 90%;
          top: 57%;
          animation-delay: .5s;
        }

        .tooth-particles i:nth-child(7) {
          left: 20%;
          top: 69%;
          animation-delay: 1.8s;
        }

        .tooth-particles i:nth-child(8) {
          left: 82%;
          top: 71%;
          animation-delay: 1.1s;
        }

        .tooth-particles i:nth-child(9) {
          left: 32%;
          top: 10%;
          animation-delay: .4s;
        }

        .tooth-particles i:nth-child(10) {
          left: 69%;
          top: 12%;
          animation-delay: 2.3s;
        }

        .tooth-particles i:nth-child(11) {
          left: 7%;
          top: 42%;
          animation-delay: 1.3s;
        }

        .tooth-particles i:nth-child(12) {
          left: 94%;
          top: 29%;
          animation-delay: 2.1s;
        }

        @keyframes particleFloat {

          0%,
          100% {
            transform:
              translateY(10px)
              scale(.7);

            opacity: .2;
          }

          50% {
            transform:
              translateY(-22px)
              scale(1.5);

            opacity: 1;
          }
        }

        /* =========================================
           PLATFORM
        ========================================= */

        .tooth-platform {
          position: absolute;

          bottom: 36px;
          left: 50%;

          width: 300px;
          height: 95px;

          transform:
            translateX(-50%)
            perspective(300px)
            rotateX(60deg);

          border-radius: 50%;
        }

        .platform-ring {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          border:
            1px solid
            rgba(45, 220, 255, .4);

          animation:
            platformPulse
            2.5s
            ease-in-out
            infinite;
        }

        .platform-ring-1 {
          width: 110px;
          height: 42px;
        }

        .platform-ring-2 {
          width: 190px;
          height: 65px;

          opacity: .55;

          animation-delay: .4s;
        }

        .platform-ring-3 {
          width: 285px;
          height: 90px;

          opacity: .25;

          animation-delay: .8s;
        }

        @keyframes platformPulse {

          0%,
          100% {
            transform:
              translate(-50%, -50%)
              scale(.9);

            opacity: .25;
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(1.08);

            opacity: .9;
          }
        }

        .platform-core {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 18px;
          height: 18px;

          transform:
            translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              white 0%,
              #42eaff 30%,
              #009dff 55%,
              transparent 75%
            );

          box-shadow:
            0 0 12px #42eaff,
            0 0 35px #009dff,
            0 0 70px rgba(0, 180, 255, .8);

          animation:
            corePulse
            2s
            ease-in-out
            infinite;
        }

        @keyframes corePulse {

          0%,
          100% {
            transform:
              translate(-50%, -50%)
              scale(.8);

            opacity: .7;
          }

          50% {
            transform:
              translate(-50%, -50%)
              scale(1.5);

            opacity: 1;
          }
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 900px) {

          .animated-tooth-scene {
            transform: scale(.8);
          }

        }

        @media (max-width: 600px) {

          .animated-tooth-scene {
            transform: scale(.65);
          }

        }

      `}</style>
    </>
  );
}