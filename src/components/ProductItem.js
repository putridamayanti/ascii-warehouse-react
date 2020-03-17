import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';

export default class ProductItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { size, face, price, date } = this.props;

        return (
            <Card style={{ height: 150, marginBottom: 15 }}>
                <Card.Body>
                    <Card.Title style={{ fontSize: size }}>{ face }</Card.Title>
                    <Card.Text>${ price }</Card.Text>
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
