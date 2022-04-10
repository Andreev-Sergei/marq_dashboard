import React, {useCallback} from 'react';
import {Card} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeChatItem, setEditChatItem} from "../../../store/reducers/lessonSlice";
import {PencilSquare, Trash, VolumeUpFill} from "react-bootstrap-icons";
import { SayButton } from 'react-say'

const Message = ({item}) => {
    // const selector = useCallback(voices => [...voices].find(v => v.lang === 'uk-UK'), [])

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
    const {editChatItem} = useSelector(state => state.lesson)
    const dispatch = useDispatch()

    const isEdit = editChatItem?.id === item.id

    const hendleEditChatItem = () => {
        dispatch(setEditChatItem(item))
    }

    const handleRemoveChatItem = () => {
        dispatch(removeChatItem(item.id))
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
                voiceEnd = i +1
            }
        })
        const voice = words.slice(voiceStart, voiceEnd).join(' ')

        newVoiceWords = [...words.filter((word, index )=> index < voiceStart),voice, ...words.filter((word, index )=> index >= voiceEnd ) ]
        console.log(newVoiceWords)
        if (voiceStart === 0) {
            newVoiceWords = [voice, ...words.slice(voiceEnd, words.length)]
        }
        if (voiceEnd === words.length) {
            newVoiceWords = [...words.filter((w, i) => i < voiceStart), voice]
        }
        return newVoiceWords.map(word => getWord(word)) //  str.split(' ').map(word => getWord(word))
    }
    return (
        <div>
            <Card className={`my-2 p-2 d-inline-block ${isEdit && 'bg-primary text-white'}`}>
                {item.messageType === 'GIF'
                    ?
                    <img src={item.value.fixed_height.url}/>
                    :
                    getMessage(item.value)
                }
                <Trash className={"mx-2"} role={"button"} onClick={handleRemoveChatItem}>Remove</Trash>
                <PencilSquare role={"button"} onClick={hendleEditChatItem}>Edit</PencilSquare>
            </Card>
            <small style={{fontSize: 9, marginLeft: 8}}>{item.type == 'MESSAGE' && item.messageType}</small>
        </div>
    );
};

export default Message;