import {createSlice} from '@reduxjs/toolkit'
import board from "../../components/Lesson/Homework/Board";

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState: {
        lessonId: null,
        lessonTitle: '',
        pLang: {},
        pCourse: {},
        board: [],
        editChatItem: null,
        reviewed: false,
        loading: true
    },
    reducers: {
        setLoading: (state, action) => {
            return {
                ...state, loading: action.payload
            }
        },
        setLesson: (state, action) => {
            return {
                ...state,
                lessonId: action.payload.lessonId,
                lessonTitle: action.payload.lessonTitle,
                board: [...action.payload.board.reverse()],
                lessonName: action.payload.lessonName,
                review: action.payload.review,
                pCourse: {
                    title: action.payload.pCourseTitle,
                    id: action.payload.pCourseId
                },
                pLang:
                    {
                        title: action.payload.pLangTitle,
                        id: action.payload.pLangId
                    }
            }

        },
        // messages
        addMessageToNewBlock: (state, action) => {
            console.log('add message with new block', action.payload)
            return {
                ...state,
                board: [{blockId: action.payload.blockId, messages: [action.payload.message], userInput: null}, ...state.board]
            }
        },
        addMessageToExisingBlock: (state, action) => {
            console.log('add message to existing block', action.payload)
            return {
                ...state,
                board: [...state.board.map(block => (block.blockId === action.payload.blockId)
                    ? {...block, messages: [...block.messages, action.payload.message]}
                    : block
                )]
            }
        },
        removeMessage: (state, action) => {
            console.log('remove message', action.payload)
            return {
                ...state,
                board: [...state.board.map((block) => {
                    const actualBlock = block.blockId === action.payload.blockId
                    if (actualBlock && block.messages.length === 1) {
                        return {
                            ...block, messages: []
                        }
                    } else if (actualBlock) {
                        return {
                            ...block,
                            messages: block.messages.filter(message => message.id !== action.payload.messageId)
                        }
                    } else return block

                })]
            }
        },
        setEditMessage: (state, action) => {
            console.log('set message to edit', action.payload)
            return {
                ...state,
                editChatItem: {message: action.payload.message, blockId: action.payload.blockId}
            }
        },
        cancelMessageEdit: (state, action) => {
            console.log('cancel message edit')
            return {
                ...state,
                editChatItem: null
            }
        },
        editMessage: (state, action) => {
            console.log('edit message', action.payload)
            return {
                ...state,
                editChatItem: null,
                board: [...state.board.map((block) => {
                    const actualBlock = block.blockId === action.payload.blockId
                    return actualBlock
                        ? {
                            ...block,
                            messages: block.messages.map(message => message.id === action.payload.message.id
                                ? action.payload.message
                                : message
                            )
                        }
                        : block
                })]
            }
        },
        moveMessage: (state, action) => {
            console.log('move message id', action.payload.message.id)
            console.log('from block id', action.payload.fromBlock)
            console.log('to block id', action.payload.toBlock)
            console.log('message: ', action.payload.message)
            return {
                ...state,
                board: [...state.board.map(block => {
                    if (block.blockId === action.payload.fromBlock) {
                        return {
                            ...block,
                            messages: block.messages.filter(msg => msg.id !== action.payload.message.id)
                        }
                    }
                    if (block.blockId === action.payload.toBlock) {
                        return  {
                            ...block, messages: [...block.messages, action.payload.message]
                        }
                    }
                    return block
                })]
            }
        },
        // tasks
        addTaskToExistingBlock: (state, action) => {
            console.log('existing block id:', action.payload.blockId)
            console.log('task:', action.payload.task)
            return {
                ...state,
                board: [...state.board.map(block => (block.blockId === action.payload.blockId)
                    ? {...block, userInput: action.payload.task}
                    : block
                )]
            }
        },
        addTaskToNewBlock: (state, action) => {
            console.log('new block id:', action.payload.blockId)
            console.log('task:', action.payload.task)
            return {
                ...state,
                board: [{blockId: action.payload.blockId, messages: [], userInput: action.payload.task}, ...state.board]
            }
        },
        removeBlock: (state, action) => {
            console.log('remove blockId', action.payload)
            return {...state, board: [...state.board.filter(block => block.blockId !== action.payload)]}
        },
        swapBlocks: (state, action) => {
            console.log('swap block id:', action.payload.obj.blockId)
            console.log('with block id:', action.payload.sub.blockId)
            return {
                ...state,
                board: [...state.board.map(block => {
                    if (action.payload.obj.blockId === block.blockId) {
                        return {
                            ...action.payload.sub,
                            order: block.order
                        }
                    }
                    if (action.payload.sub.blockId === block.blockId) {
                        return {
                            ...action.payload.obj,
                            order: block.order
                        }
                    }
                    return block
                })]
            }
        },
        removeTaskFromBlock: (state, action) => {
            console.log("remove Task from blockId", action.payload)
            return {
                ...state,
                board: [...state.board.map(block => {
                    if (block.blockId === action.payload) {
                        return  {
                            ...block,
                            userInput: null
                        }
                    } else return block
                })]
            }
        },
        setReviewed: (state, action) => {
            return {
                ...state,
                reviewed: true
            }
        },
    },
})

export const {
    setLoading, // loading
    setLesson,
    addMessageToNewBlock,
    addMessageToExisingBlock,
    removeMessage,
    editMessage, // edit message
    setEditMessage, // set message to edit in textarea
    cancelMessageEdit, // unset message to edition
    editChatItem,
    setReviewed,
    addTaskToExistingBlock,
    addTaskToNewBlock,
    removeBlock,
    swapBlocks,
    removeTaskFromBlock,
    moveMessage,
} = lessonSlice.actions

export default lessonSlice.reducer