import React, {Component} from 'react';

class Product extends Component {
    render() {
        const productName = this.props.productName;
        const description = this.props.description;
        const price = this.props.price;

        const adminDeleteButton = this.props.deleteProduct ? (
            <button onClick={this.props.deleteProduct}>Delete</button>
        ) : (
            null
        );

        return (
            <div>
                <h3>{productName}</h3>
                <div>{description}</div>
                <div>{price}</div>
                {adminDeleteButton}
            </div>
        );
    }
}

export default Product;