import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CourseSidebar from "../components/Course/CourseSidebar";
import {useDispatch, useSelector} from "react-redux";
import {setCourse, setCourseLangs} from "../store/course/courseSlice";
import {useLocation, useParams} from "react-router-dom";
import {fetchCourse} from "../api/course";
import CourseInfo from "../components/Course/CourseInfo";
import AddLesson from "../components/Course/AddLesson";
import ShortEditLesson from "../components/Course/ShortEditLesson";

function useQuery() {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}


const Course = () => {
        const {id: courseId} = useParams()
        const {course, langs} = useSelector(state => state.course)
        // TODO разобарться со стором
        const dispatch = useDispatch()
        const [lang, lesson] = useQuery()
        const [activeLang, setActiveLang] = useState(lang ? parseInt(lang[1]) : 1)
        const [activeLesson, setActiveLesson] = useState(lesson && parseInt(lesson[1]))

        const sideBarProps = {
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
                    const {symbol, title, languages} = await fetchCourse(courseId)
                    await dispatch(setCourse({courseId, symbol, title}))
                    await dispatch(setCourseLangs(languages))
                } catch (e) {

                }
            }
            getCourse()
        }, [])

        return (
            <Container>
                <Row className={"mt-4"}>
                    <Col xxl={4} xl={5} md={6}>
                        <CourseSidebar {...sideBarProps} />
                    </Col>
                    <Col xxl={8} xl={7} md={6}>
                        {!activeLesson ?
                            <>
                                <CourseInfo langId={activeLang}/>
                                <AddLesson/>
                            </>
                            :
                           <ShortEditLesson activeLesson={activeLesson}/>
                        }
                    </Col>
                </Row>
            </Container>
        );
    }
;

export default Course;