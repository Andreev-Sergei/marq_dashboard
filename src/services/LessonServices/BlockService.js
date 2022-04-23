import {swapBlocks} from "../../store/reducers/lessonSlice";

export default class BlockService {

    static swapBlocks = (obj, sub) => async (dispatch) => {
        try {
            // put
            dispatch(swapBlocks({obj, sub}))
        } catch (e) {
           console.log(e)
        }
    }
}