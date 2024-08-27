import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <Row className="d-flex">
                    {device.typesBrands.map(brand =>
                        <Card
                            style={{cursor:'pointer'}}
                            key={brand.id}
                            className="p-3"
                            onClick={() => device.setSelectedTypeBrand(brand)}
                            border={brand.id === device.selectedTypeBrand.id ? 'danger' : 'light'}
                        >
                            {brand.description}
                        </Card>
                    )}
        </Row>
    );
});

export default BrandBar;
