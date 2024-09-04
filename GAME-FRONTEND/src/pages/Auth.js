import React, {useContext, useEffect, useRef, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState(localStorage.getItem('pass') || '')
    const [password, setPassword] = useState('')
    const [reCAPTCHA, setReCAPTCHA] = useState(true)

    const ipRef = useRef('')

    useEffect(async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        ipRef.current = res.data.ip
    }, [])

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password, ipRef.current);
            } else {
                data = await registration(email, password, ipRef.current);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const onChange = (value) => {
        setReCAPTCHA(false)
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorizations' : "Registrations"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Add Login..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Add Password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                No Account? <NavLink to={REGISTRATION_ROUTE}>Registration!</NavLink>
                            </div>
                            :
                            <div>
                                Account? <NavLink to={LOGIN_ROUTE}>ENTER!</NavLink>
                            </div>
                        }
                        <ReCAPTCHA
                            sitekey="6Ld-qr0bAAAAAEXsi5tKq5g6Ddwg0oG6Aqmo9mmA"
                            onChange={onChange}
                        />
                        <Button
                            disabled={reCAPTCHA}
                            variant={"outline-success"}
                            onClick={()=> {localStorage.setItem('pass', email); click()}}
                        >
                            {isLogin ? 'Enter' : 'Registration'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
