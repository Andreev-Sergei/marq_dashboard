import React from 'react';
import {Breadcrumb} from "react-bootstrap";
import {COURSE_ROUTE, COURSES_LIST_ROUTE} from "../../routes";

const Breadcrumbs = ({pCourse, pLang, lessonId, lessonName}) => {
    return (
        <Breadcrumb className={"px-2 mb-0"}  >
            <Breadcrumb.Item
                href={COURSES_LIST_ROUTE}>
                Course List
            </Breadcrumb.Item>

            <Breadcrumb.Item href={COURSE_ROUTE + pCourse.id}>
                {pCourse.title}
            </Breadcrumb.Item>

            <Breadcrumb.Item
                href={COURSE_ROUTE + pCourse.id +
                    `?lang=${pLang.id}&&lesson=${lessonId}`}>
                {pLang.title}
            </Breadcrumb.Item>

            <Breadcrumb.Item active>
                {lessonName}
            </Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default Breadcrumbs;