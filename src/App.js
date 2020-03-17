import React from 'react';
import './App.css';
import './constants/Style';
import { connect} from "react-redux";
import { Route, BrowserRouter as Router } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import ProductScreen from './screens/ProductScreen';

import { fetchAds } from "./actions/AdsAction";

import {Col, Container, Row} from "react-bootstrap";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchAds();
    }

    render() {

        return (
            <div className="App">
                <div style={{ background: `linear-gradient(#654ea3, #eaafc8)`, color: '#fff', padding: 50 }}>
                    <Container>
                        <Row>
                            <Col lg={6}>
                                <h1>Products Grid</h1>

                                <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to
                                    peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

                                <p>But first, a word from our sponsors:</p>
                            </Col>
                            <Col lg={6}>
                                <img src={ this.props.ads } style={{ borderWidth: 2, borderColor: '#fff', borderStyle: 'solid'}}/>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Container style={{ padding: 50 }}>
                    <Router>
                        <Route exact path="/" component={ ProductScreen }/>
                    </Router>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ads         : state.adsStore.ads,
        loading     : state.productStore.loading,
        error       : state.productStore.error
    }
}

export default connect(mapStateToProps, { fetchAds })(App);
