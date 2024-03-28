import axios from 'axios';
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';


export default function ContactForm() {

    const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_qwxb96g', 'Ytemplate_w8agulo', form.current, {
        publicKey: '_0euNy1IazGmvY-60',
      })
      .then(
        (result) => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
    
    };
    return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>

)};


