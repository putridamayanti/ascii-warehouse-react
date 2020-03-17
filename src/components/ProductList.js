import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import moment from 'moment';

import ProductItem from './ProductItem';
import AdsItem from './AdsItem';
import {connect} from "react-redux";
import {fetchAds} from "../actions/AdsAction";

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products,
            indexAds: 0,
            ads: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        var ads = [];
        if (props.ads !== '') {
            state.ads.forEach(item => {
                ads.push(item);
            });
            if (ads.indexOf(props.ads) === -1) {
                ads.push(props.ads);
            }
        }
        return {
            ads: ads
        }
    }

    insertAds(index) {
        if (this.state.indexAds < index) {
            this.setState(  {
                indexAds: index+1
            });
            this.props.fetchAds();
        }
    }

    render() {
        const { products } = this.props;

        return (
            <div>
                <Row>
                    { products !== null && products.map((product, index) => {
                        var date = moment(product.date).format("YYYY-MM-DD");
                        var itemDate = moment(date, "YYYYMMDD").fromNow();
                        if ((index + 1) % 20 === 0) {
                            this.insertAds(index+1);
                        }
                        var ind = Math.floor((Math.random() * this.state.ads.length));
                        return (
                            <>
                                <Col xs={6} key={index}>
                                    <ProductItem size={product.size} face={product.face} price={product.price} date={itemDate}/>
                                </Col>
                                { (index + 1) % 20 === 0 && <Col xs={6} key={'ads-' + index}>
                                    <AdsItem ads={this.state.ads[ind]}/>
                                </Col> }
                            </>
                        );
                    })}
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ads: state.adsStore.ads,
        error: state.productStore.error
    }
}

export default connect(mapStateToProps, { fetchAds })(ProductList);
