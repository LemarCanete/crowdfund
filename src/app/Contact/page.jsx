"use client";
import React, { useState } from 'react';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';
import { db } from '@/utils/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import emailjs from 'emailjs-com';


emailjs.init('RwNa38prtPxqOLj1u');

const ContactUsPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send email via EmailJS
        try {
            const emailResult = await emailjs.send('service_imzclyg', 'template_4oupmxa', {
                name,
                email,
                subject,
                message
            });
            console.log("Email sent successfully", emailResult.status, emailResult.text);
        } catch (error) {
            console.error("Error sending email: ", error);
            alert('Failed to send email. Please try again.');
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "messages"), {
                name,
                email,
                subject,
                message,
                timestamp: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
            // Optionally reset the form or show a success message
            alert('Message sent successfully!');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Left Section - Image */}
            <div style={{ flex: '1 1 50%', marginRight: '20px' }}>
                <img 
                    src="/contactUS.png"
                    alt="Contact Us" 
                    style={{ width: '100%', maxWidth: '100%', height: 'auto', borderRadius: '10px' }} 
                />
            </div>
            
            {/* Right Section - Contact Form and Information */}
            <div style={{ flex: '1 1 50%', paddingLeft: '20px' }}>
                <h1>Contact Us</h1>
                
                {/* Introduction */}
                <p>
                    We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us through any of the following methods.
                </p>
                
                {/* Contact Form */}
                <div style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
                    <h2>Contact Form</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <BsFillPersonCheckFill style={{ marginRight: '10px', fontSize: '1.5em' }} />
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required style={{ marginLeft: '10px', flex: '1' }} value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <MdEmail style={{ marginRight: '10px', fontSize: '1.5em' }} />
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required style={{ marginLeft: '10px', flex: '1' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center' }}>
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" id="subject" name="subject" required style={{ marginLeft: '10px', flex: '1' }} value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'start' }}>
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" required style={{ marginLeft: '10px', flex: '1', minHeight: '100px' }} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <button 
                            type="submit" 
                            style={{ 
                                backgroundColor: 'black', 
                                color: 'white', 
                                border: 'none', 
                                padding: '10px 20px', 
                                cursor: 'pointer', 
                                borderRadius: '5px',
                                marginTop: '10px' 
                            }}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                
                {/* Email */}
                <div style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <MdEmail style={{ marginRight: '10px', fontSize: '1.5em' }} />
                        <h2>Email</h2>
                    </div>
                    <p>crowdfund.cpepe463@gmail.com</p>
                </div>
                
                {/* Follow Us */}
                <div style={{ marginBottom: '30px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <FaFacebook style={{ marginRight: '10px', fontSize: '1.5em' }} />
                        <h2>Follow Us</h2>
                    </div>
                    <p>
                        <a href="https://www.facebook.com/profile.php?id=61561452913237" target="_blank" rel="noopener noreferrer">Facebook</a>
                    </p>
                </div>
                
                {/* Privacy */}
                <div style={{ marginBottom: '30px' }}>
                    <h2>Privacy</h2>
                    <p>We respect your privacy. Any information you provide will be used solely to respond to your inquiry and will not be shared with third parties.</p>
                </div>
            </div>
        </div>
    );
}

export default ContactUsPage;
