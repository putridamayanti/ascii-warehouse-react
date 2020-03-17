import React from 'react';
import {connect} from "react-redux";
import {fetchAds} from "../actions/AdsAction";
import {Card} from "react-bootstrap";

export default class AdsItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ads: []
        }
    }

    render() {
        const { ads } = this.props;

        return (
            <Card style={{ height: 150, marginBottom: 15 }}>
                <Card.Body>
                    <img src={ ads } style={{ height: '100%' }}/>
                </Card.Body>
            </Card>
        );
    }
}
