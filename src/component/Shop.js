import React, { useState } from "react";
import './shop.css';

const Shop = () => {
    const items = [
        { id: 1, src: "/combotsee2.jpg", alt: "combo", name: "Combo Tee", price: 340 },
        { id: 2, src: "/combotsee1.jpg", alt: "combo", name: "Combo Ntsee Hoodie", price: 225 },
        { id: 3, src: "/goat2.jpg", alt: "goat-tees", name: "Goat Tee", price: 330 },
        { id: 4, src: "/goat.jpg", alt: "goat-tees", name: "Goat Tee", price: 300 },
        { id: 5, src: "/Airfoce.jpeg", alt: "nike shoe", name: "Nike Airforce", price: 2100 },
        { id: 6, src: "/air2.jpeg", alt: "nike shoe", name: "Nike Airforce", price: 2400 },
        { id: 7, src: "/oppp.jpg", alt: "Op", name: "Orlando Pirates Jersey", price: 200 },
        { id: 8, src: "/sama.jpg", alt: "samatha", name: "Body Cream", price: 200 },
        { id: 9, src: "/sama2.jpg", alt: "samatha", name: "Samantha Cream", price: 250 },
    ];

    const [cart, setCart] = useState([]);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        name: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);
    const [suggestions, setSuggestions] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.id === id);
            if (existingItem.quantity === 1) {
                return prevCart.filter(cartItem => cartItem.id !== id);
            } else {
                return prevCart.map(cartItem =>
                    cartItem.id === id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
            }
        });
    };

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term) {
            const filtered = items.filter(item =>
                item.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredItems(filtered);
            setSuggestions(filtered.slice(0, 5)); // Show top 5 suggestions
        } else {
            setFilteredItems(items);
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name);
        setFilteredItems([suggestion]);
        setSuggestions([]);
    };

    const handlePaymentDetailsChange = (e) => {
        setPaymentDetails({
            ...paymentDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        if (paymentDetails.name && paymentDetails.cardNumber && paymentDetails.expiryDate && paymentDetails.cvv) {
            setPaymentSuccess(true);
            setShowPaymentForm(false);
            setCart([]);
        } else {
            alert("Please fill in all payment details");
        }
    };

    return (
        <div className="shops">
            <div className="shop-intro">
                <h2>Start Shopping Now</h2>
                <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                />
                {suggestions.length > 0 && (
                    <ul className="suggestions">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="items">
                {filteredItems.map((item) => (
                    <div className="item" key={item.id}>
                        <img src={item.src} alt={item.alt} />
                        <div className="item-info">
                            <p className="item-name">{item.name}</p>
                            <p className="item-price">R{item.price}</p>
                            <button onClick={() => addToCart(item)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart">
                <h3>Your Cart</h3>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    <span>{item.name} - R{item.price} x {item.quantity}</span>
                                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                        <h4>Total: R{totalPrice}</h4>
                        <button onClick={() => setShowPaymentForm(!showPaymentForm)}>Pay with Card</button>

                        {showPaymentForm && (
                            <div className="payment-form">
                                <h3>Enter Payment Details</h3>
                                <form onSubmit={handlePaymentSubmit}>
                                    <div>
                                        <label>Name on Card:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={paymentDetails.name}
                                            onChange={handlePaymentDetailsChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Card Number:</label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={paymentDetails.cardNumber}
                                            onChange={handlePaymentDetailsChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>Expiry Date (MM/YY):</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={paymentDetails.expiryDate}
                                            onChange={handlePaymentDetailsChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label>CVV:</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={paymentDetails.cvv}
                                            onChange={handlePaymentDetailsChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit">Submit Payment</button>
                                </form>
                            </div>
                        )}
                    </>
                )}
            </div>

            {paymentSuccess && (
                <div className="payment-success">
                    <h3>Payment Successful!</h3>
                    <p>Thank you for your purchase.</p>
                </div>
            )}
        </div>
    );
}

export default Shop;
