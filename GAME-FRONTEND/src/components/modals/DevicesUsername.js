import React, {useContext, useEffect, useRef, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const DevicesUsername = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                   Record
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {device.selectedDevicesUsername.map(deviceUsername =>
                    <Row key={deviceUsername.id} >
                        <Col style={{}}>{deviceUsername.name}</Col>
                        <Col style={{}}>{deviceUsername.description}</Col>
                        <Col>
                            {deviceUsername.timestate}
                        </Col>
                    </Row>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
            </Modal.Footer>

        </Modal>
    );
});

export default DevicesUsername;
