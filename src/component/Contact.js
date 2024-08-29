import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const mailtoLink = `mailto:chaukematimba2002@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(message)}%0A%0AFrom: ${name}%0AEmail: ${email}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="contact">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you. Please fill out the form below to send us a message.</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button type="submit">Send Message</button>
            </form>

            <div className="contact-info">
                <p>You can also email us directly at <a href="mailto:chaukematimba2002@gmail.com">chaukematimba2002@gmail.com</a>.</p>
            </div>
        </div>
    );
};

export default Contact;
