import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Col, Row} from "react-bootstrap";
import {Context} from "../../index";
import {
    fetchMyDevices,
    updateDeviceFile,
    updateDeviceTimestate, updateLinkVideo
} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import ListGroup from "react-bootstrap/ListGroup";


const EditMyDevice = observer(({show, onHide}) => {
    const {device, user} = useContext(Context)
    const [rend, setRend] = useState(false)
    const [linkVideo, setLinkVideo] = useState('')

    useEffect(() => {
        fetchMyDevices(user.user.email).then(data => {
            device.setMyDevices(data)
            setRend(false)
        })
    },[onHide, rend])


    const FormDataFile = (id, imgDel, file) => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('imgdel', imgDel)
        formData.append('file', file)
        updateDeviceFile(formData).then( data => setRend(true))
    }

    const fLinkVideo = (id) => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('linkvideo', linkVideo)
        updateLinkVideo(formData).then(data => setRend(true))
    }

    const FormDataTimestate = (id, timestate) => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('timestate', timestate)
        updateDeviceTimestate(formData).then( data => setRend(true))
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Event
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {device.myDevices.map((device, index) =>
                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        key={index}
                    >
                        <Row>
                            <Col>{device.name}</Col>
                            <Col>{device.description}</Col>
                            <Col><input type="text" placeholder="Link video"
                                        defaultValue={device.linkvideo}
                                        onChange={ e => setLinkVideo(e.target.value)} />
                                <Button style={{marginLeft:'5px'}} onClick={() => fLinkVideo(device.id)}>Edit</Button>
                            </Col>
                            <Col><input type="file"  onChange={ e => FormDataFile(device.id, device.img, e.target.files[0])} /></Col>
                            <Col>
                                <input
                                    type="time"
                                    step="0.001"
                                    className="form-control"
                                    defaultValue={device.timestate}
                                    onChange={e => FormDataTimestate(device.id, e.target.value)}
                                />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>

        </Modal>
    );
});

export default EditMyDevice;
