import React, {Component} from 'react';

import Product from './Product';

class ProductList extends Component {
    render() {
        const productList = this.props.productList;
        const adminMode = Boolean(this.props.deleteProductFromList);

        const productComponents = productList.map((product, index) => {
            return <Product
                productName={product.productName}
                description={product.description}
                price={product.price}
                key={index}
                deleteProduct={adminMode ? this.props.deleteProductFromList(index) : null}
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