import React, {useState} from 'react';
import {Button, Card, Form, FormControl, InputGroup, OverlayTrigger, Popover} from "react-bootstrap";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import {useForm} from "react-hook-form";

const AddLesson = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [emoji, setEmoji] = useState({})
    const onSubmit = data => {
        data.emoji = emoji.native
        console.log(data)
    };

    const popover = (
        <Popover style={{maxWidth: 338, padding: 0, border: 0}} id="popover-basic"  >
            <Picker set='facebook'
                    emojiSize={24}
                    showPreview={false}
                    emojiTooltip={false}
                    showSkinTones={false}
                    style={{width: 400}}
                    onSelect={(emoji) => {
                        setEmoji(emoji)
                        document.body.click()
                    }}
            />
        </Popover>
    );

    return (
        <>
            <Card className={"mt-4 p-3"}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <p>Create new lesson</p>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Lesson name</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={"Come up with a name"}
                            defaultValue="" {...register("lessonName")}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Secret title</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={"Title for developers"}
                            {...register("secretTitle")}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3"
                                onClick={() => window.scrollTo(0, 400)}>
                        <InputGroup.Text id="inputGroup-sizing-default">Description emoji</InputGroup.Text>
                        <OverlayTrigger
                            rootClose trigger={"click"}
                            placement="bottom"
                            overlay={popover}>
                            <input className={"form-control"}
                                   readOnly={true}
                                   style={{background: "white"}}
                                   defaultValue={emoji.native}
                                   onChange={() => null}/>
                        </OverlayTrigger>
                    </InputGroup>
                    <Button variant="info" type="submit" style={{width: '100%', color: "#fff"}}>
                        Create lesson
                    </Button>
                </Form>

            </Card>
            <div style={{height: 400}}></div>
        </>
    );
};

export default AddLesson;