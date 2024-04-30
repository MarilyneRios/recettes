import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaEye } from "react-icons/fa"; //<FaEye />
import { FaEyeSlash } from "react-icons/fa6"; //<FaEyeSlash />


const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const translateError = (error) => {
    if (error.includes("Invalid email or password")) {
      return "Email ou mot de passe incorrect";
    } else {
      return "Erreur inconnue";
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      const translatedError = translateError(err?.data?.message || err.error);
      toast.error(translatedError);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Connexion</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2 " controlId="email">
          <Form.Label>Addresse email</Form.Label>
          <Form.Control
            type="email"
            placeholder="nom@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          {emailError && (
            <div className="alert alert-danger">
              {translateError(emailError)}
            </div>
          )}
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <div className="d-flex">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Entrer votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
            <Button variant="secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
          {passwordError && (
            <div className="alert alert-danger">
              {translateError(passwordError)}
            </div>
          )}
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3 w-100">
          Se connecter
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Nouvel utilisateur? <Link to="/register">Inscription</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
