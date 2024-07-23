'use client';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { db } from '@/utils/firebase-config';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaGoogle, FaTiktok } from 'react-icons/fa';

const SocialPage = () => {
    const { currentUser } = useContext(AuthContext);
    const [socialLinks, setSocialLinks] = useState({
        instagram: '',
        twitter: '',
        facebook: '',
        youtube: '',
        google: '',
        tiktok: '',
    });
    const [editMode, setEditMode] = useState({
        instagram: true,
        twitter: true,
        facebook: true,
        youtube: true,
        google: true,
        tiktok: true,
    });

    useEffect(() => {
        const fetchSocialLinks = async () => {
            if (currentUser) {
                try {
                    const userDocRef = doc(db, 'socialLinks', currentUser.uid);
                    const userSnapshot = await getDoc(userDocRef);
                    if (userSnapshot.exists()) {
                        setSocialLinks(userSnapshot.data().socialLinks || {});
                    }
                } catch (error) {
                    console.error('Error fetching social links:', error);
                }
            }
        };

        fetchSocialLinks();
    }, [currentUser]);

    const handleInputChange = (event, key) => {
        setSocialLinks({
            ...socialLinks,
            [key]: event.target.value,
        });
    };

    const toggleEditMode = (key) => {
        setEditMode({
            ...editMode,
            [key]: !editMode[key],
        });
    };

    const handleIconClick = (url) => {
        if (url) {
            window.location.href = url;
        } else {
            alert('No link provided. Please add a link first.');
        }
    };

    const validateUrl = (url, platform) => {
        const patterns = {
            facebook: /^https?:\/\/(www\.)?facebook\.com\/.+$/,
            instagram: /^https?:\/\/(www\.)?instagram\.com\/.+$/,
            twitter: /^https?:\/\/(www\.)?twitter\.com\/.+$/,
            youtube: /^https?:\/\/(www\.)?youtube\.com\/.+$/,
            google: /^https?:\/\/(www\.)?google\.com\/.+$/,
            tiktok: /^https?:\/\/(www\.)?tiktok\.com\/.+$/,
        };

        return patterns[platform].test(url);
    };

    const validateLinks = (links) => {
        for (const [key, url] of Object.entries(links)) {
            if (url && !validateUrl(url, key)) {
                alert(`The ${key.charAt(0).toUpperCase() + key.slice(1)} link is invalid. Please ensure it is a valid ${key} URL.`);
                return false;
            }
        }
        return true;
    };

    const handleSave = async (key) => {
        if (currentUser) {
            if (!validateLinks(socialLinks)) {
                return; // Stop if validation fails
            }
            try {
                const userDocRef = doc(db, 'socialLinks', currentUser.uid);
                const userSnapshot = await getDoc(userDocRef);
                if (userSnapshot.exists()) {
                    await updateDoc(userDocRef, {
                        socialLinks: {
                            ...socialLinks,
                        },
                    });
                } else {
                    await setDoc(userDocRef, {
                        socialLinks,
                    });
                }
                toggleEditMode(key);
                alert('Social link updated successfully');
            } catch (error) {
                alert('Error updating social link');
            }
        }
    };

    const handleClear = async () => {
        if (currentUser) {
            try {
                // Clear the social links in the state
                setSocialLinks({
                    instagram: '',
                    twitter: '',
                    facebook: '',
                    youtube: '',
                    google: '',
                    tiktok: '',
                });

                // Update the Firestore document to remove all social links
                const userDocRef = doc(db, 'socialLinks', currentUser.uid);
                await updateDoc(userDocRef, {
                    socialLinks: {
                        instagram: '',
                        twitter: '',
                        facebook: '',
                        youtube: '',
                        google: '',
                        tiktok: '',
                    },
                });
                
                alert('All social links cleared successfully');
            } catch (error) {
                alert('Error clearing social links');
            }
        }
    };

    const handleSubmit = async () => {
        if (currentUser) {
            if (!validateLinks(socialLinks)) {
                return; // Stop if validation fails
            }
            try {
                const userDocRef = doc(db, 'socialLinks', currentUser.uid);
                await setDoc(userDocRef, {
                    socialLinks,
                });
                alert('Social links submitted successfully');
            } catch (error) {
                alert('Error submitting social links');
            }
        }
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
                        {editMode[key] ? (
                            <input
                                type="text"
                                placeholder={`Enter ${key} link`}
                                value={socialLinks[key]}
                                onChange={(e) => handleInputChange(e, key)}
                                style={{ flex: 1, padding: '5px' }}
                            />
                        ) : (
                            <button
                                onClick={() => toggleEditMode(key)}
                                style={{ flex: 1, padding: '5px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', cursor: 'pointer' }}
                            >
                                Edit {key.charAt(0).toUpperCase() + key.slice(1)} Link
                            </button>
                        )}
                        {!editMode[key] && (
                            <button
                                onClick={() => handleSave(key)}
                                style={{ marginLeft: '10px', padding: '5px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                            >
                                Save
                            </button>
                        )}
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
                            {key === 'tiktok' && <FaTiktok size={40} color="#000" />}
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
