import React from 'react';
import {Card, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeChatItem, setEditChatItem} from "../../../store/reducers/lessonSlice";
import {Basket, Trash, PencilSquare, VolumeUpFill} from "react-bootstrap-icons";


const Message = ({item}) => {
    const getWord = (word) => {
        let str
        const key_word = Math.random() // mock

        if (word.includes('<i>')) {
            str = word.replace("<i>", '').replace("</i>", '')
            return <i
                key={key_word}
                className={"me-1 px-1"}
                style={{color: 'blue'}}
            >
                {str}
                <VolumeUpFill
                    className={"ms-1"}
                    role={"button"}
                    onClick={() => {
                        let sound = new SpeechSynthesisUtterance()
                        sound.text = str
                        window.speechSynthesis.speak(sound)
                    }}/>
            </i>
        } else if (word.includes('<b>')) {
            str = word.replace('<b>', '').replace('</b>', '')
            return <b key={key_word} className={"me-1"}>{str}</b>

        } else if (word.includes('<small>')) {
            str = word.replace('<small>', '').replace('</small>', '')
            return <em key={key_word} style={{background: "orange", color: 'white', cursor: 'pointer'}}
                       className={"me-1 my-1"}>{str}</em>

        } else return <span key={key_word} className={"me-1"}>{word}</span>
    }
    const {editChatItem} = useSelector(state => state.lesson)
    const dispatch = useDispatch()

    const isEdit = editChatItem?.id === item.id

    const hendleEditChatItem = () => {
        dispatch(setEditChatItem(item))
    }

    const handleRemoveChatItem = () => {
        dispatch(removeChatItem(item.id))
    }
    return (
        <div>
            <Card className={`my-2 p-2 d-inline-block ${isEdit && 'bg-info'}`}>
                        {item.messageType === 'GIF'
                            ?
                            <img src={item.value.fixed_height.url}/>
                            :
                            item.value.split(' ').map(word => getWord(word))
                        }
                        <Trash className={"mx-2"} role={"button"} onClick={handleRemoveChatItem}>Remove</Trash>
                        <PencilSquare role={"button"} onClick={hendleEditChatItem}>Edit</PencilSquare>
            </Card>
            <small style={{fontSize: 9, marginLeft: 8}}>{item.type == 'MESSAGE' && item.messageType}</small>
        </div>
    );
};

export default Message;