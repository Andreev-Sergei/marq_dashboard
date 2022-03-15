import React, { useEffect, useState} from 'react';
import {
    Button,
    Card,
    Form,
    FormCheck,
    FormControl,
    InputGroup,
    OverlayTrigger,
    Popover,
    Spinner
} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchLangItem} from "../../api/course";
import {setLangItem} from "../../store/course/courseSlice";
import Picker from "emoji-mart/dist-modern/components/picker/picker";
import 'emoji-mart/css/emoji-mart.css'

const CourseInfo = ({langId}) => {
    const {langItem} = useSelector(state => state.course)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
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
                    exclude={['people', 'symbols', 'recent', 'smileys', 'foods', 'activity', 'places', 'objects', 'symbols', 'nature']}
                    style={{width: 400}}
                    onSelect={(emoji) => {
                        setEmoji(emoji)
                        document.body.click()
                    }}
            />
        </Popover>
    );

    useEffect(() => {
        const fetchLang = async () => {
            try {
                setLoading(true)
                const data = await fetchLangItem(langId)
                setTimeout(async () => {
                    setEmoji({native: data.FlagsEmoji})
                    console.log(emoji)
                    await dispatch(setLangItem(data))
                    setLoading(false)
                }, 200)

            } catch (e) {
            }
        }
        fetchLang()
        return () => {
            console.log('unmaunting')
        }
    }, [langId])
    return (
        <Card className={"p-3"}>
            {loading
                ?
                <Spinner animation="border" color={"grey"} variant={"secondary"} role="status"
                         className={"my-5 mx-auto"}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                <Form>
                    <p>{langItem.langTitle}</p>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Course name</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={langItem.courseName}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Description main</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={langItem.descriptionMain}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Description secondary</InputGroup.Text>
                        <FormControl
                            aria-label="Course name"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={langItem.descriptionSecondary}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Flags emoji</InputGroup.Text>
                        <OverlayTrigger
                                rootClose trigger={"click"}
                                placement="bottom"
                                overlay={popover}>
                            <input className={"form-control"} value={emoji.native} onChange={() => null}/>
                        </OverlayTrigger>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-default">Secret title</InputGroup.Text>
                        <FormControl
                            aria-label="Description secondary"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder={langItem.secretTitle}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3 justify-content-start">
                        <InputGroup.Text id="inputGroup-sizing-default">Finished course</InputGroup.Text>
                        <div className="form-control w-10">
                            <FormCheck defaultChecked={langItem.FinishedCourse}/>
                        </div>
                    </InputGroup>

                    <Button variant="outline-info" type="submit" style={{width: '100%'}}>
                        Update
                    </Button>
                </Form>
            }
        </Card>
    );
};

export default CourseInfo;