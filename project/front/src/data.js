import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from "react";
import * as Yup from "yup"
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

function Data() {
    const navigate = useNavigate();
    const token = cookies.get("TOKEN");
    const [accInfo, setInfo] = useState("");
    const [updateInfo, setUpdate] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/account/info",  
            { headers: { Authorization: `Bearer ${token}`} })
            .then(res => setInfo("your current username: " + res.data))
            .catch(err => console.alert(err.response.data))
    }, )

    if (token) return (
        <>
            {accInfo}
            <br></br><br></br>
            <Formik
                initialValues={{ usernameChange: '', passwordChange: ''}}
                validationSchema={Yup.object({
                    usernameChange: Yup.string()
                    .min(1, 'Must be 1 charater at least'),
                    passwordChange: Yup.string()
                    .min(5, 'Password is too short - should be 5 chars minimum.')
                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        axios({
                            method: 'put',
                            url: "http://localhost:5000/account/update",
                            headers: { Authorization: `Bearer ${token}`}, 
                            data: values
                        }).then(res => {
                            setUpdate("updating, please relog...")
                            setTimeout(() => {
                                cookies.remove("TOKEN", { path: "/" });
                                navigate("/login");
                              }, 1000);
                        }).catch(err => setUpdate(err.response.data));
                        setSubmitting(false)
                    }, 1000);
                }}
            >
                <Form>
                    <label htmlFor="usernameChange">Change username: </label>
                    <Field name="usernameChange" type="text" />
                    <div><ErrorMessage name="usernameChange" /></div>
            
                    <label htmlFor="passwordChange">Change password: </label>
                    <Field name="passwordChange" type="password" />
                    <div><ErrorMessage name="passwordChange" /></div>

                    <p></p>
                    <button type="submit">Submit</button>
                    <button type='reset'>Reset</button>
                </Form>
            </Formik>
            <br></br>
            {updateInfo}
        </>
    );
    else window.location.href = "/login"
}
  
  export default Data;