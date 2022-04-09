import React, {useEffect, useState} from 'react';
import {
    Badge,
    Button,
    Card,
    Col,
    Form,
    FormControl,
    InputGroup,
    OverlayTrigger,
    Popover,
    Row,
    Spinner
} from "react-bootstrap";
import Loading from "../Loading";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import {Link} from "react-router-dom";
import {LESSON_ROUTE} from "../../routes";
import {setError} from "../../store/reducers/userSlice";
import {useDispatch} from "react-redux";
import {fetchShortLessonItem} from "../../api/lesson";
import {useForm} from "react-hook-form";
import {editLang, editLesson} from "../../store/reducers/courseSlice";

const ShortEditLesson = ({activeLesson}) => {
    const [loading, setLoading] = useState(false)
    const [loadingChanges, setLoadingChanges] = useState(false)
    const [edited, setEdited] = useState(false)
    const [emoji, setEmoji] = useState({})
    const [review, setReview] = useState(false)
    const {register, getValues, setValue, handleSubmit, replace, formState: {errors}} = useForm()
    const dispatch = useDispatch()
    const handleChange = () => {
        setEdited(true)
    }


    const formSubmit = (data) => {
        setLoadingChanges(true)
        setTimeout(() => {
            const lesson = {...getValues(), id: activeLesson, emoji: emoji.native}
            // send data to server
            console.log(lesson)
            dispatch(editLesson(lesson))
            setLoadingChanges(false)
            setEdited(null)
        }, 500)

    }
    useEffect(() => {
        const fetchShortLesson = async () => {
            try {
                setLoading(true)
                const {data: lesson} = await fetchShortLessonItem(activeLesson)


                setEmoji({native: lesson.emoji})
                setLoading(false)
                setReview(lesson?.review)
                setValue("lessonName", lesson.lessonName);
                setValue("descriptionMain", lesson.descriptionMain);
                setValue("descriptionSecondary", lesson.descriptionSecondary);
                setValue("secretTitle", lesson.secretTitle);

            } catch (e) {
                dispatch(setError(e))
            }
        }

        fetchShortLesson()
        return () => {
        }
    }, [activeLesson])

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
        <Card className={"p-3"}>
            {loading
                ?
                <Loading/>
                :
                <Form onChange={handleChange} onSubmit={handleSubmit(formSubmit)}>
                    <Row>
                        <Col>
                            <p>Lesson id
                                <span
                                    className={"p-1 px-2 ms-2 rounded float-right text-white bg-primary"}>
                                     {activeLesson}
                                </span>
                                {review && <Link to={LESSON_ROUTE + activeLesson}>
                                                <Badge
                                                        style={{color: 'black', float: 'right'}}
                                                        className={"mb-3 float-right"}
                                                        bg="warning">
                                                    Review
                                                </Badge>
                                            </Link>}
                            </p>
                        </Col>
                    </Row>

                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Lesson name</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            {...register("lessonName", {required: true})}
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
                            aria-label="Description secondary"
                            aria-describedby="inputGroup-sizing-default"
                            {...register("descriptionSecondary", {required: true})}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Description emoji</InputGroup.Text>
                        <OverlayTrigger
                            rootClose trigger={"click"}
                            placement="bottom"
                            overlay={popover}>
                            <input className={"form-control"}
                                   onChange={() => null} value={emoji.native}/>
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
                    <Row>
                        <Col>
                            <Link to={LESSON_ROUTE + activeLesson} onClick={() => {

                            }
                            }>
                                <Button type="submit" style={{width: '100%'}}>
                                    Edit lesson
                                </Button>
                            </Link>
                        </Col>
                        <Col>
                            <Button disabled={!edited} type="submit" style={{width: '100%'}}>
                                {loadingChanges ?
                                    <div className={"d-flex align-items-center justify-content-center"}>
                                        <span className={"me-2 text"}>Loading</span>
                                        <Spinner animation="border"
                                                 size={"sm"}
                                                 role="status" className={""}/></div>
                                    : 'Save changes'}
                            </Button>
                        </Col>
                    </Row>


                </Form>
            }
        </Card>
    );
};

export default ShortEditLesson;