import axios from "axios";
import React, { useState } from "react";

const ContactFormRestAPI =  () => {

const [conName, setConName] = useState('');
  const [conEmail, setConEmail] = useState('');
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
            name: conName,
            email: conEmail,
            to_name: 'GrowSphere Support',
            message: message,
        }
      };

    try {
      const res = await axios.post("https://api.emailjs.com/v1.0/email/send-form", inquiryData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.inquiryData);
      setConName('');
      setConEmail('');
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
        value={conName}
        onChange={(e) => setConName(e.target.value)}/>
  
        <label>Email</label>
        <input 
        type="text" 
        placeholder="Your Email"
        value={conEmail}
        onChange={(e) => setConEmail(e.target.value)} />
  
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