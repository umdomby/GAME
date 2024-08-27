import React, {useContext, useEffect, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

//Number(device.timestate.replace(/[\:]/g, ''))
//Number(firstItem.timestate.replace(/[\:]/g, ''))

//Number(secondItem.timestate.replace(/[\:]/g, ''))
//.sort((firstItem, secondItem) => Number(firstItem.timestate.replace(/[\:.]/g, '')) - Number(secondItem.timestate.replace(/[\:.]/g, '')))}
const DeviceList = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex">
            {device.devices.map(devicer =>
                <DeviceItem key={devicer.id} devicer={devicer}/>
            )}
        </Row>
    );
});

export default DeviceList;
