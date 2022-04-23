import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Card,
    Form,
    FormCheck,
    FormControl,
    InputGroup,
    OverlayTrigger,
    Popover,
    Spinner
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchLangItem} from "../../api/course";
import {editLang, setLangItem} from "../../store/reducers/courseSlice";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import 'emoji-mart/css/emoji-mart.css'
import {useForm} from "react-hook-form";
import {setError} from "../../store/reducers/userSlice";
import CourseService from "../../services/CourseService";

const CourseInfo = ({langId}) => {
    const {langItem} = useSelector(state => state.course)
    const {register, getValues, setValue, handleSubmit, replace, formState: {errors}} = useForm()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const [emoji, setEmoji] = useState({})
    const [loadingChanges, setLoadingChanges] = useState(false)
    const [edited, setEdited] = useState()
    const handleChange = () => {
        setEdited(getValues())
    }
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
                    exclude={['people', 'symbols', 'recent', 'smileys', 'foods', 'activity', 'places', 'objects', 'symbols', 'nature']}
                    style={{width: 400}}
                    onSelect={(emoji) => {
                        setEmoji(emoji)
                        setEdited(getValues())
                        document.body.click()
                    }}
            />
        </Popover>
    );

    const formSubmit = (data) => {
        try {
            setLoadingChanges(true)
            const lang = { id: langId, title: edited.courseName, symbol: emoji?.native}
            // TODO add api service
            dispatch(editLang(lang))
            setLoadingChanges(false)
            setEdited(null)
        } catch (e) {

        }
    }

    useEffect(() => {
        const fetchLang = async () => {
            try {
                setLoading(true)
                const {data: lang} = await CourseService.fetchLangItem(langId)
                setEmoji({native: lang.FlagsEmoji})
                await dispatch(setLangItem(lang))
                setLoading(false)
                setValue("courseName", lang.courseName);
                setValue("descriptionMain", lang.descriptionMain);
                setValue("descriptionSecondary", lang.descriptionSecondary);
                setValue("secretTitle", lang.secretTitle);
                setValue("FinishedCourse", lang.FinishedCourse);
            } catch (e) {
                dispatch(setError(e))
            }
        }

        fetchLang()
        return () => {
        }
    }, [langId])


    return (
        <Card className={"p-3"}>
            {loading
                ?
                <Spinner animation="border" color={"grey"} variant={"secondary"} role="status"
                         className={"my-5 mx-auto"}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                <Form onChange={handleChange} onSubmit={handleSubmit(formSubmit)}>
                    <p>{langItem.langTitle}</p>
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
                        <OverlayTrigger
                            rootClose trigger={"click"}
                            placement="bottom"
                            overlay={popover}>
                            <input className={"form-control"} value={emoji.native} onChange={() => null}/>
                        </OverlayTrigger>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Secret title</InputGroup.Text>
                        <FormControl
                            aria-label="Description secondary"
                            aria-describedby="inputGroup-sizing-default"
                            {...register("secretTitle", {required: true})}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 justify-content-start">
                        <InputGroup.Text id="inputGroup-sizing-default">Finished course</InputGroup.Text>
                        <div className="form-control w-10">
                            <FormCheck
                                {...register("FinishedCourse")}
                            />
                        </div>
                    </InputGroup>
                    {errors.courseName && <Alert variant={"danger"}>Course name is required</Alert>}
                    {errors.descriptionMain && <Alert variant={"danger"}>Main description is required</Alert>}
                    {errors.descriptionSecondary && <Alert variant={"danger"}>Secondary description is required</Alert>}
                    {errors.secretTitle && <Alert variant={"danger"}>secretTitle is required</Alert>}

                    {/*{editedData &&*/}
                        <Button
                            disabled={!edited}
                            type="submit" style={{width: '100%'}}>
                            {loadingChanges ?
                                <div className={"d-flex align-items-center justify-content-center"}>
                                    <span className={"me-2 text"}>Loading</span>
                                    <Spinner animation="border"
                                             size={"sm"}
                                             role="status" className={""}/></div>
                                : 'Update'}
                        </Button>
                    {/*}*/}

                </Form>
            }
        </Card>
    );
};

export default CourseInfo;