import { useSelector} from "react-redux";
import {Card, Col, ProgressBar, Row} from "react-bootstrap";
import Loading from "../../Loading";
import MessageEditor from "../MessageEditor/MessageEditor";
import TaskBank from "../TaskBank";
import Block from "./Block";
import {useEffect, useRef} from "react";

const LessonBody = ({fullLesson}) => {
    const {board, loading} = useSelector(state => state.lesson)
    const ref = useRef(null)
    let l = [...board.map(b => b.messages), ...board.filter(b=> b.userInput)].flat().length

    useEffect(() => {
        // TODO refactoring scroll func
        if (ref.current) {
            ref.current.scrollTop = ref?.current?.scrollHeight
        }

    }, [[...board.map(b => b.messages), ...board.filter(b=> b.userInput)].flat().length])

    return (
        <Row className={"py-3"} style={{height: "100%", background: "#fff"}}>
            <Col md={9} className={"d-grid  pe-1 ps-0"}>
                <Card className={"p-3 d-flex"}
                      style={{flexDirection: "column", justifyContent: "space-between"}}>
                    <div className="board pb-3">
                        {loading
                            ?
                            <div className="d-flex align-items-center opacity-50" style={{height: 600}}>
                                <Loading/>
                            </div>
                            : <div className={"board-holder w-100 pe-4"} ref={ref} style={{
                                overflowY: "scroll",
                                flexDirection: "column-reverse",
                                height: 600,
                                display: 'flex',
                                scrollBehavior: 'smooth',
                                flexWrap: 'nowrap',
                            }}>
                                {board.map(block => <Block key={block.blockId} block={block}/>)}
                            </div>
                        }
                    </div>
                    <MessageEditor/>
                </Card>
            </Col>
            <Col md={3} className={"d-flex"} style={{flexDirection: "column", justifyContent: "space-between"}}>
                <Card className={"px-2 py-2"} style={{height: "100%"}}>
                    <p>Task bank</p>
                    <TaskBank/>
                </Card>
                <Card className={"p-3 mt-2"}>
                    <p>Lesson readiness scale {fullLesson} </p>
                    <ProgressBar className={"mb-2"} animated variant={"success"}
                                 now={(fullLesson * 10 <= 10) ? 15 : fullLesson * 10}
                                 label={`${(fullLesson / 1.5).toFixed(1)} m`}/>

                    <p className={"text-secondary mb-0 "}>
                        The scale shows how much more material you need to write for the
                        lesson to be ready. The average lesson should last approximately 12-15 minutes
                    </p>
                </Card>
            </Col>
        </Row>
    );
};

export default LessonBody;