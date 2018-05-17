import React, {Component} from 'react';

import Product from './Product';

class ProductList extends Component {
    render() {
        const productList = this.props.productList;

        const productComponents = productList.map((product, index) => {
            return <Product
                productName={product.productName}
                description={product.description}
                price={product.price}
                key={index}
                deleteProduct={this.props.deleteProductFromList(index)}
            />;
        });

        return (
            <div>
                { productComponents }
            </div>
        );

    }
}

export default ProductList;