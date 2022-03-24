import React from 'react';
import {Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addChatItem} from "../../store/reducers/lessonSlice";
import {taskBankArray} from "../../helpers/constants";

const taskBankA = [
    {id: 1, title: 'Input'},
    {id: 2, title: 'insertion'},
    {id: 3, title: 'Matching'},
    {id: 4, title: 'Listening'},
    {id: 5, title: 'Listening + insertion'},
    {id: 6, title: 'No correct answer'},
    {id: 7, title: 'Question'}
]


const TaskBank = () => {
    const dispatch = useDispatch()
    const addTask = ({constantName, title}) => {
        dispatch(addChatItem({
            id: + Date.now(),
            type: 'TASK',
            typeTitle: title,
            taskType: constantName,
            value: '',
            isNew: true,
        }))
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