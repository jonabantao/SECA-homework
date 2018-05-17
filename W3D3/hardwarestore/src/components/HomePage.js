import React, {Component} from 'react';
import AdminView from './AdminView';
import ShopView from './ShopView';

import _ from 'lodash';

class HomePage extends Component {

    state = {
        itemCurrentlyOnSale: 'A Hammer',
        editSaleItem: false,
        productList: [
            {
                productName: 'Hammer',
                description: 'Itsa hammer',
                price: 12.3,
            },
            {
                productName: 'Nail',
                description: 'Itsa nail',
                price: 0.12,
            }
        ],
        isAdminMode: false,
    }

    toggleEditSaleItem = () => {
        const editSaleItem = !this.state.editSaleItem;
        this.setState({editSaleItem});
    }

    toggleAdminMode = () => {
        this.setState({ isAdminMode: !this.state.isAdminMode })
    }

    handleItemCurrentlyOnSaleChange = (event) => {
        const itemCurrentlyOnSale = event.target.value
        this.setState({itemCurrentlyOnSale})
    }

    displayEditSaleItemElement = () => {
        if (this.state.editSaleItem) {
            return (
                <div>
                    <input
                        value={this.state.itemCurrentlyOnSale}
                        type="text"
                        onChange={this.handleItemCurrentlyOnSaleChange}/>
                </div> 
            );
        }

        return null;
    }

    addNewProductToProductList = (newProduct) => {
        const productList = [...this.state.productList];
        productList.push(newProduct);
        this.setState({
            productList
        });
    };

    deleteProductFromList = (index) => {
        return () => {
            const copiedProducts = _.merge([], this.state.productList);
            copiedProducts.splice(index, 1);

            this.setState({ productList: copiedProducts });
        };
    }

    renderViewOrAdmin = () => {
        return this.state.isAdminMode ? (
            <AdminView 
                productList={this.state.productList} 
                addNewProductToProductList={this.addNewProductToProductList}
                deleteProductFromList={this.deleteProductFromList}
            />
        ) : (
            <ShopView productList={this.state.productList} />
        );
    }

    render() {
        return (
            <div>
                <h1>My Hardware Store</h1>
                <div>
                    <span>Currently On Sale: {this.state.itemCurrentlyOnSale}!</span>
                    <span>
                <button onClick={this.toggleEditSaleItem}>
                  {this.state.editSaleItem ? 'Hide' : 'Edit Sale Item'}
                </button>
              </span>
                    {this.displayEditSaleItemElement()}
                    {this.renderViewOrAdmin()}
                </div>
                <button onClick={this.toggleAdminMode}>Switch to {this.state.isAdminMode ? 'User' : 'Admin'}</button>
            </div>
        );
    }
}

export default HomePage;