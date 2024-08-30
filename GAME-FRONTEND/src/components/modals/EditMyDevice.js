import React, {useContext, useEffect, useRef, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Col, Row} from "react-bootstrap";
import {Context} from "../../index";
import {
    deviceDelete,
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
    const timestateRef = useRef('');
    const [idRend, setIdRend] = useState({})

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
        updateDeviceFile(formData).then(data => setRend(true))
    }

    const fLinkVideo = (id) => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('linkvideo', linkVideo)
        updateLinkVideo(formData).then(data => setRend(true))
    }

    const FormDataTimestate = (id, description, timestate) => {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('timestate', timestate)
        formData.append('description', description)
        updateDeviceTimestate(formData).then( data => {
            setRend(true)
            alert(data.description + ' изменен на: ' + data.timestate)})
    }
    const FormDataDelete = (id, description, timestate) => {
        const conf = window.confirm("Подтверждаете удаление " + description +" "+ timestate +" ?");
        if (conf) {
            const formData = new FormData()
            formData.append('id', id)
            deviceDelete(formData).then(data => setRend(true))
        }
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
                {device.myDevices.map( deviceMap=>

                    <ListGroup.Item
                        style={{cursor: 'pointer'}}
                        key={deviceMap.id}
                    >
                        <Row>
                            <Col>{deviceMap.name}</Col>
                            <Col>{deviceMap.description}</Col>
                            <Col><input type="text" placeholder="Link video"
                                        defaultValue={deviceMap.linkvideo}
                                        onChange={ e => setLinkVideo(e.target.value)} />
                                <Button style={{marginLeft:'5px'}} onClick={() => fLinkVideo(deviceMap.id)}>Edit</Button>
                            </Col>
                            <Col><input type="file"  onChange={ e => FormDataFile(deviceMap.id, deviceMap.img, e.target.files[0])} /></Col>
                            <Col>
                                    <input
                                        type="time"
                                        step="0.001"
                                        pattern="[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}"
                                        defaultValue={deviceMap.timestate}
                                        onChange={e => {
                                             setIdRend({id:deviceMap.id})
                                             timestateRef.current = e.target.value
                                        }}
                                    />
                                <input disabled={idRend.id === deviceMap.id  ? false : true} type="submit" value="Add" onClick={() => FormDataTimestate(deviceMap.id, deviceMap.description, timestateRef.current)}/>
                                <Button style={{marginLeft: '5px'}} onClick={() => FormDataDelete(deviceMap.id, deviceMap.description, deviceMap.timestate)}>Del</Button>
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
