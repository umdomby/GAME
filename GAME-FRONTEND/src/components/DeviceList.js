import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Col, Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    return (
        <div>
            <Row>
                <Col>GAME</Col>
                <Col>TRACK</Col>
                <Col>USER</Col>
                <Col>TIME</Col>
                <Col>IMAGE-VIDEO</Col>
            </Row>
            <Row className="d-flex">
                {device.devices.map(devicer =>
                    <DeviceItem key={devicer.id} devicer={devicer}/>
                )}
            </Row>
        </div>
    );
});
export default DeviceList;
