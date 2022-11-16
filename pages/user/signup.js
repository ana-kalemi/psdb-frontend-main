import Head from "next/head";
import Router from "next/router";
import React, { useState } from 'react';
import UserAPI from "../../api/users";
import { Form, Row, Col, Spinner, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../../styles/login.module.css";

const Signup = () => {
    const [isLoading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await UserAPI.register(firstName, secondName, email,password, confirmPassword)
            .then(response => {
                    if (response.status !== 200 && response.data?.errors) {
                        setErrors(response.data.errors);
                    }
                    console.log(response)
                    if (response.data?.user) {
                        console.log("here")
                        window.localStorage.setItem("user", JSON.stringify(response.data.user));
                        Router.push("/");
                    }
                }
            );
        }
        catch (error) {} 
        finally {
            setLoading(false);
        }
    };

    const validateInput = e => {
        let { name, value } = e.target;
        setErrors(prev => {
          const stateObj = { ...prev, [name]: "" };
     
          switch (name) {
            case "firstname":
              if (!value) {
                stateObj[name] = "Please enter first name.";
              }
              break;
            case "lastname":
                if (!value) {
                    stateObj[name] = "Please enter second name.";
                }
                break;
        
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (confirmPassword && value !== confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirmPassword"] = confirmPassword ? "" : errors.confirmpassword;
              }
              break;
     
            case "confirmpassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (password && value !== password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
     
            default:
              break;
          }
     
          return stateObj;
        });
      }

    return (
        <>
            <Head>
                <title>SIGNUP | NEXT REALWORLD</title>
                <meta name="description" content="Please login to use fully-featured next-realworld site. (Post articles, comments, and like, follow etc.)" />
            </Head>
            <Row className={styles.loginForm}>
                <Col sm={4}></Col>
                <Col sm={4}>
                    <h5>CREATE AN ACCOUNT</h5>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col sm={6}>
                                <Form.Group className="mb-3" controlId="formBasicFirstname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control required type="text" placeholder="First Name" name="firstname" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} onBlur={validateInput}/>
                                    {errors.firstname && <span className='err'>{errors.firstname}</span>}
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group className="mb-3" controlId="formBasicLastname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control required type="text" placeholder="Last Name"  name="lastname" value={secondName} onChange={(e) => {setSecondName(e.target.value)}} onBlur={validateInput}/>
                                    {errors.lastname && <span className='err'>{errors.lastname}</span>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control required type="email" placeholder="Email Address" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                            {errors.email && <span className='err'>{errors.email}</span>}
                            <Form.Text className="text-muted">
                                We&apos;ll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} onBlur={validateInput}/>
                            {errors.password && <span className='err'>{errors.password}</span>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" name="confirmpassword" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} onBlur={validateInput}/>
                            {errors.confirmpassword && <span className='err'>{errors.confirmpassword}</span>}
                        </Form.Group>
                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading && <Spinner as="span" variant="light" size="sm" role="status" aria-hidden="true" animation="border"/>}
                            &nbsp;&nbsp;Register
                        </Button>
                    </Form>
                </Col>
                <Col sm={4}></Col>
            </Row>
        </>
    )
};

export default Signup;
