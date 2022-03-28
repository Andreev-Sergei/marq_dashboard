import React from 'react';
import {Accordion, Badge, Card, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const CourseSidebar = ({
                           langs,
                           activeLang,
                           activeLesson,
                           setActiveLang,
                           setActiveLesson,
                           lessons
                       }) => {


    const langClick = (langId) => {
        setActiveLang(langId)
        setActiveLesson()
    }
    return (
        <Card className={"p-2"}>
            <Accordion defaultActiveKey={activeLang}
            >
                {langs.map((lang) => {
                        return <Accordion.Item
                            style={{border: "none"}}
                            eventKey={lang.id}
                            key={lang.id}
                        >
                            <Link to={`?lang=${lang.id}`} className={"text-decoration-none"}>
                                <Accordion.Header onClick={() => langClick(lang.id)}>
                                    <span className={"d-flex justify-content-between w-100"}>
                                    <span>{lang.symbol} {lang.title}</span>
                                        {(lang.lessons.find(x => x.review) && !(lang.id == activeLang)) &&
                                            <Badge bg="warning"
                                                   className={"me-2"}
                                                   style={{color: "black"}}
                                            >
                                                Review
                                            </Badge>}
                                    </span>
                                </Accordion.Header>
                            </Link>
                            <Accordion.Body className={"px-0"}>
                                <ListGroup>
                                    {lessons.filter(lesson => lesson.lang === lang.id).map(lesson => {
                                        return <Link
                                            key={lesson.id}
                                            to={`?lang=${lang.id}&&lesson=${lesson.id}`}
                                            className={"text-decoration-none"}
                                            onClick={() => {
                                                setActiveLesson(lesson.id)
                                            }}
                                        >
                                            <ListGroup.Item
                                                style={{
                                                    border: 'none',
                                                    borderRadius: 4,
                                                    padding: " 12px  8px  12px  35px"
                                                }}
                                                active={((activeLesson === lesson.id) && (activeLang === lang.id))}
                                            >
                                                {lesson.symbol} {lesson.title}
                                                {lesson.review && <Badge
                                                    bg="warning"
                                                    style={{float: 'right', color: "black"}}
                                                >
                                                    Review
                                                </Badge>}
                                            </ListGroup.Item>
                                        </Link>
                                    })}
                                </ListGroup>
                            </Accordion.Body>
                        </Accordion.Item>
                    }
                )}
            </Accordion>
        </Card>
    );
};

export default CourseSidebar;