import { useEffect, useRef } from 'react';
import $ from 'jquery';
import './BoostersParticles.css';

const BoostersParticles = ({name}) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0, active: false };
    const points = [];
    const speedRange = [0.3, 0.7];
    const maxDistance = 140;
    let width = 0;
    let height = 0;
    let rafId = null;

    const createPoint = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (speedRange[0] + Math.random() * speedRange[1]),
      vy: (Math.random() - 0.5) * (speedRange[0] + Math.random() * speedRange[1]),
      radius: 3 + Math.random() * 2.5,
    });

    const rebuild = () => {
      points.length = 0;
      const count = Math.max(60, Math.round(width / 18));
      for (let i = 0; i < count; i += 1) {
        points.push(createPoint());
      }
    };

    const resize = () => {
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      canvas.width = width;
      canvas.height = height;
      rebuild();
    };

    const update = () => {
      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x <= 0 || point.x >= width) {
          point.vx *= -1;
        }
        if (point.y <= 0 || point.y >= height) {
          point.vy *= -1;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistance * maxDistance) {
            const opacity = 1 - Math.sqrt(distSq) / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.45})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      for (const point of points) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.active) {
        for (const point of points) {
          const dx = point.x - mouse.x;
          const dy = point.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistance * maxDistance) {
            const opacity = 1 - Math.sqrt(distSq) / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.65})`;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      update();
      draw();
      rafId = requestAnimationFrame(loop);
    };

    const $wrapper = $(wrapper);
    const handleMove = event => {
      const rect = wrapper.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active = true;
    };
    const handleLeave = () => {
      mouse.active = false;
    };

    $wrapper.on('mousemove', handleMove);
    $wrapper.on('mouseleave', handleLeave);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    resize();
    loop();

    return () => {
      $wrapper.off('mousemove', handleMove);
      $wrapper.off('mouseleave', handleLeave);
      resizeObserver.disconnect();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div className="boosters-particles" ref={wrapperRef} aria-hidden="true">
      <canvas ref={canvasRef} className="boosters-particles__canvas" />
      <div className="boosters-particles__headline">{name}</div>
    </div>
  );
};

export default BoostersParticles;
