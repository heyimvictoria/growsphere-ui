import axios from "axios";
import React, { useState } from "react";

const ContactFormRestAPI =  () => {

const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = 'service_qwxb96g';
    const templateId = 'template_w8agulo';
    const publicKey = '_0euNy1IazGmvY-60';

    const inquiryData = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
            name: name,
            email: email,
            to_name: 'GrowSphere Support',
            message: message,
        }
      };

    try {
      const res = await axios.post("https://api.emailjs.com/v1.0/email/send", inquiryData);
      console.log(res.inquiryData);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
    }
    }
  
    return (
        <div>
        <form onSubmit={handleSubmit} className='contactForm'>
        <label>Name</label>
        <input 
        type="text" 
        placeholder="Your Name" 
        value={name}
        onChange={(e) => setName(e.target.value)}/>
  
        <label>Email</label>
        <input 
        type="text" 
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
  
        <label>Message</label>
        
        <textarea 
        cols="30"
        rows="10"
        value={message}
        placeholder='Please provide as much detail as possible'
        onChange={(e) => setMessage(e.target.value)}
        >
  
        </textarea>
        <button type="submit" >Submit</button>
      </form>
      </div>
    )

    }

export default ContactFormRestAPI