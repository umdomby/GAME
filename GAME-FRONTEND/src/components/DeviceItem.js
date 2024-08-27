import React, {useContext, useState} from 'react';
import {Card, Row, Col, NavLink, Button} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Modal from 'react-modal';
import DevicesUsername from "./modals/DevicesUsername";
import {fetchDevicesUsername} from "../http/deviceAPI";
import {Context} from "../index";
const moment = require('moment');


const DeviceItem = ({devicer}) => {
    const {device} = useContext(Context)
    const [showModal, setShowModal] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [devicesUsername, setDevicesUsername] = useState([])

    const customStyles = {
        content : {
            // style={{ marginLeft: 'auto', marginRight: 'auto' }}
        },
        overlay: {
            zIndex: 999999999,
            backgroundColor: 'transparent'
        }
    };

    const devicesUsernameFunc = (username) => {
        fetchDevicesUsername(username).then(data => {
            setDevicesUsername(data)
            device.setSelectedDevicesUsername(data);
            setDeviceVisible(true)
        })
    }

    return (


            <Card style={{width: '100%'}} border={"light"}>
                <Row style={{width:'100%'}}>
                    <Col md={2} className={"mt-3"}>
                        <div className='jook-container'>
                            <Modal
                                style={customStyles}
                                ariaHideApp={false}
                                isOpen={showModal}
                                onRequestClose={()=>setShowModal(false)}
                            >
                                <div>
                                    <Image style={{ margin: '0 auto', display: 'block', width:"55%", cursor: 'pointer' }} src={process.env.REACT_APP_API_URL + 'image/full/' + devicer.img}  onClick={() => setShowModal(false)}/>
                                </div>
                                <div>
                                    <Col style={{}}>Create {moment(devicer.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Col>
                                </div>
                                <div>
                                    <Col>
                                        Link Video <a style={{cursor: 'pointer'}} href={devicer.linkvideo} target="_blank">{devicer.linkvideo}</a>
                                    </Col>
                                </div>
                            </Modal>
                        </div>
                    </Col>

                    <Col style={{}}>{devicer.name}</Col>
                    <Col style={{}}>{devicer.description}</Col>
                    <Col style={{}}>
                        <NavLink
                            style={{cursor: 'pointer'}}
                            onClick={() => {devicesUsernameFunc(devicer.username)}}
                        >{devicer.username} </NavLink>
                    </Col>
                    <Col style={{}}> {devicer.timestate.substring(3)} </Col>
                    <Col style={{cursor: 'pointer'}}>  <Image width={50} height={20} src={process.env.REACT_APP_API_URL + 'image/small/' + devicer.img} onClick={() => setShowModal(true)}/></Col>
                </Row>

                <DevicesUsername show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
            </Card>

    );
};

export default DeviceItem;
