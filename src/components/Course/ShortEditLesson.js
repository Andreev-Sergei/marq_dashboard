import React, {useState} from 'react';
import {
    Button,
    Card, Col,
    Form,
    FormCheck,
    FormControl,
    InputGroup,
    OverlayTrigger,
    Popover, Row,
    Spinner
} from "react-bootstrap";
import Loading from "../Loading";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import {Link} from "react-router-dom";
import {LESSON_ROUTE} from "../../routes";

const ShortEditLesson = ({activeLesson}) => {
    const [loading, setLoading] = useState(false)
    const [emoji, setEmoji] = useState({})

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
                // exclude={['people', 'symbols', 'recent', 'smileys', 'foods', 'activity', 'places', 'objects', 'symbols', 'nature']}
                    style={{width: 400}}
                    onSelect={(emoji) => {
                        setEmoji(emoji)
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
                <Form>
                    <p>Lesson - id{activeLesson}</p>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Lesson name</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={"¡Yo hablo español!"}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Description main</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={"Greetings & farewells"}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Description secondary</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={"If you're just trying to learn a language"}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Description emoji</InputGroup.Text>
                        <OverlayTrigger
                            rootClose trigger={"click"}
                            placement="bottom"
                            overlay={popover}>
                            <input className={"form-control"}
                                   defaultValue={emoji.native}/>
                        </OverlayTrigger>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Secret title</InputGroup.Text>
                        <FormControl
                            aria-label="Description secondary"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={"Title for developers"}
                        />
                    </InputGroup>
                    <Row>
                        <Col>
                            <Link to={LESSON_ROUTE + activeLesson} onClick={()=> {

                            }
                            }>
                                <Button variant="outline-info" type="submit" style={{width: '100%'}}>
                                    Edit lesson
                                </Button>
                            </Link>
                        </Col>
                        <Col>
                            <Button variant="outline-info" type="submit" style={{width: '100%'}}>
                                Save changes
                            </Button>
                        </Col>
                    </Row>


                </Form>
            }
        </Card>
    );
};

export default ShortEditLesson;