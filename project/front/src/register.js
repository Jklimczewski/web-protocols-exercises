import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [registered, setRegister] = useState("");
    const navigate = useNavigate();

    return (
        <>
          <h1>Register</h1>
          <Formik
              initialValues={{ username: '', password: ''}}
              validationSchema={Yup.object({
                username: Yup.string()
                  .min(1, 'Must be 1 charater at least')
                  .required('Required'),
                password: Yup.string()
                .required('No password provided.') 
                .min(5, 'Password is too short - should be 5 chars minimum.')
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    axios.post("https://localhost:5000/register", values)
                        .then(res => {
                            setRegister(res.statusText);
                            setTimeout(() => {
                                navigate(`/login`);
                            }, 500);
                        })
                        .catch(err => setRegister(err.response.data))
                    setSubmitting(false);
                }, 400);
              }}
            >
              <Form>
                <label htmlFor="username">Username</label>
                <Field name="username" type="text" />
                <div><ErrorMessage name="username" /></div>
        
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" />
                <div><ErrorMessage name="password" /></div>
    
                <p></p>
                <button type="submit">Submit</button>
                <button type='reset'>Reset</button>
              </Form>
            </Formik>
            {registered}
            <br></br>
            <a href="/login">Login</a>
        </>
      )
    }

export default Register;