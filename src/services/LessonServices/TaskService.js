import $api from "../../api";
import {
    addTaskToExistingBlock,
    addTaskToNewBlock, removeBlock,
    removeTaskFromBlock,
    removeUserInputBlock,
} from "../../store/reducers/lessonSlice";

export default class TaskService {

    static addTask = (task, lastBlockUserInputIsEmpty, blockId) => async dispatch => {
        try {
            if (lastBlockUserInputIsEmpty) {
                // post
                dispatch(addTaskToExistingBlock({task, blockId}))
            } else {
                // post newBlock
                const newBlockId = Date.now()
                dispatch(addTaskToNewBlock({task, blockId: newBlockId}))
            }

        } catch (e) {
            console.log(e)
        }
    }
    static removeTask = (block) => async dispatch => {
        try {
            // del

            dispatch(removeTaskFromBlock(block.blockId))

            if (block.messages.length === 0) {
                console.log('block is empty')
                dispatch(removeBlock(block.blockId))
            }
        }
        catch (e) {
            
        }
    }
    static editTask = async (task, blockId) =>  {
        try {
            const taskFromServer = await {...task, blockId}
            return taskFromServer
        }
        catch (e) {

        }

    }
}