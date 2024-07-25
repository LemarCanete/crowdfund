import React from 'react';

const AboutPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen p-5 font-sans leading-relaxed">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl">
                <div className="flex-1 lg:pr-5 mb-10 lg:mb-0">
                    <img
                        src="/AboutPage.jpg"
                        alt="About Us"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <div className="flex-1 text-justify">
                    <h1 className="mt-5 lg:mt-0 font-bold text-2xl text-center">CrowdFund</h1>
                    <p className="mt-5">
                        Welcome to CrowdFund, your premier platform for bringing innovative ideas to life! Our mission is to empower
                        creators, entrepreneurs, and visionaries to transform their dreams into reality through the collective support
                        of a passionate community.
                    </p>
                    <h2 className="mt-5 font-bold text-xl text-center">Our Mission</h2>
                    <p className="mt-2">
                        Our mission is simple: to provide a platform where creativity and innovation can thrive. We strive to create an
                        inclusive environment where backers and creators can connect, collaborate, and bring extraordinary projects to
                        life.
                    </p>
                    <h2 className="mt-5 font-bold text-xl text-center">Why CrowdFund?</h2>
                    <ul className="mt-2 list-disc list-inside">
                        <li><strong>Community-Driven:</strong> We believe in the power of community to drive change and support new ideas.</li>
                        <li><strong>Transparency:</strong> We prioritize transparency and trust, ensuring that every project is clearly presented with all necessary details.</li>
                        <li><strong>Supportive Network:</strong> Our team is dedicated to providing the support and resources creators need to succeed.</li>
                    </ul>
                    <h2 className="mt-5 font-bold text-xl text-center">Join Us</h2>
                    <p className="mt-2">
                        Whether you are an aspiring entrepreneur looking to fund your project, or a backer eager to support the next big
                        idea, CrowdFund is the place for you. Together, we can make amazing things happen.
                    </p>
                    <p className="mt-5 font-bold text-lg text-center">
                        Thank you for being a part of the CrowdFund community!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
