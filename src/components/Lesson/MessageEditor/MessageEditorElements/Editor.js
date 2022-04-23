import React, {useEffect, useState} from 'react';
import {Card, OverlayTrigger, Popover} from "react-bootstrap";
import ContentEditable from "react-contenteditable";
import {msgTypes} from "../../../../helpers/constants";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import styles from './MessageEditor.module.sass'

const EditButton = ({cmd, arg, name}) => {
    return (
        <button
            style={{background: 'transparent', border: 'none'}}
            key={cmd}
            onMouseDown={evt => {
                evt.preventDefault();
                document.execCommand(cmd, true, arg);
            }}
        >
            {name || cmd}
        </button>
    );
}


const Editor = ({msgType, keyPress, msg, handleChange, con}) => {
    const [contentEditableFocus, setContentEditableFocus] = useState(false)
   // useEffect(()=> console.log(contentEditableFocus),[contentEditableFocus])
    const popover = (
        <Popover
            style={{maxWidth: 338, padding: 0, border: 0}}
            id="popover-basic"
        >
            <Picker set='facebook'
                    emojiSize={24}
                    showPreview={false}
                    emojiTooltip={false}
                    showSkinTones={false}
                // exclude={['people', 'symbols', 'recent', 'smileys', 'foods', 'activity', 'places', 'objects', 'symbols', 'nature']}
                    style={{width: 400}}
                    onSelect={({native}) => {
                        console.log(contentEditableFocus)
                        if (!contentEditableFocus) {
                            con.current.focus()
                            const end = con.current.innerHTML.length
                            let range = document.createRange()
                            let sel = window.getSelection()
                            range.setStart(con.current.childNodes[0], end)
                            range.collapse(true)
                            sel.removeAllRanges()
                            sel.addRange(range)
                        } else {
                            con.current.focus()
                        }
                        document.execCommand("insertHTML", true, native);
                        document.body.click()
                        setContentEditableFocus(true)
                    }}
            />
        </Popover>
    );


    return (
        <Card>
            <Card.Header>
                {msgType === msgTypes.USUAL && <EditButton cmd="bold"/>}

                <EditButton cmd="italic" arg="jest" name="voice"/>

                {msgType === msgTypes.USUAL &&
                    <EditButton cmd="insertHTML" arg='<small>USER</small>&nbsp;' name="user"/>}
                {msgType === msgTypes.USUAL &&
                    <OverlayTrigger
                        rootClose trigger={"click"}
                        placement="right"
                        overlay={popover}>
                        <button
                            style={{background: 'transparent', border: 'none'}}
                            onMouseDown={evt => {
                                evt.preventDefault();
                            }}>emoji
                        </button>
                    </OverlayTrigger>
                }

            </Card.Header>
            <Card.Body className={"m-0 mb-2 p-0"}>
                <ContentEditable
                    className={"m-3 " + styles.contentEditable}
                    id={'contetntEditable'}
                    tagName="div"
                    onKeyPress={keyPress}
                    html={msg}
                    onFocus={() => setContentEditableFocus(true)}
                    // onBlur={()=>{}}
                    disabled={false}
                    onChange={handleChange}
                    innerRef={con}
                />
            </Card.Body>
        </Card>
    );
};

export default Editor;