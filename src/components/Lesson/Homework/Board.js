import React, {useEffect} from 'react';
import {Button, Card} from "react-bootstrap";
import HomeworkTask from "./HomeworkTask";
import {useDispatch, useSelector} from "react-redux";
import TaskService from "../../../services/LessonServices/TaskService";
import LessonService from "../../../services/LessonServices/LessonService";


const Board = () => {
    const {exercise: exe, board} = useSelector(state => state.homework)
    const {lessonId} = useSelector(state => state.lesson)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchExeBoard = async () => {
            try {
                if (lessonId && exe?.id){
                dispatch(LessonService.fetchHomeworkBoard(exe?.id, lessonId))
                }
            } catch (e) {
                console.log(e)
            }
        }
        fetchExeBoard()
        return () => {
        }
    }, [exe?.id])

    const addHomeworkItem = () => {
        dispatch(TaskService.addHomeworkTask(exe.id, + lessonId, exe?.keyboardType, exe?.typeOfTask))
    }
    return (
        <Card className={"mx-1 me-5 p-3"}>
            {exe &&
            <Button
                style={{maxWidth: 200}}
                className={"mb-1"}
                size={'sm'}
                onClick={addHomeworkItem}
            > add Item</Button>}
            <hr/>
            <div className={"d-flex justify-content-start flex-wrap pt-1"} style={{gridTemplateColumns: '1fr 1fr', gridRowGap: 20}}>
            {exe !== null && board?.map(task => <HomeworkTask   key={task.id}
                                                            keyboardType={exe?.keyboardType}
                                                            typeOfTask={exe?.typeOfTask}
                                                            task={task} />)}

            </div>
            {exe === null && <p className={"p-2 pb-0"}>Create exercise in the form above</p>}
            {exe !== null && board.length === 0 && <p className={"p-2 pb-0"}>Exercise is empty, add new task </p>}
        </Card>
    );
};

export default Board;