import React from 'react';
import {Card, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeChatItem, setEditChatItem} from "../../store/reducers/lessonSlice";


const LessonChatItem = ({item}) => {
    const getWord = (word) => {
        let str
        const key_word = Math.random() // mock

        if (word.includes('<i>')) {
            str = word.replace("<i>", '').replace("</i>", '')
            return <i
                key={key_word}
                className={"me-1 px-1"}
                style={{background: "blue", color: 'white', cursor: 'pointer', borderRadius: 4}}
                onClick={() => {
                    let sound = new SpeechSynthesisUtterance()
                    sound.text = str
                    window.speechSynthesis.speak(sound)
                }}
            >
                {str}
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
                {item.value.split(' ').map(word => getWord(word))}
                <Button className={"me-3"} onClick={handleRemoveChatItem}>Remove</Button>
                <Button className={"me-3"} onClick={hendleEditChatItem}>Edit</Button>
                <p>{item.type == 'MESSAGE' && item.messageType}</p>
            </Card>
        </div>
    );
};

export default LessonChatItem;