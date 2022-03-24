import {forEach} from "react-bootstrap/ElementChildren";

export const keyboardTypesForTask = [
    {id: 1, title: 'Choice 1 of 2 variants'},
    {id: 2, title: 'Choice 1 of 4 variants'},
    {id: 3, title: 'Sentence creation using the prompts'},
    {id: 4, title: 'All letters keyboard'},
    {id: 5, title: 'Highlighted keyboard'},
]
export const taskBank = {
    INPUT: 'INPUT',
    INSERTION: 'INSERTION',
    MATCHING: 'MATCHING',
    LISTENING: 'LISTENING',
    LISTENING_INSERTION: 'LISTENING_INSERTION',
    NO_ANSWER: 'NO_ANSWER',
    QUESTION: 'QUESTION'
}

export const taskBankArray = [
    {id: 1, title: 'Input', constantName: taskBank.INPUT},
    {id: 2, title: 'insertion', constantName: taskBank.INSERTION},
    {id: 3, title: 'Matching', constantName: taskBank.MATCHING},
    {id: 4, title: 'Listening', constantName: taskBank.LISTENING},
    {id: 5, title: 'Listening + insertion', constantName: taskBank.LISTENING_INSERTION},
    {id: 6, title: 'No correct answer', constantName: taskBank.NO_ANSWER},
    {id: 7, title: 'Question', constantName: taskBank.QUESTION}
]

export const getKeyboardArrayByTaskType = TYPE => {
    let saveList
    switch (TYPE) {
        case taskBank.INSERTION:
            saveList = [1,2,4,5]
            break
        case taskBank.NO_ANSWER:
            saveList = [1,2,4]
            break
        default:
            saveList = [1,2,3,4,5]
            break
    }
    console.log(saveList)
    return  keyboardTypesForTask.filter(task => saveList.includes(task.id))
}