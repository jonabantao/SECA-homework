import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';

import AdminView from './AdminView';
import ShopView from './ShopView';


class HomePage extends Component {

    state = {
        itemCurrentlyOnSale: 'A Hammer',
        editSaleItem: false,
        productList: [],
        isAdminMode: false,
    }

    componentDidMount() {
        axios.get('/products')
            .then(res => this.setState({ productList: res.data }))
            .catch(console.error);
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