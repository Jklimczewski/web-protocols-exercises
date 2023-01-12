import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useState } from "react";
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Data() {
    const token = cookies.get("TOKEN");
    const [accInfo, setInfo] = useState({});
    if (token) return (
        <>
            {accInfo}
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
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form>
                    <label htmlFor="username">Change username</label>
                    <Field name="username" type="text" />
                    <div><ErrorMessage name="username" /></div>
            
                    <label htmlFor="password">Change password</label>
                    <Field name="password" type="password" />
                    <div><ErrorMessage name="password" /></div>

                    <p></p>
                    <button type="submit">Submit</button>
                    <button type='reset'>Reset</button>
                </Form>
            </Formik>
        </>
    );
    else window.location.href = "/login"
}
  
  export default Data;