import $api from "../../api";
import {
    addTaskToExistingBlock,
    addTaskToNewBlock,
    removeBlock,
    removeTaskFromBlock,
} from "../../store/reducers/lessonSlice";
import {taskBankArray} from "../../helpers/constants";
import {addTask, removeTask} from "../../store/reducers/HomeworkSlice";

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
    static addHomeworkTask = (exerciseId, lessonId, keyboardType, taskType) => async dispatch => {
        try {
            const task = {
                type: 'TASK',
                typeTitle: taskBankArray.find(x => x.constantName === taskType).title,
                taskType: taskType,
                value: '',
            }
            const {data} = await $api.post(`/dashboard/homework-board`,
                task,
                {
                    params: {lessonId, exerciseId},
                },
            )
            dispatch(addTask(data.task))
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
    static removeHomeworkTask = (taskId, exerciseId, lessonId) => async dispatch => {
        try {
            // del

            dispatch(removeTask(taskId))
        }
        catch (e) {

        }
    }
    static editTask = async (task, blockId, lessonId, isHomework, exerciseId) => {
        try {

            const taskFromServer = {task, blockId, lessonId: Number(lessonId), isHomework, exerciseId}
            return taskFromServer
        }
        catch (e) {

        }

    }
}