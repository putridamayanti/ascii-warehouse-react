import React from 'react';
import {connect} from "react-redux";
// import moment from "moment";
// import InfiniteScroll from 'react-infinite-scroller';
//
// import AdsItem from '../components/AdsItem';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import EndList from '../components/EndList';

import { fetchAds } from "../actions/AdsAction";
import { fetchProducts } from "../actions/ProductAction";
import {Button, Col, Form, Row, Spinner} from "react-bootstrap";

class ProductScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            sort: 'id',
            products: [],
            end: false
        };

        this.handleScroll   = this.handleScroll.bind(this);
        this.handleSort     = this.handleSort.bind(this);
    }

    componentDidMount() {
        this.fetchProducts(0);
        this.props.fetchAds();

        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    static getDerivedStateFromProps(props, state) {
        if (state.products.length === 0 || state.sort !== props.sort) {
            return {
                products: props.products
            }
        }

        return null;
    }

    fetchProducts(page) {
        this.props.fetchProducts(page);
    }

    handleScroll() {
        const page = this.state.page;
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            console.log('Bottom');
            if (!this.state.end) {
                this.props.fetchProducts(page);
                let products   = [];
                this.state.products.forEach(product => {
                    products.push(product);
                });
                this.props.products.forEach(item => {
                    products.push(item);
                });

                if (this.props.products.length === 0) {
                    this.setState({
                        end: true
                    })
                }
                this.setState({
                    page: page + 1,
                    products: products
                });
            }
        }
    }

    handleSort(event) {
        const value = event.target.value;

        if (this.state.sort !== value){
            this.props.fetchProducts(0, value);
        }
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group onChange={(event) => this.handleSort(event)}>
                        <Form.Label>Sort by</Form.Label>
                        <Form.Control as="select">
                            <option value='id'>Id</option>
                            <option value='size'>Size</option>
                            <option value='price'>Price</option>
                        </Form.Control>
                    </Form.Group>
                </Form>

                { this.props.errors && <h1>{ this.props.errors }</h1> }

                <ProductList products={this.state.products}/>

                { this.props.loading && <Loading/> }

                { this.state.end && <EndList/>}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sort: state.productStore.sort,
        products: state.productStore.products,
        loading: state.productStore.loading,
        error: state.productStore.error
    }
}

export default connect(mapStateToProps, { fetchAds, fetchProducts })(ProductScreen);
