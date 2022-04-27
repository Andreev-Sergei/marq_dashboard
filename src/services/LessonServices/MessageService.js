import $api from "../../api";
import {
    addMessageToExisingBlock,
    addMessageToNewBlock,
    editMessage,
    moveMessage,
    removeBlock,
    removeMessage,
} from "../../store/reducers/lessonSlice";
import {msgTypes} from "../../helpers/constants";

const uploadFile = async (file,lessonId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("lessonId", lessonId);
    const {data} = await $api.post(`/dashboard/upload`, formData)
    return data
}
export default class MessageService {
    static addMessage = (lessonId, messageItem, addWithNewBlock, blockId) => async (dispatch) => {
        try {
            let messageImageItem = null
            if (messageItem.messageType === msgTypes.IMAGE) {
                let uploadedFile = await uploadFile(messageItem.value, lessonId)
                messageImageItem = {
                                    ...messageItem,
                                    value: uploadedFile.url
                                    }
            }
            const {data} = await $api.post(`/dashboard/lesson/message`,
                messageImageItem || messageItem,
                {
                    params: {blockId: addWithNewBlock ? null : blockId, lessonId},
                },
            )
            const item = {message: data.message, blockId: +data?.blockId}

            if (addWithNewBlock) {
                dispatch(addMessageToNewBlock(item))
            } else {
                dispatch(addMessageToExisingBlock(item))
            }
        } catch (e) {
            console.log(e)
        }

    }
    static editMessage = (message, lessonId, blockId) => async dispatch => {
        try {
            const {data: messageFromServer} = await $api.put(`/dashboard/lesson/${lessonId}/message`,
                message,
                {params: {blockId}}
            )
            const item = {message: messageFromServer, blockId}
            dispatch(editMessage(item))
        } catch (e) {
            console.log(e)
        }
    }

    static removeMessage = (removeBlockBool, blockId, messageId) => async dispatch => {
        try {
            const {data: serverMessageId} = await $api.delete(`/dashboard/lesson/message`, {params: {id: messageId}})
            if (removeBlockBool) {
                // delete block
                dispatch(removeBlock(blockId))
            } else {
                // delete only message
                dispatch(removeMessage({messageId: +serverMessageId, blockId}))
            }
        } catch (e) {
            console.log(e)
        }
    }

    static moveMessage = (message, fromBlock, toBlock, parentBlockId, deleteParentBlock) => async dispatch => {
        try {
            await $api.patch(`/dashboard/lesson/message`, {
                message,
                fromBlock,
                toBlock
            })
            dispatch(moveMessage({message, fromBlock, toBlock}))
            if (deleteParentBlock && parentBlockId) {
                dispatch(removeBlock(parentBlockId))
            }
        } catch (e) {
            console.log(e)
        }
    }
}