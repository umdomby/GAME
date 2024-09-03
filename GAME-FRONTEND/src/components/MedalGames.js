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
                //console.log(device.selectedType.name.replace(/\s+/g, '').toLowerCase())
                //console.log(data[0])
                //console.log(Object.keys(data[0])[0])

                // for (let key in Object.keys(data[0])) {
                //     console.log(key);
                // }


                // for(let key in obj){.... console.log(key);}
                // for (let arr of obj.Kontacts) {
                //     for (let key in arr) {
                //         console.log(key);
                //         console.log(arr[key]);
                //     }
                // }


                // const typename = device.selectedType.name.replace(/\s+/g, '').toLowerCase()
                let arr = []
                //
                // for (let i = 0; i < Object.keys(data[0]).length; i++) {
                //   if( Object.keys(data[0])[i] === device.selectedType.name.replace(/\s+/g, '').toLowerCase()){
                //       console.log(device.selectedType.name.replace(/\s+/g, '').toLowerCase())
                //       //console.log((data[0])[i])
                //       //arr.push(JSON.parse(data[i]))
                //   }
                // }

                //console.log(data[0])




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

                console.log(arr)

                setDataUsers(arr.sort((a, b) => b.gold - a.gold));



                // for(let i = 0; i < data.length; i++){
                //     console.log(data[i])
                // }

                //setDataUsers2(arr)
                // for(let i = 0; i < dataUsers2.length; i++){
                //     console.log(dataUsers2[i].gold)
                // }
            })
        }

    }, [device.selectedType.name])

    return (
        <div>
            {device.selectedType.name === undefined ? '' :
                <div>
                    <div style={{marginTop: '20px'}}></div>
                    <Row>
                        <Col style={{}}>NFSMW</Col>
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
            }
        </div>
    )

});
export default MedalGames;