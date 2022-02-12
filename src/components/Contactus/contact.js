import React, { useEffect, useState } from "react"
import { Container } from 'reactstrap';
import Aos from 'aos';
import axios from "axios"
import { baseUrl } from "../../baseUrl"
import 'aos/dist/aos.css';
import './contact.css';
import { initializeApp } from "firebase/app";
import { getFirestore ,doc,setDoc } from "firebase/firestore";
import dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey:  process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId:  process.env.FIREBASE_PROJECT_ID,
  storageBucket:  process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId:  process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENTID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Initialize Firestore
const db = getFirestore(app);

const Contact = () => {
    const [name, setname] = useState("")
    const [message, setmessage] = useState("")
    const [email, seteamil] = useState("")
    const [subject, setsubject] = useState("")
    useEffect(() => {
        Aos.init({ offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 100 });
    }, [])
    const formsubmit = e => {
      e.preventDefault()
      axios.post(
        `${baseUrl}/formsubmit`,
        { name, email, subject, message },
      ).then((res)=>{
          alert("Your form has been submitted successful");
          console.log(res.data);
      }).catch(err=>{
          console.log(err);
      })
      setname("");
      setmessage("");
      seteamil("");
      setsubject("");
    }
    const formSubmitFirebase= e =>{
            
        
        const contactForm = document.querySelector('.addForm')

        e.preventDefault()
        var ids=contactForm.email.value;
          //Setting the id key for Document as email 
        setDoc(doc(db,"books",ids), {
          Name: contactForm.name.value,
          Email: contactForm.email.value,
          Subject: contactForm.subject.value,
          Message: contactForm.message.value

        })
        .then(() => {
          alert("form submitted Succesfully");
            //resetting form as a confirmation for submission 
          contactForm.reset()
        })

    }
    

    return (
      <div className="mainb">
        <h1 style={{ color: "#001427" }} data-aos="fade-up">Get in</h1>
        <h1 style={{ color: "#FDCA40" }} data-aos="fade-up">Touch</h1>
        <p
          style={{
            color: "rgba(0, 20, 39, 0.75)",
            marginTop: "-9px",
            marginBottom: "10vh",
          }} data-aos="fade-up"
        >
          Leave a message to contact our team
        </p>
        <Container className="form_con" data-aos="fade-up">
          <form class="addForm">
            <div className="col-lg-6" style={{ display: "inline-block" }}>
              <fieldset>
                <input
                  className="input_con" 
                  name="name"
                  placeholder="Name"
                  onChange={e => setname(e.target.value)}
                ></input>
                <br />
                <input
                  className="input_con"
                  name="email"
                  placeholder="Email" 
                  onChange={e => seteamil(e.target.value)}
                ></input>
                <br />
                <input
                  className="input_con"
                  name="subject"
                  placeholder="Subject"
                  onChange={e => setsubject(e.target.value)}
                ></input>
              </fieldset>
            </div>
            <div className="col-lg-6" style={{ display: "inline-block" }}>
              <fieldset>
                <textarea
                  className="textarea_con"
                  placeholder="Message"
                  name="message"
                  onChange={e => setmessage(e.target.value)}
                ></textarea>
              </fieldset>
            </div>
          </form>
          <button onClick={formSubmitFirebase ,formsubmit }>Send Message</button>
        </Container>
        <br></br>
      </div>
    )
}

export default Contact
