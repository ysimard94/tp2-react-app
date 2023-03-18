import './App.css';
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Products from './components/Products'
import Form from './components/Form';
import List from './components/List';
import Edit from './components/Edit';

function App() {
    const [products, setProducts] = useState([]);

    // Va ajouter un produit au tableau products avec les valeurs retournées
    const addProduct = (name, description, price, category) => {
        const newProduct = {
            name,
            description,
            price,
            category
        }

        const id = Math.floor(Math.random() * 1000)
        newProduct.id = id;

        setProducts([...products, newProduct])
    };

    // Va modifier un produit du tableau products avec les valeurs retournées
    const editProduct = (id, name, description, price, category) => {
        products.map((product) => {
            if (product.id === id) {
                product.name = name;
                product.description = description;
                product.price = price;
                product.category = category;
            }
        })
    };

    // Va supprimer un produit du tableau products
    const deleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id))
    };

    return (
        <BrowserRouter>
            <h1 className='title'>Product Manager</h1>
            <div className="container">
                <Header />
                <Routes>
                    <Route path="/" element={<><Home /><Form addProduct={addProduct} /></>} />
                    <Route path="/products" element={<><Products /><List products={products} onDelete={deleteProduct} /></>} />
                    <Route path="/edit/:id" element={<><Edit products={products} editProduct={editProduct} /></>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;