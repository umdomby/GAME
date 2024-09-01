import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import {fetchBrands, fetchDevices, fetchTypes, fetchTypesBrands} from "../http/deviceAPI";
import {getDataUsers} from "../http/userAPI";
import {Col, Row} from "react-bootstrap";

const TypeBar = observer(() => {
    const {device, user} = useContext(Context)
    const [dataUsers, setDataUsers] = useState([])
    const [dataUsers2, setDataUsers2] = useState([])

    useEffect(() => {
        //getDataUsers().then(data => setDataUsers(data))


        getDataUsers().then(data => {

            let arr = []
            for(let i = 0; i < data.length; i++){
                arr.push(JSON.parse(data[i].medal))
                //console.log(arr[i])
            }

            // for(let i = 0; i < arr.length; i++){
            //     console.log(arr[i].gold)
            // }
            setDataUsers2(arr.sort((a, b) => b.gold - a.gold));
            //setDataUsers2(arr)
            // for(let i = 0; i < dataUsers2.length; i++){
            //     console.log(dataUsers2[i].gold)
            // }
        })

        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const typesBrands = () => {
        device.setSelectedTypeBrand({});
        device.setTypesBrands([]);
        fetchTypesBrands(device.selectedType.name).then(data => {
            device.setTypesBrands(data)
        })
    }

    return (
        <div>
        <ListGroup>
            <button onClick={()=> {
                device.setSelectedType({});
                device.setSelectedTypeBrand({});
                device.setTypesBrands([]);
                fetchDevices(null, null, 1, device.limit).then(data => {
                    device.setDevices(data.rows)
                    device.setTotalCount(data.count)
                })
            }
            }>All</button>

            {device.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id}
                    onClick={() => {device.setSelectedType(type); typesBrands()}}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
        <div style={{marginTop:'20px'}}></div>

            {dataUsers.map(users  =>
                <div>
                    {users.email}
                    {users.point}
                    {/*{JSON.parse(JSON.stringify(users.medal.gold))}*/}
                </div>
            )}

        <div style={{marginTop:'20px'}}></div>
            <Row>
                <Col style={{}}></Col>
                <Col style={{}}>Gold</Col>
                <Col style={{}}>Silver</Col>
                <Col style={{}}>Bronze</Col>
                <Col style={{}}>Pl</Col>
            </Row>
            {dataUsers2.map((users, index) =>
                <div key={index}>
                    <Row>
                        <Col style={{}}>{users.username}</Col>
                        <Col style={{}}>{users.gold}</Col>
                        <Col style={{}}>{users.silver}</Col>
                        <Col style={{}}>{users.bronze}</Col>
                        <Col style={{}}>{users.platinum}</Col>
                    </Row>
                </div>
            )}

        </div>


    );
});

export default TypeBar;
