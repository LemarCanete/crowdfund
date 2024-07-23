"use client"; // Add this directive to indicate that this is a client component

import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaGoogle, FaTiktok } from 'react-icons/fa';

const SocialPage = () => {
    const [socialLinks, setSocialLinks] = useState({
        instagram: '',
        twitter: '',
        facebook: '',
        youtube: '',
        google: '',
        tiktok: '',
    });

    const handleInputChange = (event, key) => {
        setSocialLinks({
            ...socialLinks,
            [key]: event.target.value,
        });
    };

    const handleIconClick = (url) => {
        if (url) {
            window.location.href = url;
        } else {
            alert("No link provided. Please add a link first.");
        }
    };

    const handleClear = () => {
        setSocialLinks({
            instagram: '',
            twitter: '',
            facebook: '',
            youtube: '',
            google: '',
            tiktok: '',
        });
    };

    const handleSubmit = () => {
        // Here you can implement the submit functionality, e.g., sending data to a server
        console.log("Submitting social links:", socialLinks);
        alert("Social links submitted!");
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f0f0' }}>
            <div style={{ width: '300px', backgroundColor: '#fff', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '30px' }}>Link Your Account</h2>
                {Object.keys(socialLinks).map((key) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        {key === 'instagram' && <FaInstagram size={30} />}
                        {key === 'twitter' && <FaTwitter size={30} />}
                        {key === 'facebook' && <FaFacebook size={30} />}
                        {key === 'youtube' && <FaYoutube size={30} />}
                        {key === 'google' && <FaGoogle size={30} />}
                        {key === 'tiktok' && <FaTiktok size={30} />}
                        <input
                            type="text"
                            placeholder={`Enter ${key} link`}
                            value={socialLinks[key]}
                            onChange={(e) => handleInputChange(e, key)}
                            style={{ flex: 1, padding: '5px' }}
                        />
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                    <button onClick={handleClear} style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Clear</button>
                    <button onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Submit</button>
                </div>
            </div>
            <div style={{ flex: 1, position: 'relative', padding: '40px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: 'url(/PhonePhoto.jpg)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', position: 'relative', zIndex: 1 }}>
                    {Object.keys(socialLinks).map((key, index) => (
                        <div
                            key={index}
                            style={{
                                width: '150px',
                                height: '150px',
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                flexDirection: 'column',
                            }}
                            onClick={() => handleIconClick(socialLinks[key])}
                        >
                            {key === 'instagram' && <FaInstagram size={40} color="#E1306C" />}
                            {key === 'twitter' && <FaTwitter size={40} color="#1DA1F2" />}
                            {key === 'facebook' && <FaFacebook size={40} color="#4267B2" />}
                            {key === 'youtube' && <FaYoutube size={40} color="#FF0000" />}
                            {key === 'google' && <FaGoogle size={40} color="#4285F4" />}
                            {key === 'tiktok' && <FaTiktok size={40} color="#FF2048" />}
                            <span style={{ marginTop: '10px', fontWeight: 'bold' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        </div>
                    ))}
                </div>
                <div style={{ position: 'absolute', bottom: '100px', right: '20px', textAlign: 'right', color: '#fff' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Your support fuels our mission</h2>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Every contribution brings us closer</h2>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>To reaching our goal and making a difference</h2>
                </div>
            </div>
        </div>
    );
};

export default SocialPage;
