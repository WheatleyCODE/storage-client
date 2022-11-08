export const getDrawerConfig = (open: 'right' | 'left' | 'top' | 'bottom', width: number) => {
  const drawerConfig = {
    right: {
      initial: {
        translateX: width,
        borderRadius: '10% 0 0 10%',
      },
      exit: {
        translateX: width,
        borderRadius: '10% 0 0 10%',
      },
      animate: { translateX: 0, borderRadius: 0 },
    },

    left: {
      initial: {
        translateX: -width,
        borderRadius: '0 10% 10% 0',
      },
      exit: {
        translateX: -width,
        borderRadius: '0 10% 10% 0',
      },
      animate: { translateX: 0, borderRadius: 0 },
    },

    top: {
      initial: {
        translateY: -width,
      },
      exit: {
        translateY: -width,
      },
      animate: { translateY: 0 },
    },

    bottom: {
      initial: {
        translateY: width,
      },
      exit: {
        translateY: width,
      },
      animate: { translateY: 0 },
    },
  };

  return drawerConfig[open];
};
