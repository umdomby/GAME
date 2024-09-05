import {observer} from "mobx-react-lite";
import {getDataUsers} from "../http/userAPI";
import {fetchBrands, fetchTypes} from "../http/deviceAPI";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../index";
import {Col, Row} from "react-bootstrap";


const MedalGames = observer(() => {
    const {device, user} = useContext(Context)
    const [dataUsers, setDataUsers] = useState([])

    useEffect(() => {
        if(device.selectedType.name !== undefined) {
            getDataUsers().then(data => {
                let arr = []

                if(device.selectedType.name.replace(/\s+/g, '').toLowerCase() === 'nfsmostwanted2005'){
                    for (let i = 0; i < data.length; i++) {
                        arr.push(JSON.parse(data[i].nfsmostwanted2005))
                    }
                }
                if(device.selectedType.name.replace(/\s+/g, '').toLowerCase() === 'nfsmostwanted20055laps'){
                    for (let i = 0; i < data.length; i++) {
                        arr.push(JSON.parse(data[i].nfsmostwanted20055laps))
                    }
                }
                if(device.selectedType.name.replace(/\s+/g, '').toLowerCase() === 'nfsshift'){
                    for (let i = 0; i < data.length; i++) {
                        arr.push(JSON.parse(data[i].nfsshift))
                    }
                }
                if(device.selectedType.name.replace(/\s+/g, '').toLowerCase() === 'nfsunderground'){
                    for (let i = 0; i < data.length; i++) {
                        arr.push(JSON.parse(data[i].nfsunderground))
                    }
                }
                if(device.selectedType.name.replace(/\s+/g, '').toLowerCase() === 'nfscarbon'){
                    for (let i = 0; i < data.length; i++) {
                        arr.push(JSON.parse(data[i].nfscarbon))
                    }
                }
                setDataUsers(arr.sort((a, b) => b.gold - a.gold));
            })
        }else {
            getDataUsers().then(data => {
                let arr = []
                for (let i = 0; i < data.length; i++) {
                    arr.push(JSON.parse(data[i].allmedal))
                    //console.log(JSON.parse(data[i].allmedal))
                }
                setDataUsers(arr.sort((a, b) => b.gold - a.gold));
            })
        }

    }, [device.selectedType.name])

    return (
        <div>

                <div>
                    <div style={{marginTop: '20px'}}></div>
                    <Row>
                        <Col style={{}}></Col>
                        <Col style={{}}>Gold</Col>
                        <Col style={{}}>Silver</Col>
                        <Col style={{}}>Bronze</Col>
                        <Col style={{}}>Pl</Col>
                    </Row>
                    {dataUsers.map((users, index) =>
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

        </div>
    )

});
export default MedalGames;