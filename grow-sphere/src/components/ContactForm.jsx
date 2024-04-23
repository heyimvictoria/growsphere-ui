import React, {useState}  from 'react';
import emailjs from '@emailjs/browser';




const ContactForm = () => {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

// publicKey displaying on frontend ok, spammers only able to send your templates with your content.
    const serviceId = 'service_qwxb96g';
    const templateId = 'template_w8agulo';
    const publicKey = '_0euNy1IazGmvY-60';


    const templateParams = {
      name: name,
      email: email,
      to_name: 'Growsphere Support',
      message: message,


    };


    emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then((response) => {
      console.log('Inquiry sent successfully!', response);
      setName('');
      setEmail('');
      setMessage('');
    })
    .catch((error) => {
      console.error('Error sending inquiry:', error);
    });
  }
 
  return (
    <form onSubmit={handleSubmit} className='contactForm'>
      <label>Name</label>
      <input
      type="text"
      placeholder="Your Name"
      maxLength={25}
      value={name}
      onChange={(e) => setName(e.target.value)}/>
      


      <label>Email</label>
      <input
      type="text"
      maxLength={30}
      placeholder="Your Email"

      value={email}
      onChange={(e) => setEmail(e.target.value)} />

<label><strong>GrowSphere Member</strong></label>
      
      <div className="radio-group">
        
        YES
        <input type="checkbox" id= "myCheckBox"/>
         <script>
        document.getElementById('myCheckBox').checked = true; 
        document.getElementById('myCheckBox').checked = false
        </script>
      </div>
      <div className="radio-group">
        
        NO
        <input type="checkbox" id= "myCheckBox"/>
         <script>
        document.getElementById('myCheckBox').checked = true;
        document.getElementById('myCheckBox').checked = false
        </script>
      </div>
      
              

      <label>Message</label>
     
      <textarea
      cols="30"
      rows="10"
      maxLength={100}
      value={message}
      placeholder='Please provide as much detail as possible'
      onChange={(e) => setMessage(e.target.value)}
      >


      </textarea>
      <button type="submit" >Submit</button>
    </form>
  ) 
}

export default ContactForm

