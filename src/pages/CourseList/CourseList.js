import React, {useEffect, useState} from 'react';
import {
    Alert,
    Button,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Modal,
    Popover,
    Row
} from "react-bootstrap";
import CourseCard from "../../components/CourseList/CourseCard";
import {addCourse, fetchCourseList} from "../../api/course";
import {useForm} from "react-hook-form";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import styles from './CourseList.module.sass'
import {useDispatch} from "react-redux";
import {setError} from "../../store/reducers/userSlice";

const CourseList = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [courseList, setCourseList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [emoji, setEmoji] = useState({})
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const dispatch = useDispatch()

    const handleAddCourse = async ({title}) => {
        const {data: newCourse} = await addCourse({
            symbol: emoji.native,
            title: title,
            total: 0
        })
        console.log(newCourse)
        setCourseList(prevState => [...prevState, newCourse])
        handleClose()
        setEmoji({})
        reset()
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await fetchCourseList()
                await setCourseList(data)
            } catch (e) {
                dispatch(setError(e))
            }
        }
        fetchData()
    }, [])

    const popover = (
        <Popover
            style={{maxWidth: 338, padding: 0, border: 0}}
            id="popover-basic"
        >
            <Picker set='facebook'
                    emojiSize={24}
                    showPreview={false}
                    emojiTooltip={false}
                    useButton={true}
                    showSkinTones={false}
                    exclude={['people', 'symbols', 'recent', 'smileys', 'foods', 'activity', 'places', 'objects', 'symbols', 'nature']}
                    style={{width: 400, zIndex: 10000}}
                    onSelect={({native}) => {
                        /// document.execCommand("insertHTML", true, native);
                        document.body.click()
                    }}
            />
        </Popover>
    );

    return (
        <Container>
            <Row className={"my-3"}>
                <Col>
                    <h2>Courses list</h2>
                </Col>
                <Col className={"d-flex justify-content-end"}>
                    <Button size={"sm"} onClick={handleShow} className={"px-3"}>
                        Creat new
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className={"d-grid mb-5 pb-5"}
                     style={{
                         gridTemplateColumns: '1fr 1fr',
                         gridGap: 25
                     }}
                >
                    {courseList.map((course, index) => {
                        return <CourseCard key={index} course={course}/>
                    })}
                </Col>
            </Row>
            <Modal show={showModal} size={"lg"} onHide={handleClose}>
                <Form onSubmit={handleSubmit(handleAddCourse)}>
                    <Modal.Header closeButton>
                        <Modal.Title>New course</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">Course name</InputGroup.Text>
                            <FormControl
                                aria-label="Course name"
                                aria-describedby="inputGroup-sizing-default"
                                placeholder={"Come up with a name"}
                                defaultValue="" {...register("title", {required: true})}
                            />
                        </InputGroup>
                        <InputGroup className={"mb-3 "}>
                            <InputGroup.Text id="inputGroup-sizing-default">Emoji flag</InputGroup.Text>

                            <FormControl
                                aria-label="Emoji flag"
                                aria-describedby="inputGroup-sizing-default"
                                autoComplete={'off'}
                                onChange={() => null}
                                style={{background: "white"}}
                                readOnly={true}
                                disabled={true}
                                defaultValue={emoji.native}
                            />

                            <Picker set='facebook'
                                    emojiSize={24}
                                    showPreview={false}
                                    emojiTooltip={false}
                                    useButton={true}
                                    showSkinTones={false}
                                    exclude={['people', 'symbols', 'recent', 'smileys', 'foods', 'activity', 'places', 'objects', 'symbols', 'nature']}
                                    style={{width: '100%'}}
                                    onSelect={(emoji) => {
                                        setEmoji(emoji)
                                        document.body.click()
                                    }}
                            />
                        </InputGroup>
                        {errors.title && <Alert variant={"danger"}>Name field is required</Alert>}
                        {!emoji.native && <Alert variant={"danger"}>Emoji is required</Alert>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type={"submit"}  variant="primary">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default CourseList;