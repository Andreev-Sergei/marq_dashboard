import $api from "../../api";
import {
    addMessageToExisingBlock,
    addMessageToNewBlock,
    editMessage, moveMessage,
    removeBlock,
    removeMessage,
} from "../../store/reducers/lessonSlice";

export default class MessageService {
    static addMessage = (messageItem, addWithNewBlock, blockId) => async (dispatch) => {
        const message = {
            ...messageItem,
            id: Date.now()
        }
        try {
            if (addWithNewBlock) {
                // post
                dispatch(addMessageToNewBlock({message, blockId: Date.now()}))
            } else {
                // post
                dispatch(addMessageToExisingBlock({message, blockId}))
            }
        } catch (e) {
            console.log(e)
        }
    }
    static removeMessage = (removeBlockBool, blockId, messageId) => async dispatch => {
        try {
            if (removeBlockBool) {
                // delete block
                dispatch(removeBlock(blockId))
            } else {
                // delete only message
                dispatch(removeMessage({messageId, blockId}))
            }
        } catch (e) {
            console.log(e)
        }
    }
    static editMessage = (message, blockId) => async dispatch => {
        try {

            // put
            dispatch(editMessage({message, blockId}))
        } catch (e) {
            console.log(e)
        }
    }

    static moveMessage = (message, fromBlock, toBlock, parentBlockId, deleteParentBlock ) => async dispatch => {
        try {
            // put
            dispatch(moveMessage({message, fromBlock, toBlock}))
            if (deleteParentBlock && parentBlockId) {
                dispatch(removeBlock(parentBlockId))
            }
        } catch (e) {
            console.log(e)
        }
    }
}