import React from 'react';
import {Card} from "react-bootstrap";

const LessonChatItem = ({item}) => {
    const getWord = (word) => {
        let str
        const key_word = Math.random() // mock

        if (word.includes('<i>')) {
            str = word.replace("<i>", '').replace("</i>", '')
            console.log(str)
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

    return (
        <div>
            <Card className={"my-2 p-2 d-inline-block"}>
                {item.value.split(' ').map(word => getWord(word))}
            </Card>
        </div>
    );
};

export default LessonChatItem;