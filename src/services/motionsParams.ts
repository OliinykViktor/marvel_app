import { MotionParams } from "../types/commonTypes";

const motionParams: MotionParams = {
    initial: { opacity: 0, transform: 'scale(.5)', transformOrigin: 'center left' },
    animate: { opacity: 1, transform: 'scale(1)' },
    exit: { opacity: 0, transform: 'scale(.5)', transformOrigin: 'center right' },
    transition: { duration: 0.3 },
  };
  
  export default motionParams;
  