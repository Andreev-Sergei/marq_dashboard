import React, {useState} from 'react';
import {
    Alert,
    Button,
    Form,
    FormCheck,
    FormControl,
    InputGroup,
    Modal,
    OverlayTrigger,
    Popover,
    Spinner
} from "react-bootstrap";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addLang} from "../../store/reducers/courseSlice";

const AddCourse = ({showModal, handleClose}) => {
    const {register, getValues, setValue, reset, handleSubmit, replace, formState: {errors}} = useForm()
    const [edited, setEdited] = useState(false)
    const [emoji, setEmoji] = useState({})
    const [picker, setPicker] = useState(false)
    const [loadingChanges, setLoadingChanges] = useState()
    const dispatch = useDispatch()

    const handleChange = () => {
        setEdited(getValues())
    }


    const formSubmit = (data) => {
        setLoadingChanges(true)
        setTimeout(() => {
            const values = {...getValues()}
            const lang = {id: Date.now(), symbol: emoji.native, title: values.courseName}
            dispatch(addLang(lang))
            setLoadingChanges(false)
            setEdited(null)
            setEmoji({})
            handleClose()
            reset()
        }, 500)

    }
    return (
        <Modal show={showModal} size={"lg"} onHide={handleClose}>
            <Form onChange={handleChange} onSubmit={handleSubmit(formSubmit)} className={"p-4"}>
                <p>New course(lang)</p>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Course name</InputGroup.Text>
                    <FormControl
                        {...register("courseName", {required: true})}
                        aria-label="Course name"
                        aria-describedby="inputGroup-sizing-default"

                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Description main</InputGroup.Text>
                    <FormControl
                        aria-label="Course name"
                        aria-describedby="inputGroup-sizing-default"
                        {...register("descriptionMain", {required: true})}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Description secondary</InputGroup.Text>
                    <FormControl
                        aria-label="Course name"
                        aria-describedby="inputGroup-sizing-default"
                        {...register("descriptionSecondary", {required: true})}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Flags emoji</InputGroup.Text>
                    <input className={"form-control"}
                           onChange={(e) => {
                               e.preventDefault()
                               return null
                           }}
                           onFocus={() => {
                               setPicker(true)
                           }}
                           defaultValue={emoji.native}
                           maxLength={1}
                           minLength={1}
                    />
                </InputGroup>
                {picker &&
                    <div className={"mb-3 d-flex"}>
                        <Picker set='facebook'
                                emojiSize={24}
                                showPreview={false}
                                emojiTooltip={false}
                                showSkinTones={false}
                                style={{width: '100%'}}
                                exclude={['people', 'symbols', 'recent', 'smileys', 'foods', 'activity', 'places', 'objects', 'symbols', 'nature']}
                                onSelect={(emoji) => {
                                    setEmoji(emoji)
                                    setEdited(true)
                                    setPicker(false)
                                    document.body.click()
                                }}
                        />
                    </div>
                }
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Secret title</InputGroup.Text>
                    <FormControl
                        aria-label="Description secondary"
                        aria-describedby="inputGroup-sizing-default"
                        {...register("secretTitle", {required: true})}
                    />
                </InputGroup>

                {errors.courseName && <Alert variant={"danger"}>Course name is required</Alert>}
                {errors.descriptionMain && <Alert variant={"danger"}>Main description is required</Alert>}
                {errors.descriptionSecondary && <Alert variant={"danger"}>Secondary description is required</Alert>}
                {errors.secretTitle && <Alert variant={"danger"}>secretTitle is required</Alert>}


                <Button
                    disabled={!edited}
                    type="submit" style={{width: '100%'}}>
                    {loadingChanges ?
                        <div className={"d-flex align-items-center justify-content-center"}>
                            <span className={"me-2 text"}>Loading</span>
                            <Spinner animation="border"
                                     size={"sm"}
                                     role="status" className={""}/></div>
                        : 'Create course'}
                </Button>


            </Form>
        </Modal>
    )
        ;
};

export default AddCourse;