export const getCommentCreatorAnimation = () => ({
  initial: {
    height: 0,
    width: 0,
    opacity: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
  },
  animate: {
    height: 260,
    width: 320,
    opacity: 1,
    translateY: 0,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
  },
  exit: {
    height: 0,
    width: 0,
    opacity: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
  },
  transition: {
    duration: 0.1,
  },
});
