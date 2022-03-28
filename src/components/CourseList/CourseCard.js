import React from 'react';
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const CourseCard = ({course}) => {
    return <Card style={{textAlign: "center"}}
                 className={"py-5 d-grid justify-content-center"}
    >
        <span style={{fontSize: 46}}>{course.symbol}</span>
        <h3>{course.title}</h3>
        <p className={"text-secondary mb-2"}>{course.total} courses created</p>
        <hr className="mt-1"/>
        <Link to={course.id + ''}>
            <Button className={"text-white mx-1 "}>
                Continue
            </Button>
        </Link>
    </Card>;
}

export default CourseCard;