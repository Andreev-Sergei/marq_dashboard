import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import CourseCard from "../components/CourseList/CourseCard";
import {fetchCourseList} from "../api/course";


const CourseList = () => {
    const [courseList, setCourseList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCourseList()
                setCourseList(data)
            } catch (e) {

            }
        }
        fetchData()
    })

    return (
        <Container>
            <Row className={"my-3"}>
                <Col>
                    <h2>Courses list</h2>
                </Col>
                <Col className={"d-flex justify-content-end"}>
                    <Button variant={"outline-info"} className={"px-3"}>
                        Creat new
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className={"d-grid"}
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
        </Container>
    );
};

export default CourseList;