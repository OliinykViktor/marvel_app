import { MotionParams } from "../types/commonTypes";

const motionListParams: MotionParams =  {
    initial:{
        opacity: 0,
        transform: "scale(.7)"
    },
    animate:{
        opacity: 1,
        transform: "scale(1)",
        transition: {
            duration: .5,
        }
    }
};

export default motionListParams;