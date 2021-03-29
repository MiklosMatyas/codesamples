import React, { useContext, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { Container, Form, Button } from 'react-bootstrap';
import PortfolioContext from '../../context/context';
import Title from '../Title/Title';

const Contact = () => {
  // const { contact } = useContext(PortfolioContext);
  // const { cta, btn, email } = contact;

  const [contact, setContact] = useState({
    name: '',
    $company: '',
    email: '',
    $phone: '',
    $industry: '',
    $experience: '',
    $plans: '',
    subject: 'Abasar - Contact Form',
    honeypot: '', // if any value received in this field, form submission will be ignored.
    message: '',
    replyTo: '@', // this will set replyTo of email to email address entered in the form
    accessKey: '0fb0bb52-285a-45c6-be4a-f3670dc12095' // get your access key from https://www.staticforms.xyz
  });

  const handleChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });


  const [response, setResponse] = useState({
    type: '',
    message: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: 'success',
          message: 'Thank you for reaching out to us.'
        });
      } else {
        setResponse({
          type: 'error',
          message: json.message
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message: 'An error occured while submitting the form'
      });
    }
  };

  return (
    <section id="contact">
      <Container>
        <Title titleSub="CONTACT" />
        <Fade bottom duration={1000} delay={800} distance="30px">
          <div className="contact-wrapper">
            <p className="contact-wrapper__text"><i>If you need further information to make your investment decision, please contact us at</i></p>
            <p className="contact-wrapper__text blue">abasar-industrial@mab.co.hu<br />
               or call us at<br />
               +36 30 944 9318
            </p>

            <Form action="https://api.staticforms.xyz/submit" method="post" onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Control type="text" placeholder="Your name:" name="name" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicCompany">
                <Form.Control type="text" placeholder="Your company’s name and country:" name="$company" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Your email address:" name="email" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicPhone">
                <Form.Control type="text" placeholder="Your direct phone number:" name="$phone" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicIndustry">
                <Form.Control type="text" placeholder="In what industry would you like to invest in Hungary?" name="$industry" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicExperience">
                <Form.Control as="textarea" rows="3" placeholder="Do you have any experience investing in Central and Eastern Europe? If so, in which country? (So we can provide you with a comparative report)." name="$experience" onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicPlans">
                <Form.Control as="textarea" rows="5" placeholder="Please briefly describe the plans for your production or logistics capacity:" name="$plans" onChange={handleChange} />
              </Form.Group>
              <input type="hidden" name="accessKey" value="0fb0bb52-285a-45c6-be4a-f3670dc12095" />
              <Form.Control type="hidden" controlId="honeypot" name="honeypot" />
              <Form.Control type="hidden" controlId="replyTo" name="replyTo" value="@" onChange={handleChange} />
              {/* <Form.Control type="hidden" controlId="redirectTo" name="redirectTo" value="https://example.com/contact/success" /> */}
              <Button type="submit">SEND</Button>
            </Form>
            <p>{response.message}</p>

          </div>
        </Fade>
      </Container>
    </section>
  );
};

export default Contact;
