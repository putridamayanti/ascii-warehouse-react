import React from 'react';
import logo from './logo.svg';
import './App.css';
import './constants/Style';
import { connect} from "react-redux";
import moment from "moment";
import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchProducts } from "./actions/ProductAction";
import ProductItem from './components/ProductItem';
import {Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products : []
        };
    }

    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        const products = this.props.products;

        return (
            <div className="App">
                <Container>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Sort by</Form.Label>
                            <Form.Control as="select">
                                <option>Id</option>
                                <option>Size</option>
                                <option>Price</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    {
                        this.props.loading ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        ) : (
                            <Row>
                                { products.map((item, i) => {
                                    var date = moment(item.date).format("YYYY-MM-DD");
                                    var itemDate = moment(date, "YYYYMMDD").fromNow();

                                    return (
                                        <Col xs={6} key={i}>
                                            <Card style={{ height: 150, marginBottom: 15 }}>
                                                <Card.Body>
                                                    <Card.Title style={{ fontSize: item.size }}>{ item.face }</Card.Title>
                                                    <Card.Text>${ item.price }</Card.Text>
                                                </Card.Body>
                                                <Card.Footer style={{ fontSize: 12 }}>{ itemDate }</Card.Footer>
                                            </Card>
                                        </Col>
                                    );
                                })}

                            </Row>
                        )
                    }
                    { this.props.errors ? (
                        <h1>{ this.props.errors }</h1>
                    ): null}
                </Container>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.productStore.products,
        loading: state.productStore.loading,
        error: state.productStore.error
    }
}

export default connect(mapStateToProps, { fetchProducts })(App);
