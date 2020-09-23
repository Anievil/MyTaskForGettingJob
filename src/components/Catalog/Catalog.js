import React, { Component } from 'react'
import style from './CatalogStyle.module.scss'
import ItemCard from './ItemCard/ItemCard'
import getProduct from '../../api/products'

class Catalog extends Component {
    constructor(props){
        super(props);
        this.state= {
            products: [],
            isFetching: false
        };
    }

    // заполнение массива products данными о продуктах 
    fetchProducts = async () => {
        this.setState({
            isFetching: true,
        })
        const info = await getProduct();
        this.setState({
            products: [ ...this.state.products, ...info],
            isFetching: false,
        })
    }

    // при первом рендере выполняет метод fetchProducts
    componentDidMount(){
        this.fetchProducts();  
    }

    //рендер карточек с товарами 
    mapProducts(){
        return this.state.products.map((product) =>{
            return <ItemCard {...product} key={product.id} token={this.props.token} isLogin={this.props.isLogin}/>;
        });
    }

    render() {
        return (
            <div className={style.catalogList}>
                {this.mapProducts()}
            </div>
        )
    }
}

export default Catalog;