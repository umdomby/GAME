import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ListGroup from "react-bootstrap/ListGroup";
import {fetchDevices, fetchTypesBrands} from "../http/deviceAPI";

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    const typesBrands = () => {
        device.setSelectedTypeBrand({});
        device.setTypesBrands([]);
        fetchTypesBrands(device.selectedType.name).then(data => {
            device.setTypesBrands(data)
        })
    }

    return (
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
    );
});

export default TypeBar;
