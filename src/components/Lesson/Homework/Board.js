import React, {useEffect} from 'react';
import {Card} from "react-bootstrap";
import HomeworkTask from "./HomeworkTask";
import {keyboardTypesForTask, taskBank} from "../../../helpers/constants";
import {useDispatch, useSelector} from "react-redux";
import {setBoard} from "../../../store/reducers/HomeworkSlice";

const exerciseBoard = {
    typeOfTask: taskBank.INPUT,
    keyboardType: keyboardTypesForTask.find(x => x.id === 5).id,
    board: [
        {
            id: 32,
            variants: [
                {id: 1, word: 'собака', right: true},
                {id: 2, word: 'кошка', right: false}
            ],
            value: 'Dog - <i>собака</i>'
        },
        {
            id: 22,
            variants: [
                {id: 1, word: 'кошка', right: true},
                {id: 2, word: 'собака', right: false}
            ],
            value: 'Cat - <i>кошка</i>'
        },

    ]
}
const Board = () => {
    const {exercise: exe, board} = useSelector(state => state.homework)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchExeBoard = async () => {
            try {
                dispatch(setBoard((exe === 'NEW') ? null : exerciseBoard.board))
            } catch (e) {
                console.log(e)
            }
        }
        fetchExeBoard()
        return () => {
        }
    }, [exe])

    return (
        <Card className={"mx-1 me-5 p-3 "}>
            <div className={"d-flex justify-content-evenly"}>
                {board ? board?.map(task => <HomeworkTask   key={task.id}
                                                            keyboardType={exe?.keyboardType}
                                                            typeOfTask={exe?.typeOfTask}
                                                            task={task} />
                ): <p className={"p-2 pb-0"}>Create exercise in the form above</p>}
            </div>
        </Card>
    );
};

export default Board;