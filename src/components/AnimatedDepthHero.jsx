import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import $ from "jquery";
import "./AnimatedDepthHero.css"

const AnimatedDepthHero = ({ onClose }) => {
  const navigate = useNavigate();


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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onClose) {
      onClose();
    }
    navigate("/");
  };

  const handleSkip = () => {
    if (onClose) {
      onClose();
    }
    navigate("/");
  };

  return (
    <div className='depth-scene'>
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
     </div>


      <div className="depth-card">
        <img className="depth-logo" src="../src/assets/photo/NIT LOGO_1.png" alt="Nit Logo" />
        <p>A newsletter by Dr. Rhonda Patrick, exploring the science of stress resilience, disease prevention, and living a more fulfilled life — rooted in biology and inspired by her podcast.</p>
        <form className="depth-form" onSubmit={handleSubmit}>
          <label className="depth-label" htmlFor="subscribe-email">Email address</label>
          <input
            id="subscribe-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="depth-input"
            required
          />
          <button type="submit" className="depth-primary">Subscribe</button>
        </form>
        <button type="button" className="depth-skip" onClick={handleSkip}>
          No thanks, take me to the homepage
        </button>
      </div>

    </div>
  )
}

export default AnimatedDepthHero
