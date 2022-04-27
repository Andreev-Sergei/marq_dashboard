import React from 'react';
import {Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {taskBankArray} from "../../helpers/constants";
import TaskService from "../../services/LessonServices/TaskService";


const TaskBank = () => {
    const dispatch = useDispatch()
    const {board} = useSelector(state => state.lesson)

    const addTask = ({constantName, title}) => {

        const task = {
            type: 'TASK',
            typeTitle: title,
            taskType: constantName,
            value: '',
            isNew: true,
        }
        const lastBlock = board[0]

        dispatch(TaskService.addTask(task, lastBlock.userInput === null, lastBlock.blockId))

    }

    return (
        <div>
            {taskBankArray.map((element:{id:number, title :string}, i:number) => {
                return <Card key={'task_'+ element.id}
                             className="task m-1 py-2 text-center"
                             role={"button"}
                             onClick={() => addTask(element)}
                >
                    {element.title}
                </Card>
            })}
        </div>
    );
};

export default TaskBank;