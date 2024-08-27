import React, {useEffect, useContext, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Dropdown, Form} from "react-bootstrap";
import {createBrand, createDevice, createType, fetchBrands, fetchTypes} from "../../http/deviceAPI";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const CreateBrand = observer(({show, onHide}) => {
    const [value, setValue] = useState('')
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
    }, [])

    const addBrand = async () => {
        try {
            await createBrand({name: device.selectedType.name, description: value}).then(data => {
            device.setBrands(data)
            setValue('')
            onHide()
            })
        } catch (e) {
            alert(e.response.data.message)
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
                    Add Descriptions
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{device.selectedType.name || "GAME"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Enter Description Game (Map or Track)"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                {  device.selectedType.name == null || device.selectedType.name == undefined || value =='' ?
                    <div></div>
                    :
                    <div>
                        <Button variant="outline-success" onClick={addBrand}>Add</Button>
                    </div>
                }

            </Modal.Footer>
        </Modal>
    );
});

export default CreateBrand;
