'use client';

import { Button, Input, Textarea } from '@nextui-org/react';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBuilding, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ContactUs = () => {
    const user = useSelector((state: any) => state.user.user);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!subject || !message) {
            toast.error('Please fill out all required fields.');
            setIsSubmitting(false);
            return;
        }

        try {
            if (user?._id) {
                const response = await axios.post('/api/nodemailer/contact-us', {
                    subject,
                    message,
                    userId: user._id,
                    userName: user.fullName,
                    userEmail: user.email,
                });

                if (response.status === 200) {
                    toast.success('Your message has been sent successfully.');
                } else {
                    toast.error('Failed to send the message.');
                }
            } else {
                toast.error('User information is missing.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('An error occurred while sending the message.');
        } finally {
            setMessage('');
            setSubject('');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow py-16 px-4">
            <div className="text-center mx-auto">
                <h2 className="text-2xl md:text-4xl font-semibold mb-4">Contact Us</h2>
                <p className="md:text-lg mb-8">
                    Thank you for connecting with Talent Hive, your go-to platform for professional growth and networking. We are here to support your journey, whether you're seeking new job opportunities, building connections, or exploring companies.

                    For any questions, suggestions, or support, please reach out to us. Our team is dedicated to providing a seamless and empowering experience on Talent Hive. We value your feedback, as it helps us continuously improve and create a space where professionals can thrive.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Contact Information Section */}
                <div className="flex flex-col gap-8 p-8 justify-center">
                    <ContactInfo
                        Icon={FaBuilding}
                        title="Address"
                        description="Dhaka, Bangladesh"
                    />
                    <ContactInfo
                        Icon={FaPhone}
                        title="Phone"
                        description="01234567891"
                    />
                    <ContactInfo
                        Icon={FaEnvelope}
                        title="Email"
                        description="talenthiveofficial@gmail.com"
                    />
                </div>

                {/* Contact Form Section */}
                <div className="col-span-2 bg-white text-black p-8 border rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Send Message</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            isRequired
                            className="mb-4"
                            type="text"
                            name="subject"
                            variant="underlined"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                        <Textarea
                            isRequired
                            variant="underlined"
                            labelPlacement="outside"
                            placeholder="Type your Message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            minRows={5}
                            className="rounded-lg bg-white outline-none"
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 rounded-lg bg-sky-500 text-white"
                        >
                            {isSubmitting ? 'Sending...' : 'Send'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Contact Info Component
const ContactInfo = ({ Icon, title, description }) => {
    return (
        <div className="flex items-center gap-4">
            <div className="bg-sky-500 text-white p-2 rounded-full">
                <Icon size={24} />
            </div>
            <div>
                <h4 className="text-lg font-semibold">{title}</h4>
                <p className="text-base">{description}</p>
            </div>
        </div>
    );
};

export default ContactUs;
