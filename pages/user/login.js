import Head from "next/head";
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import {Form, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import styles from "../../styles/login.module.css";

const Login = () => (
  <>
    <Head>
      <title>LOGIN | NEXT REALWORLD</title>
      <meta name="description" content="Please login to use fully-featured next-realworld site. (Post articles, comments, and like, follow etc.)" />
    </Head>
    <Row className={styles.loginForm}>
      <Col sm={4}></Col>
      <Col sm={4}>
        <h5>LOGIN TO YOUR ACCOUNT</h5>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Link href={"/forget"}><a>Forgot your password?</a></Link>
          <Button variant="primary" type="submit">Login</Button>
        </Form>
      </Col>
      <Col sm={4}></Col>
    </Row>
  </>
);

export default Login;
