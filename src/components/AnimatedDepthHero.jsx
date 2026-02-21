import React from 'react'
import { useEffect } from 'react'
import $ from "jquery";
import "./AnimatedDepthHero.css"
import EyeFollowWord from "./EyeFollowWord";

const AnimatedDepthHero = ({ variant = "full" }) => {
    useEffect(() => {
    const $items = $(".depth-text");
    let rafId;

    const animate = () => {
      const time = Date.now() * 0.001;

      $items.each(function (i) {
        const depth = Number($(this).data("depth"));
        const phase = time + i * 1.4;

        const y = Math.sin(phase) * (8 + depth * 6);
        const blur = Math.abs(Math.sin(phase)) * depth * 2;
        const opacity = 1 - depth * 0.18 - Math.abs(Math.sin(phase)) * 0.15;

        // Apply styles directly (GPU-friendly)
        $(this).css({
          transform: `translateY(${y}px)`,
          filter: `blur(${blur}px)`,
          opacity
        });
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, []);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (onClose) {
  //     onClose();
  //   }
  //   navigate("/");
  // };

  // const handleSkip = () => {
  //   if (onClose) {
  //     onClose();
  //   }
  //   navigate("/");
  // };

  return (
    <div className={`depth-scene ${variant === "section" ? "depth-scene--section" : ""}`}>
     <div className='depth-background'/>

     <div className='depth-text-layer'>
          <span className="depth-text" data-depth="1" style={{ top: "18%", left: "12%" }}>
          Cell Reprogramming
        </span>
        <span className="depth-text" data-depth="2" style={{ top: "32%", left: "72%" }}>
          Oxidative Stress
        </span>
        <span className="depth-text" data-depth="3" style={{ top: "50%", left: "28%" }}>
          CRISPR-Cas9
        </span>
        <span className="depth-text" data-depth="2" style={{ top: "68%", left: "60%" }}>
          Cellular Senescence
        </span>
        <span className="depth-text" data-depth="1" style={{ top: "78%", left: "18%" }}>
          Immune Signaling
        </span>



          <span className="depth-text" data-depth="3" style={{ top: "28%", left: "22%" }}>
          Cell Reprogramming
        </span>
        <span className="depth-text" data-depth="2" style={{ top: "30%", left: "52%" }}>
          Oxidative Stress
        </span>
        <span className="depth-text" data-depth="3" style={{ top: "60%", left: "18%" }}>
          CRISPR-Cas9
        </span>
        <span className="depth-text" data-depth="2" style={{ top: "20%", left: "60%" }}>
          Cellular Senescence
        </span>
        <span className="depth-text" data-depth="1" style={{ top: "98%", left: "18%" }}>
          Immune Signaling
        </span>

        <span className="depth-text" data-depth="2" style={{ top: "10%", left: "58%" }}>
          Natural Immunotherapy
        </span>
        <span className="depth-text" data-depth="1" style={{ top: "14%", left: "30%" }}>
          Cellular Intelligence
        </span>
        <span className="depth-text" data-depth="3" style={{ top: "22%", left: "78%" }}>
          Nutrient Signaling
        </span>
        <span className="depth-text" data-depth="2" style={{ top: "70%", left: "8%" }}>
          Detoxification Pathways
        </span>
        <span className="depth-text" data-depth="1" style={{ top: "86%", left: "62%" }}>
          Immune Balance
        </span>
        <span className="depth-text" data-depth="3" style={{ top: "90%", left: "34%" }}>
          Micronutrient Repair
        </span>
     </div>

     <div className="depth-center-title">
      <span className="depth-center-title-text">About NIT</span>
      <EyeFollowWord className="depth-center-eye !px-0 !py-0 bg-transparent" ariaLabel="Health monitoring eyes" />
     </div>

    </div>
  )
}

export default AnimatedDepthHero
