import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CourseSidebar from "../components/Course/CourseSidebar";
import {useDispatch, useSelector} from "react-redux";
import {setCourse, setCourseLangs, setCourseLessons} from "../store/reducers/courseSlice";
import {useLocation, useParams} from "react-router-dom";
import {fetchCourse} from "../api/course";
import CourseInfo from "../components/Course/CourseInfo";
import AddLesson from "../components/Course/AddLesson";
import ShortEditLesson from "../components/Course/ShortEditLesson";
import {setError} from "../store/reducers/userSlice";
import AddCourse from "../components/Course/addCourse";
import Header from "../components/Header";
import CourseService from "../services/CourseService";

function useQuery() {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}


const Course = () => {
        const {id: courseId} = useParams()
        const {course, langs, lessons} = useSelector(state => state.course)

        const {user} = useSelector(state => state.user)
        const dispatch = useDispatch()
        const [lang, lesson] = useQuery()
        const [activeLang, setActiveLang] = useState(lang ? parseInt(lang[1]) : 1)
        const [activeLesson, setActiveLesson] = useState(lesson && parseInt(lesson[1]))
        const [showModal, setShowModal] = useState(false)

        const handleClose = () => setShowModal(false);
        const handleShow = () => setShowModal(true);

        const sideBarProps = {
            lessons,
            course,
            langs,
            activeLang,
            setActiveLang,
            activeLesson,
            setActiveLesson
        }

        useEffect(() => {
            const getCourse = async () => {
                try {
                    const {data: course} = await CourseService.fetchCourse(courseId)
                    await dispatch(setCourse({
                        courseId: course.courseId,
                        symbol: course.symbol,
                        title: course.title
                    }))
                    const languages = course.languages
                    const courseLessons = languages.map((lang) => {
                        return lang.lessons?.map(lesson => {
                            return {...lesson, lang: lang.id}
                        })
                    })
                    const margedcourseLessons = [].concat.apply([], courseLessons)
                    dispatch(setCourseLessons(margedcourseLessons))
                    dispatch(setCourseLangs(languages))
                } catch (e) {
                    dispatch(setError(e))
                    console.log(e)
                }
            }
            getCourse()
        }, [])

        return (
            <>
                <Header title={course.title} />

                <Container>
                    <Row>
                        <Col className={"mt-3 d-flex justify-content-end align-items-center"}>
                            {user.role === 'REVIEWER' && <>
                                <Button style={{float: 'right'}}
                                        onClick={handleShow}

                                >
                                    Create new course (lang)
                                </Button>

                                <AddCourse showModal={showModal}
                                           handleClose={handleClose}/>
                            </>
                            }
                        </Col>
                    </Row>
                    <Row className={"mt-0"}>
                        <Col xxl={4} xl={5} md={6}>
                            <CourseSidebar {...sideBarProps} />
                        </Col>
                        <Col xxl={8} xl={7} md={6}>
                            {!activeLesson ?
                                <>
                                    <CourseInfo langId={activeLang}/>
                                    <AddLesson langId={activeLang}/>
                                </>
                                :
                                <ShortEditLesson activeLesson={activeLesson}/>
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
;

export default Course;