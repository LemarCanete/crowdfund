import React from 'react';

const ContactUsPage = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', height: '100vh', padding: '20px' }}>
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
                <p style={{ marginBottom: '20px' }}>
                    We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us through any of the following methods:
                </p>
                
                {/* Contact Form */}
                <div style={{ marginBottom: '20px' }}>
                    <h2>Contact Form</h2>
                    <form>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" required />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="subject">Subject:</label>
                            <input type="text" id="subject" name="subject" required />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" required></textarea>
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
                                marginBottom: '10px' 
                            }}
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                
                {/* Email */}
                <div style={{ marginBottom: '20px' }}>
                    <h2>Email</h2>
                    <p>crowdfund.cpepe463@gmail.com</p>
                </div>
                
                {/* Follow Us */}
                <div style={{ marginBottom: '20px' }}>
                    <h2>Follow Us</h2>
                    <p>
                        <a href="https://www.facebook.com/profile.php?id=61561452913237" target="_blank" rel="noopener noreferrer">Facebook</a>
                    </p>
                </div>
                
                {/* Privacy */}
                <div>
                    <h2>Privacy</h2>
                    <p>We respect your privacy. Any information you provide will be used solely to respond to your inquiry and will not be shared with third parties.</p>
                </div>
            </div>
        </div>
    );
}

export default ContactUsPage;
