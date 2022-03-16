import React from 'react';
import {Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addChatItem} from "../../store/reducers/lessonSlice";

export const taskBank = [
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
    const addTask = (element) => {
        console.log(element)
        dispatch(addChatItem({
            id: + Date.now(),
            type: 'TASK',
            typeTitle: element.title,
            taskType: element.title.toUpperCase(),
            value: '',
            isNew: true
        }))
    }

    return (
        <div>
            {taskBank.map((element:{id:number, title:string}, i:number) => {
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