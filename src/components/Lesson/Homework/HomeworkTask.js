import React from 'react';
import LessonTaskWrapper from "../Task/Task";
import {taskBankArray} from "../../../helpers/constants";
import {useSelector} from "react-redux";

const HomeworkTask = ({task}) => {

    const {exercise: exe} = useSelector(state => state.homework)

    const homeWorkTask = {
        ...task,
        taskType: exe.typeOfTask,
        typeTitle: taskBankArray.find(x => x.constantName === exe.typeOfTask)?.title,
        keyboardType: exe?.keyboardType
    }


    return <div className={"me-4"}> <LessonTaskWrapper isHomeWork item={homeWorkTask}/></div>

};

export default HomeworkTask;