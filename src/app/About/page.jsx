import React from 'react'

const page = () => {
    return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', width: '80%', maxWidth: '1200px' }}>
                <div style={{ flex: '1', paddingRight: '20px' }}>
                    <img
                        src="/ContactUs.png"
                        alt="About Us"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                </div>
                <div style={{ flex: '1', textAlign: 'justify' }}>
                    <h1 style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center' }}>CrowdFund</h1>
                    <p>
                        Welcome to CrowdFund, your premier platform for bringing innovative ideas to life! Our mission is to empower
                        creators, entrepreneurs, and visionaries to transform their dreams into reality through the collective support
                        of a passionate community.
                    </p>
                    <h2 style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center' }}>Our Mission</h2>
                    <p>
                        Our mission is simple: to provide a platform where creativity and innovation can thrive. We strive to create an
                        inclusive environment where backers and creators can connect, collaborate, and bring extraordinary projects to
                        life.
                    </p>
                    <h2 style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center' }}>Why CrowdFund?</h2>
                    <ul>
                        <li><strong>Community-Driven:</strong> We believe in the power of community to drive change and support new ideas.</li>
                        <li><strong>Transparency:</strong> We prioritize transparency and trust, ensuring that every project is clearly presented with all necessary details.</li>
                        <li><strong>Supportive Network:</strong> Our team is dedicated to providing the support and resources creators need to succeed.</li>
                    </ul>
                    <h2 style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.5em', textAlign: 'center' }}>Join Us</h2>
                    <p>
                        Whether you are an aspiring entrepreneur looking to fund your project, or a backer eager to support the next big
                        idea, CrowdFund is the place for you. Together, we can make amazing things happen.
                    </p>
                    <p style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.2em', textAlign: 'center' }}>
                        Thank you for being a part of the CrowdFund community!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default page