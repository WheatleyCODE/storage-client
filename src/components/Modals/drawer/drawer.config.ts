export const drawerConfig = {
  right: {
    initial: {
      translateX: 400,
      borderRadius: '10% 0 0 10%',
    },
    exit: {
      translateX: 400,
      borderRadius: '10% 0 0 10%',
    },
    animate: { translateX: 0, borderRadius: 0 },
  },

  left: {
    initial: {
      translateX: -400,
      borderRadius: '0 10% 10% 0',
    },
    exit: {
      translateX: -400,
      borderRadius: '0 10% 10% 0',
    },
    animate: { translateX: 0, borderRadius: 0 },
  },

  top: {
    initial: {
      translateY: -400,
    },
    exit: {
      translateY: -400,
    },
    animate: { translateY: 0 },
  },

  bottom: {
    initial: {
      translateY: 400,
    },
    exit: {
      translateY: 400,
    },
    animate: { translateY: 0 },
  },
};
