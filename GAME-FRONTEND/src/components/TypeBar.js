import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import {fetchBrands, fetchDevices, fetchTypes, fetchTypesBrands} from "../http/deviceAPI";
import {getDataUsers} from "../http/userAPI";
import {Col, Row} from "react-bootstrap";
import MedalGames from "./MedalGames";

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        // console.log(device.selectedType)
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

            <MedalGames/>
        </div>



    );
});

export default TypeBar;
