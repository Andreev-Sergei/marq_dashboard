import React, {useState} from 'react';
import {Card} from "react-bootstrap";
import TextArea from "../Task/TaskElements/TextArea";
import LessonTaskWrapper from "../Task/Task";
import {keyboardTypesForTask, taskBankArray} from "../../../helpers/constants";
import {useSelector} from "react-redux";

const HomeworkTask = ({task}) => {

    const {exercise: exe} = useSelector(state => state.homework)

    const homeWorkTask = {
        ...task,
        taskType: exe.typeOfTask,
        typeTitle: taskBankArray.find(x => x.constantName === exe.typeOfTask)?.title,
        keyboardType: exe?.keyboardType
    }


    return <LessonTaskWrapper isHomeWork item={homeWorkTask}/>

};

export default HomeworkTask;