import React, {useContext} from 'react';
import {Context} from "../index";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import {useHistory} from 'react-router-dom'
import {fetchDevices} from "../http/deviceAPI";
const NavBar = observer(() => {
    const {user, device} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.setItem('token', '')
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink onClick={() =>{
                    device.setSelectedType({});
                    device.setSelectedTypeBrand({});
                    device.setTypesBrands([]);
                    fetchDevices(null, null,1, device.limit).then(data => {
                    device.setDevices(data.rows)
                    device.setTotalCount(data.count)
                })}} style={{color:'white'}} to={SHOP_ROUTE}>GAME RECORDS</NavLink>
                <a className="ml-auto" style={{cursor: 'pointer'}} href={'https://drive.google.com/file/d/1UMsLzhOD_ISOmEm370SO7SbLFtSdNs0n/view?usp=sharing'} target="_blank">NFS Most Wanted</a>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <div style={{padding: '10px'}}>{user.user.email}</div>
                        {/*<div style={{padding: '10px'}}>POINT: {user.userData.point}</div>*/}
                        <Button
                            variant={"outline-light"}
                            onClick={() => history.push(ADMIN_ROUTE)}
                        >
                            Admin
                        </Button>
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className="ml-2"
                        >
                            Out
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Authorizations</Button>
                    </Nav>
                }
            </Container>
        </Navbar>

    );
});

export default NavBar;
