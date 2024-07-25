"use client";
import React, { useState } from 'react';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { FaFacebook } from 'react-icons/fa';
import { db } from '@/utils/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import emailjs from 'emailjs-com';

emailjs.init('2qSkl3uDgUB7rmuwY');

const ContactUsPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Send email via EmailJS
        try {
            const emailResult = await emailjs.send('service_ndgyaab', 'template_2uvhcsk', {
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
        <div className="flex flex-col lg:flex-row items-start p-5 lg:p-20 max-w-6xl mx-auto">
            {/* Left Section - Image */}
            <div className="flex-1 mb-10 lg:mb-0 lg:mr-10">
                <img 
                    src="/ContactUs.png"
                    alt="Contact Us" 
                    className="w-full h-auto rounded-lg"
                />
            </div>
            
            {/* Right Section - Contact Form and Information */}
            <div className="flex-1 lg:pl-10">
                <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
                
                {/* Introduction */}
                <p className="mb-6">
                    We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us through any of the following methods.
                </p>
                
                {/* Contact Form */}
                <div className="mb-8 pb-8 border-b border-gray-300">
                    <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="flex items-center">
                            <BsFillPersonCheckFill className="mr-2 text-2xl" />
                            <label htmlFor="name" className="flex-1">Name:</label>
                            <input type="text" id="name" name="name" required className="ml-2 p-2 border border-gray-300 rounded flex-1" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex items-center">
                            <MdEmail className="mr-2 text-2xl" />
                            <label htmlFor="email" className="flex-1">Email:</label>
                            <input type="email" id="email" name="email" required className="ml-2 p-2 border border-gray-300 rounded flex-1" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="subject" className="flex-1">Subject:</label>
                            <input type="text" id="subject" name="subject" required className="ml-2 p-2 border border-gray-300 rounded flex-1" value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </div>
                        <div className="flex items-start">
                            <label htmlFor="message" className="flex-1">Message:</label>
                            <textarea id="message" name="message" required className="ml-2 p-2 border border-gray-300 rounded flex-1 h-32" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="bg-black text-white border-none py-2 px-4 cursor-pointer rounded mt-4"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
                
                {/* Email */}
                <div className="mb-8 pb-8 border-b border-gray-300">
                    <div className="flex items-center mb-4">
                        <MdEmail className="mr-2 text-2xl" />
                        <h2 className="text-2xl font-semibold">Email</h2>
                    </div>
                    <p>crowdfund.cpepe463@gmail.com</p>
                </div>
                
                {/* Follow Us */}
                <div className="mb-8 pb-8 border-b border-gray-300">
                    <div className="flex items-center mb-4">
                        <FaFacebook className="mr-2 text-2xl" />
                        <h2 className="text-2xl font-semibold">Follow Us</h2>
                    </div>
                    <p>
                        <a href="https://www.facebook.com/profile.php?id=61561452913237" target="_blank" rel="noopener noreferrer" className="text-blue-500">Facebook</a>
                    </p>
                </div>
                
                {/* Privacy */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold">Privacy</h2>
                    <p>We respect your privacy. Any information you provide will be used solely to respond to your inquiry and will not be shared with third parties.</p>
                </div>
            </div>
        </div>
    );
}

export default ContactUsPage;
