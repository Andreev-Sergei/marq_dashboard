import React, {useState} from "react";
import {Button, Card, Form, Modal} from "react-bootstrap";

const readURL = file => {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = e => res(e.target.result);
        reader.onerror = e => rej(e);
        reader.readAsDataURL(file);
    });
};

const ImagePicker = ({img, setImg}) => {
    const [openModal, setOpenModal] = useState(false)
    const handleClose = () => setOpenModal(false)
    const handleChangeImage = async (e) => {
        const file = e.target?.files[0]
        const url = await readURL(file)
        setImg({file, url})
    }
    return (
        <Card className={"py-2 d-grid"} style={{alignItems: "center"}}>
            <div className={"d-flex justify-content-between align-self-stretch align-items-center"}>

                <div style={{width: '80%'}}>

                    <Form.Control type="file" style={{maxWidth: 300}} className={'d-inline'}
                                  onInput={handleChangeImage}
                    />

                    {img && <Button variant={"outline-primary"}
                                    className={"ms-4"}
                                    onClick={() => setImg(null)}>
                        Clear
                    </Button>}
                </div>


                <img height={140}
                     className={"p-2"}
                     src={img?.url}
                     alt=""
                     role={'button'}
                     onClick={()=> setOpenModal(!!img?.url)}
                />

            </div>
            <Modal show={openModal} onHide={handleClose} size={"lg"} animation={false}>
                <img
                     className={"p-2"}
                     src={img?.url}
                     alt=""/>
            </Modal>
        </Card>

    );
};

export default ImagePicker;