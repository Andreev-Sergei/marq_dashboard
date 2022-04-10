import React, {useState} from 'react';
import {Button, Card, Col, Form, FormCheck, Row, Spinner} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {Trash} from "react-bootstrap-icons";

function TrainingItem(props: { handleChangeInProduction: any, word: string, id: number, inProduction: any, translation: string, handleRemoveItem: (id) => any }) {
    return <Card style={{background: "#F7F7F7"}} className={"mb-3"}>
        <Row className={"px-3"}>
            <Col md={8} className={" border-right-1 py-3"}>
                <span className={"text-primary"}>{props.word}</span> - <span>{props.translation}</span>
            </Col>
            <Col md={3} className={' border-right-1 py-3'}>
                <span className={"d-flex"}>
                    <FormCheck
                        onChange={() => {
                            props.handleChangeInProduction(props.id)
                        }}
                        className={"me-2"}
                        checked={props.inProduction}>
                    </FormCheck>Add to the Trainer
                </span>
            </Col>
            <Col md={1} className={"d-flex  py-3 justify-content-center align-items-center"}>
                <Trash className={"mx-2"} role={"button"} onClick={()=> props.handleRemoveItem(props.id)}/>
            </Col>
        </Row>
    </Card>;
}

const Trainer = () => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    const [loadingChanges, setLoadingChanges] = useState(false)
    const [trainingItems, setTrainingItems] = useState([
        {
            id: 1,
            word: 'dog',
            translation: 'Собака',
            inProduction: true
        }, {
            id: 2,
            word: 'cat',
            translation: 'кошка',
            inProduction: false
        }, {
            id: 3,
            word: 'cow',
            translation: 'корова',
            inProduction: true
        }, {
            id: 12,
            word: 'dog',
            translation: 'Собака',
            inProduction: true
        }, {
            id: 22,
            word: 'cat',
            translation: 'кошка',
            inProduction: false
        }, {
            id: 32,
            word: 'cow',
            translation: 'корова',
            inProduction: true
        }, {
            id: 213,
            word: 'dog',
            translation: 'Собака',
            inProduction: true
        }, {
            id: 124412,
            word: 'cat',
            translation: 'кошка',
            inProduction: false
        }, {
            id: 124,
            word: 'cow',
            translation: 'корова',
            inProduction: true
        }, {
            id: 124124,
            word: 'dog',
            translation: 'Собака',
            inProduction: true
        }, {
            id: 4343,
            word: 'cat',
            translation: 'кошка',
            inProduction: false
        }, {
            id: 555,
            word: 'cow',
            translation: 'корова',
            inProduction: true
        },
    ])
    const onSubmit = (data) => {
        const newTrainingItem = {
            id: Date.now(),
            inProduction: false,
            word: data.word,
            translation: data.translation
        }
        setTrainingItems([newTrainingItem, ...trainingItems])
        reset()
    }
    const handleRemoveItem = (id) => {
        setTrainingItems([...trainingItems.filter(item => item.id !== id )])
    }
    const handleChangeInProduction = (id) => {
        setTrainingItems([...trainingItems.map(item => {
            return (item.id === id) ? {
                ...item,
                inProduction: !item.inProduction
            } : item
        })])
    }
    return (
        <>
            <Row className={"d-flex align-items-stretch"}>
                <Col className={'pe-0'}>
                    <Card className={"px-4 py-3 "}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col>
                                    <Form.Control type="text" placeholder="Word / Phrase"
                                                  {...register("word", {required: true})}
                                    />
                                </Col>
                                <Col>
                                    <Form.Control type="text" placeholder="Translation"
                                                  {...register("translation", {required: true})}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className={"mt-3"}>
                                    <Button className={"w-100"} type={"submit"}>    {loadingChanges ?
                                        <div className={"d-flex align-items-center justify-content-center"}>
                                            <span className={"me-2 text"}>Loading</span>
                                            <Spinner animation="border"
                                                     size={"sm"}
                                                     role="status" className={""}/></div>
                                        : 'Add'}</Button>

                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col className={"ps-0"}>
                    <Card className={"px-4 py-2 "} style={{height: 126}}>
                        <p className={"text-secondary mb-0"}>Add words or phrases to the Vocabulary and Trainer. To add
                            the
                            “Word / Phrase - Translation” to the Trainer, check the box next to it. Remember that you
                            can
                            only add structures to the simulator that do not have special characters.</p>
                    </Card>
                </Col>
            </Row>
            <Card className={"p-4 mt-4"} style={{maxHeight: 520, overflowY: 'scroll'}}>
                {trainingItems.map(({word, id, translation, inProduction}) => {
                    return (
                        <TrainingItem key={id}
                                      word={word}
                                      id={id}
                                      translation={translation}
                                      inProduction={inProduction}
                                      handleChangeInProduction={handleChangeInProduction}
                                      handleRemoveItem={handleRemoveItem}/>
                    )
                })}

            </Card>
        </>
    );
};

export default Trainer;