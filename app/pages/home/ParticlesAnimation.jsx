import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesAnimation = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <>
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0"
          particlesLoaded={particlesLoaded}
          options={{
            fullScreen: { enable: false, zIndex: 0 },
            background: { color: { value: "transparent" } },
            particles: {
              size: {
                value: { min: 0.7, max: 1.1 }, // 👈 This controls the particle size range
                animation: {
                  enable: true, // set true if you want particles to "pulse" in size
                  speed: 2,      // pulsing speed
                  minimumValue: 1,
                  sync: false,   // false = each particle pulses individually
                },
              },
              number: { value: 100 },
              color: { value: "#ffffff" },
              shape: { type: "star" },
              opacity: {
                value: { min: 0.1, max: 0.8 },
                animation: {
                  enable: true,
                  speed: 0.4,
                  minimumValue: 0.3,
                  sync: false, // each particle glows independently
                },
              },
              move: {
                enable: true,
                speed: 0.3,
                direction: "none",
                random: true,
                straight: false,
                outModes: { default: "out" },
              },
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
              },
              modes: {
                repulse: { distance: 100 },
                push: { quantity: 2 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
};

export default ParticlesAnimation;
