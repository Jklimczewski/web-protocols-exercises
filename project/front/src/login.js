import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();


function Login() {
  const [loggedIn, setLoggIn] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <h1>Login</h1>
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
                axios.post("http://localhost:5000/login", values)
                    .then(res => {
                      cookies.set("TOKEN", res.data.accessToken, {
                        path: "/",
                      });
                      setLoggIn(res.data.message);
                      setTimeout(() => {
                        navigate(`/account`);
                    }, 500);
                    })
                    .catch(err => setLoggIn(err.response.data))
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
        {loggedIn}
    </>
  )
}

export default Login;
