import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form, Row, Col} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes, fetchTypesBrands} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {
    const {device, user} = useContext(Context)
    const [timeState, setTimeState] = useState('')
    const [linkVideo, setLinkVideo] = useState('')
    const [typeState, setTypeState] = useState({})
    const [file, setFile] = useState(null)
    const [hideDescription, setHideDescription] = useState(false)
    const [hideTime, setHideTime] = useState(false)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const typesBrands = () => {
        fetchTypesBrands(device.selectedType.name).then(data => device.setTypesBrands(data))
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', device.selectedType.name)
        formData.append('description', device.selectedTypeBrand.description)
        formData.append('username', user.user.email)
        formData.append('timestate', timeState)
        formData.append('linkvideo', linkVideo)
        formData.append('img', file)
        createDevice(formData).then(data => onHide())
        setFile(null)
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Event
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{  typeState.name  || 'GAME' }</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => { device.setSelectedType(type); typesBrands(); setHideDescription(true); setTypeState(type)}}
                                    key={type.id}

                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    { hideDescription ?
                        <div>
                            <Dropdown className="mt-2 mb-2">
                                <Dropdown.Toggle>{device.selectedTypeBrand.description || "Description"}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {device.typesBrands.map(brand =>
                                        <Dropdown.Item
                                            onClick={() => {device.setSelectedTypeBrand(brand); setHideTime(true)}}
                                            key={brand.id}
                                        >
                                            {brand.description}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        :
                        <div></div>
                    }
                    { hideTime ?
                        <div>
                            <input type="time" step="0.001" pattern="[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}"
                                   defaultValue="00:00"
                                   className="form-control"
                                   onChange={e => setTimeState(e.target.value)}
                            />
                            <input defaultValue=''
                                   className="form-control"
                                   placeholder={"Add Link Video"}
                                   onChange={e => setLinkVideo(e.target.value)}
                            />
                        </div>
                        :
                        <div></div>
                    }

                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            { hideTime && timeState.length > 2  && file != null ?
                <div>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={addDevice}>Add</Button>
                    </Modal.Footer>
                </div>
                :
                <div></div>
            }

            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>

        </Modal>
    );
});

export default CreateDevice;
