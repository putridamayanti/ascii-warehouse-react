import React from 'react';

export default class ProductItem extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <p>{ this.props.size }</p>
            </div>
        );
    }
}
