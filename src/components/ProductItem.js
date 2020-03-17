import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';

export default class ProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { size, face, price, date } = this.props;
        var priceFormated =  new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return (
            <Card style={{ height: 150, marginBottom: 15 }}>
                <Card.Body>
                    <Card.Title style={{ fontSize: size }}>{ face }</Card.Title>
                    <Card.Text>{ priceFormated.format(price)}</Card.Text>
                </Card.Body>
                <Card.Footer style={{ fontSize: 12 }}>
                    <Row>
                        <Col>
                            { date }
                        </Col>
                        <Col>
                            Size : { size }
                        </Col>
                    </Row>
                </Card.Footer>
            </Card>
        );
    }
}
