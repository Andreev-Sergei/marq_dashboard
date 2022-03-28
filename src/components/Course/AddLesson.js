import React, {useState} from 'react';
import {Alert, Button, Card, Form, FormControl, InputGroup, OverlayTrigger, Popover, Spinner} from "react-bootstrap";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addLesson} from "../../store/reducers/courseSlice";

const AddLesson = ({langId}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [loadingChanges, setLoadingChanges] = useState(false)
    const [edited, setEdited] = useState(false)
    const [emoji, setEmoji] = useState({})
    const dispatch = useDispatch()

    const onSubmit = async data => {

        setLoadingChanges(true)
        setTimeout(()=> {
            data.emoji = emoji.native
            setEdited(false)
            dispatch(addLesson({
                ...data, id: Date.now(), lang: langId
            }))
            reset()
            setEmoji({})
            setLoadingChanges(false)
        },300)

    };

    const popover = (
        <Popover style={{maxWidth: 338, padding: 0, border: 0}} id="popover-basic">
            <Picker set='facebook'
                    emojiSize={24}
                    showPreview={false}
                    emojiTooltip={false}
                    showSkinTones={false}
                    style={{width: 400}}
                    onSelect={(emoji) => {
                        setEmoji(emoji)
                        setEdited(true)
                        document.body.click()
                    }}
            />
        </Popover>
    );

    return (
        <>
            <Card className={"mt-4 p-3"}>
                <Form onChange={() => setEdited(true)} onSubmit={handleSubmit(onSubmit)}>
                    <p>Create new lesson</p>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Lesson name</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={"Come up with a name"}
                            defaultValue="" {...register("lessonName", {required: true})}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Secret title</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={"Title for developers"}
                            {...register("secretTitle", {required: true})}
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
                    {errors.lessonName && <Alert variant={"danger"}>Lesson name is required</Alert>}
                    {errors.secretTitle && <Alert variant={"danger"}>secretTitle is required</Alert>}
                    {!emoji && <Alert variant={"danger"}>Emoji is required</Alert>}
                    <Button disabled={!edited} type="submit" style={{width: '100%', color: "#fff"}}>
                        {loadingChanges ?
                            <div className={"d-flex align-items-center justify-content-center"}>
                                <span className={"me-2 text"}>Loading</span>
                                <Spinner animation="border"
                                         size={"sm"}
                                         role="status" className={""}/></div>
                            : 'Create lesson'}
                    </Button>
                </Form>

            </Card>
            <div style={{height: 400}}></div>
        </>
    );
};

export default AddLesson;