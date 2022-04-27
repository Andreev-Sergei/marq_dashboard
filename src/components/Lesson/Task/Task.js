import React, {useEffect, useState} from 'react';
import {Button, Card, Form, OverlayTrigger, Popover} from "react-bootstrap";
import {Front, Trash} from "react-bootstrap-icons";
import {useDispatch, useSelector} from "react-redux";
import {getKeyboardArrayByTaskType, keyboardTypesForTask, taskBank, taskBankArray} from "../../../helpers/constants";
import {variantsConstructor} from "../../../helpers";
import Matching from "./TaskTypes/Matching";
import TextArea from "./TaskElements/TextArea";
import SelectKeyboadType from "./TaskElements/SelectKeyboadType";
import Variant from "./TaskElements/Variant";
import TaskService from "../../../services/LessonServices/TaskService";

const getWord = (str) => {
    const word = str.match(/<i[^>]*>([^<]+)<\/i>/)
    if (word) {
        const textWord = word[1]
        return word ? textWord : ''
    }
}


const LessonTaskWrapper = ({item, blockId, isHomeWork}) => {
    const [msg, setMsg] = useState(item.value || ``)
    const [word, setWord] = useState(item?.variants?.find(variant => variant.right == true)?.word || null)
    const [activeKeyboardType, setActiveKeyboardType] = useState(item.keyboardType || keyboardTypesForTask[0].id)
    const [variants, setVariants] = useState(item.variants || variantsConstructor(activeKeyboardType))

    const [edit, setEdit] = useState(false)
    const [itemType, setItemType] = useState({title: item.typeTitle, constantName: item.taskType})
    const [matchingData, setMatchingData] = useState(itemType.constantName === taskBank.MATCHING ? item.variants : null)
    const {board, lessonId} = useSelector(state => state.lesson)
    const [taskDescription, setTaskDescription] = useState(item.description || '')
    const {exercise: exe} = useSelector(state => state.homework)
    const dispatch = useDispatch()
    const keyPress = (event) => {
        if (event.charCode === 13) {
            event.preventDefault()
        }
    }
    const handleInputChange = evt => {
        const value = evt.target.value
        setMsg(value.replaceAll('&nbsp;', ' '));
        if (!item.isNew) {
            setEdit(true)
        }
    };
    const handleRemoveChatItem = async () => {
        if (isHomeWork) {
            dispatch(TaskService.removeHomeworkTask(item.id,  exe.id, lessonId))
        } else {
            dispatch(TaskService.removeTask(board.find(b => b.blockId === blockId)))
        }
        if (!item.isNew) {
            setEdit(true)
        }
    }
    useEffect(() => {
        const currectWord = getWord(msg)
        setWord(currectWord)
    }, [msg])

    useEffect(() => {
        const msgWithReplacedCurrectWord = msg.replace(`<i>${getWord(msg)}</i>`, `<i>${word}</i>`)
        setMsg(msgWithReplacedCurrectWord)
    }, [word])

    const handleChangeKeyboardType = (keyboardTypeId) => {
        setActiveKeyboardType(keyboardTypeId)
        setVariants(variantsConstructor(keyboardTypeId, variants))

        if (!item.isNew) {
            setEdit(true)
        }
    }

    const handleChangeVariant = (variant, value) => {
        if (variant.right) {
            setWord(value)
        } else if (itemType.constantName === taskBank.NO_ANSWER) {
            setVariants([...variants.map(
                    (variantItem) => (variantItem.id === variant.id) ?
                        {...variantItem, word: value} : variantItem
                )]
            )
        } else {
            setVariants([...variants.map(
                    (variantItem) => (variantItem.id === variant.id) ?
                        {...variantItem, word: value} : variantItem
                )]
            )
        }
        if (!item.isNew) {
            setEdit(true)
        }
    }

    const handleDescriptionChange = (value) => {
        setTaskDescription(value)
        if (!item.isNew) {
            setEdit(true)
        }
    }
    const handleChangeTaskType = (type) => {
        if (!item.isNew) {
            setEdit(true)
        }
        setItemType(type)

        document.body.click()
    }
    useEffect(() => {
        if (isHomeWork) {
            setItemType({title: item.typeTitle, constantName: item.taskType})
            setActiveKeyboardType(item.keyboardType)
            setVariants(variantsConstructor(+item.keyboardType, variants))
        }
    }, [item.taskType, item.keyboardType])

    const handleChangeTask = async () => {
        let newWord = word
        const newVariants = variants?.map(variant => variant.right ? {...variant, word: newWord} : {...variant})
        const newTask = {
            id: item.id,
            description: taskDescription,
            taskType: itemType.constantName,
            value: itemType.constantName === taskBank.MATCHING ? null : msg,
            keyboardType: itemType.constantName === taskBank.MATCHING ? null : activeKeyboardType,
            variants: itemType.constantName === taskBank.MATCHING ? matchingData : newVariants,
        }
        const editedTask = await TaskService.editTask(newTask, blockId, lessonId, isHomeWork, exe?.id)
        console.log('changed task', newTask, 'in homework:', isHomeWork)
        setEdit(false)
    }

    const popover = (
        <Popover style={{maxWidth: 338}} id="popover-basic" className={"p-1"}>
            {taskBankArray.filter(x => x.constantName !== itemType.constantName).map(taskType => {
                return (
                    <p role={"button"}
                       key={taskType.constantName}
                       onClick={() => handleChangeTaskType(taskType)}
                       className={"mb-1 p-2"}>
                        {taskType.title}
                    </p>
                )
            })}
        </Popover>
    );

    return (
        <div style={{width: 450}}>
            <Card className={`my-1 py-2 px-2 d-grid`}
                  style={{background: '#F7F7F7', width: 450}}>
                <div>
                    <div className={"d-flex mb-1 py-1 justify-content-between align-items-center"}>
                        <p className={"m-0"}>{itemType.title}</p>
                        <div className="">
                            <Trash className={"mx-2"} role={"button"} onClick={handleRemoveChatItem}/>
                            {!isHomeWork && <OverlayTrigger
                                rootClose trigger={"click"}
                                placement="bottom"
                                overlay={popover}>
                                <Front role={"button"}></Front>
                            </OverlayTrigger>}

                        </div>
                    </div>

                    <Form.Group className="mb-1" controlId="taskDescription">
                        <Form.Control type="text" value={taskDescription}
                                      onChange={e => handleDescriptionChange(e.target.value)}
                                      placeholder="Task description (optional)"/>
                    </Form.Group>

                    {itemType.constantName !== taskBank.MATCHING
                        ?
                        <TextArea msg={msg}
                                  taskType={itemType.constantName}
                                  keyPress={keyPress}
                                  handleInputChange={handleInputChange}
                        />
                        :
                        <Matching matchingData={matchingData} setEdit={setEdit} setMatchingData={setMatchingData}/>
                    }
                </div>
                {itemType.constantName !== taskBank.MATCHING &&
                    <div style={{width: '100%'}}>
                        {!isHomeWork && <SelectKeyboadType activeKeyboardType={activeKeyboardType}
                                                           handleChangeKeyboardType={handleChangeKeyboardType}
                                                           options={getKeyboardArrayByTaskType(itemType.constantName)}
                        />}

                        <div>

                            {variants?.map((variant) => {
                                return <Variant variant={variant}
                                                key={`variant_${variant.id}`}
                                                taskType={itemType.constantName}
                                                handleChangeVariant={handleChangeVariant}
                                                word={word}/>

                            })}
                        </div>

                        {/*<div className={"p-1"}>*/}
                        {/*    <small>activeKeyboardTypeId = {activeKeyboardType}</small>*/}
                        {/*    <hr className={"my-0"}/>*/}
                        {/*    <small> {keyboardTypesForTask[activeKeyboardType - 1].title}</small>*/}
                        {/*</div>*/}
                    </div>
                }
                {edit && <Button onClick={handleChangeTask} size={"sm"} className={"py-1"}> Confirm </Button>}
            </Card>
        </div>
    );
};

export default LessonTaskWrapper;