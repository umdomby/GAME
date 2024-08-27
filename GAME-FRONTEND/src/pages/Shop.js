import React, {useContext, useEffect, useState} from 'react';
import {Container, Spinner} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";
import {check} from "../http/userAPI";
import jwt_decode from "jwt-decode";

const Shop = observer(() => {
    const {device, user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(jwt_decode(data.token))
            user.setIsAuth(true)
            //user.setUserData(data.user)
        })
            //.finally(() => setLoading(false))
    }, [])

    // if (loading) {
    //     return <Spinner animation={"grow"}/>
    // }

    useEffect(() => {
        fetchTypes().then(data => {device.setTypes(data)})
        fetchBrands().then(data => {device.setBrands(data)})
        fetchDevices(null, null,1, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })

    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.name, null, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.selectedType.name])


    useEffect(() => {
        fetchDevices(device.selectedType.name, device.selectedTypeBrand.description, device.page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedTypeBrand.description])

    return (
        <Container>
            <Row className="mt-2">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
