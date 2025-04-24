export const infinityScroll = {
  hidden: {
    x: "0",
  },
  visible: {
    x: "-100%",
    transition: {
      duration: 30,
      repeat: Infinity,
      repeatType: "loop",
      ease: "linear",
    },
  },
  stop: {
    x: "-100%",
    transition: {
      duration: 0,
    },
  },
};

export const slideShow = {
  hidden: (direction) => {
    return {
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    };
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "ease",
    },
  },
  exit: (direction) => {
    return {
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      transition: {
        type: "ease",
      },
    };
  },
};

export const slideLeft = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.2,
      delayChildren: 0.1,
      ease: "linear",
    },
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.4,
      ease: "linear",
    },
  },
};

export const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.2,
      delayChildren: 0.1,
      ease: "linear",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "linear",
    },
  },
};

export const zoomOut = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
      ease: "linear",
    },
  },
  exit: {
    scale: 0,
    duration: 0.3,
  },
};

export const slideBottom = {
  hidden: {
    maxHeight: 0,
    opacity: 0,
  },
  visible: {
    maxHeight: 900,
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.2,
      delayChildren: 0.1,
      ease: "linear",
    },
  },
  exit: {
    maxHeight: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "linear",
    },
  },
};

export const slideTop = {
  hidden: {
    y: "100%",
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.2,
      delayChildren: 0.1,
      ease: "linear",
    },
  },
  exit: {
    y: 0,
    transition: {
      duration: 0.4,
      ease: "linear",
    },
  },
};
