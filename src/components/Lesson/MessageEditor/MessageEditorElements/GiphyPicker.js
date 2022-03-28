import React, {useEffect, useState} from 'react';
import {Button, Card, Modal} from "react-bootstrap";
import Picker from "@progresso/react-giphy-picker-https";


const GiphyPicker = ({gif, setGif}) => {
    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => setOpenModal(false)

    return (
        <Card className={"py-2 d-grid"} style={{    alignItems: "center"}}>
            <div  className={"d-flex justify-content-between align-self-stretch align-items-center"}>
                <div>

                    <Button onClick={() => setOpenModal(true)}>Choose gif</Button>
                    {gif && <Button variant={"outline-primary"} className={"ms-2"}
                                    onClick={() => setGif(null)}>Clear</Button>}
                </div>


                <img height={150}
                     className={"p-2"}
                     src={gif && gif.fixed_height.url}
                     alt=""/>

            </div>
            <Modal show={openModal} onHide={handleClose} size={"lg"} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose GIPHY</Modal.Title>
                </Modal.Header>
                <Picker
                    style={{minWidth: '100%',minHeight: '80vh',}}
                    apiKey={process.env.REACT_APP_GIPHY_API_KEY}
                    gifStyle={{margin: 5}}
                    onSelected={(gif) => {
                        setGif(gif)
                        handleClose()
                    }}/>
                <Modal.Footer>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>

    );
};

export default GiphyPicker;