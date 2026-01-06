import { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'jquery.ripples';
import './WaterTherapy.css';

const WaterTherapy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !$.fn.ripples) {
      return undefined;
    }

    const $container = $(container);
    $container.ripples({
      resolution: 512,
      dropRadius: 36,
      perturbance: 0.04,
    });

    let rafId = null;
    let lastDropAt = 0;
    const handlePointerMove = event => {
      const now = Date.now();
      if (rafId || now - lastDropAt < 120) {
        return;
      }
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      rafId = requestAnimationFrame(() => {
        $container.ripples('drop', x, y, 10, -0.07);
        lastDropAt = Date.now();
        rafId = null;
      });
    };

    container.addEventListener('mousemove', handlePointerMove);

    // const dropInterval = setInterval(() => {
    //   const width = $container.outerWidth();
    //   const height = $container.outerHeight();
    //   if (!width || !height) {
    //     return;
    //   }
    //   const x = Math.random() * width;
    //   const y = Math.random() * height;
    //   $container.ripples('drop', x, y, 14, 0.04);
    // }, 5800);

    return () => {
      container.removeEventListener('mousemove', handlePointerMove);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    //   clearInterval(dropInterval);
      try {
        $container.ripples('destroy');
      } catch (error) {
        // Ignore teardown errors from the plugin.
      }
    };
  }, []);

  return (
    <section className="water-therapy" ref={containerRef}>
      <div className="water-therapy__content">
        <span className="water-therapy__eyebrow">Water Therapy</span>
        <h2 className="water-therapy__title">Flow into healing with calming aquatic care</h2>
        <p className="water-therapy__copy">
          Our hydro-therapy protocols pair detox-guided mineral immersion with respiratory pacing to help reset stress
          pathways and circulation.
        </p>
        <button type="button" className="water-therapy__cta">
          Explore Water Therapy
        </button>
      </div>
    </section>
  );
};

export default WaterTherapy;
