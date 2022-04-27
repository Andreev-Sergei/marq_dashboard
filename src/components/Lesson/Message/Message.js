import React, {useState} from 'react';
import {Card, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setEditMessage} from "../../../store/reducers/lessonSlice";
import {GripVertical, PencilSquare, Trash, VolumeUpFill} from "react-bootstrap-icons";
import styles from '../LessonBody/Block.module.sass'
import {reset, setDragType, setDrugItem} from "../../../store/reducers/dragSlice";
import MessageService from "../../../services/LessonServices/MessageService";
import {msgTypes} from "../../../helpers/constants";

const Message = ({item, blockId}) => {
    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => setOpenModal(false)
    const getWord = (word) => {
        let str
        const key_word = Math.random() // mock

        if ((word.includes('<i>')) && (word.includes('</i>'))) {
            str = word.replace("<i>", '').replace("</i>", '')
            return <i
                key={key_word}
                className={`me-1 px-1 ${isEdit && 'bg-primary text-light'}`}
                style={{color: 'blue'}}
            >
                {str}
                <VolumeUpFill
                    className={"ms-1"}
                    onClick={() => {
                        let sound = new SpeechSynthesisUtterance()
                        sound.text = str
                        // sound.voice = 1
                        window.speechSynthesis.speak(sound)
                    }}
                />
            </i>
        } else if (word.includes('<b>')) {
            str = word.replace('<b>', '').replace('</b>', '')
            return <b key={key_word} className={"me-1"}>{str.replaceAll('&nbsp;', ' ')}</b>

        } else if (word.includes('<small>')) {
            str = word.replace('<small>', '').replace('</small>', '')
            return <em key={key_word} style={{background: "orange", color: 'white', cursor: 'pointer'}}
                       className={"me-1 my-1"}>{str}</em>

        } else return <span key={key_word} className={"me-1"}>{word}</span>
    }

    const {editChatItem, board} = useSelector(state => state.lesson)
    const {type, dragItem} = useSelector(state => state.drag)
    const dispatch = useDispatch()

    const isEdit = editChatItem?.message.id === item?.id

    const handleEditChatItem = () => dispatch(setEditMessage({message: item, blockId}))

    const handleRemoveChatItem = () => {
        const block = board.find(block => block.blockId === blockId)
        const removeBlock = block.messages.length === 1 && !block.userInput
        dispatch(MessageService.removeMessage(removeBlock, blockId, item.id))
    }

    function dragStartHandler(e, msg) {
        dispatch(setDrugItem({message: msg, blockId}))
    }

    function dragEndHandler(e) {
        (type === 'MSG') && e.target.parentNode.classList.remove(styles.hoveredMsg)
    }

    function dragOverHandler(e) {
        // (currentMsg) && e.target.classList.add(styles.hoveredBlock)
        (type === 'MSG' && dragItem.blockId !== blockId) && e.target.parentNode.classList.add(styles.hoveredMsg)

        e.preventDefault()
    }

    function dragDropHandler(e) {
        e.preventDefault()
        if (type === 'MSG' && dragItem.blockId !== blockId) {
            const parentBlock = board.find(block => block.blockId === dragItem.blockId)
            dispatch(MessageService.moveMessage(
                dragItem.message,
                dragItem.blockId,
                blockId,
                parentBlock.blockId,
                parentBlock.messages.length === 1 && parentBlock?.userInput === null,
            ))
            e.target.parentNode.classList.remove(styles.hoveredMsg)
        }
        dispatch(reset())
    }

    const getMessage = (str) => {
        let newVoiceWords
        let voiceStart = null
        let voiceEnd = null
        const words = str.split(' ')
        words.forEach((word, i) => {
            if (word.includes('<i>')) {
                voiceStart = i
            }
            if (word.includes('</i>')) {
                voiceEnd = i + 1
            }
        })
        const voice = words.slice(voiceStart, voiceEnd).join(' ')

        newVoiceWords = [...words.filter((word, index) => index < voiceStart), voice, ...words.filter((word, index) => index >= voiceEnd)]

        if (voiceStart === 0) {
            newVoiceWords = [voice, ...words.slice(voiceEnd, words.length)]
        }
        if (voiceEnd === words.length) {
            newVoiceWords = [...words.filter((w, i) => i < voiceStart), voice]
        }
        return newVoiceWords.map(word => getWord(word))
    }
    if (!item) {
        return <Card
            onDragStart={(e) => dragStartHandler(e, item)}
            onDragLeave={(e) => dragEndHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dragDropHandler(e, item)}
            className={styles.message} style={{userSelect: 'none', padding: '10px'}}
        ><Card className={"p-2"}>Drag message here</Card></Card>
    }
    const imgUrl = item.messageType === msgTypes.IMAGE ? item?.value : item?.value?.fixed_height?.url

    return (
        <div draggable={type === 'MSG'}
             key={item.id + blockId + 'dfdf'}
             onDragStart={(e) => dragStartHandler(e, item)}
             onDragLeave={(e) => dragEndHandler(e)}
             onDragEnd={(e) => dragEndHandler(e)}
             onDragOver={(e) => dragOverHandler(e)}
             onDrop={(e) => dragDropHandler(e, item)}
             className={styles.message} style={{userSelect: 'none'}}
        >
            <Card className={`my-2 p-2 d-inline-block ${isEdit && 'bg-primary text-white'}`}>
                {item.messageType === msgTypes.GIF || item.messageType === msgTypes.IMAGE
                    ?
                    <img style={{maxWidth: 300}} src={imgUrl}
                         onClick={()=> setOpenModal(true)}/>
                    :
                    getMessage(item.value)
                }
                <Trash className={"mx-2"} role={"button"} onClick={handleRemoveChatItem}>Remove</Trash>
                <PencilSquare role={"button"} onClick={handleEditChatItem}>Edit</PencilSquare>
                <GripVertical role={"button"} className={'mx-2'}
                              onMouseDown={() => dispatch(setDragType('MSG'))}
                />
            </Card>
            <small style={{fontSize: 9, marginLeft: 8}}>{item.type == 'MESSAGE' && item.messageType}</small>
            <Modal show={openModal} onHide={handleClose} size={"lg"} animation={false}>
                <img
                    className={"p-2"}
                    src={imgUrl}
                    alt=""/>
            </Modal>
        </div>
    );
};

export default Message;