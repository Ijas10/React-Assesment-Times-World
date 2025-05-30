import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import SocialMediaButtons from "../components/SocialMediaButtons";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    keepSignedIn: false,
  });
  const [errors, setErrors] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    usernameOrEmail: false,
    password: false,
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!password) return "Password is required";
    if (password.length < minLength) return "Minimum 8 characters";
    if (!hasCapital) return "At least 1 capital letter";
    if (!hasNumber) return "At least 1 number";
    if (!hasSymbol) return "At least 1 symbol";
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      usernameOrEmail: !formData.usernameOrEmail
        ? "Email is required"
        : !validateEmail(formData.usernameOrEmail)
        ? "Invalid email format"
        : "",
      password: validatePassword(formData.password),
    };
    setErrors(newErrors);
    return !newErrors.usernameOrEmail && !newErrors.password;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    if (name === "usernameOrEmail") {
      setErrors((prev) => ({
        ...prev,
        usernameOrEmail: !formData.usernameOrEmail
          ? "Email is required"
          : !validateEmail(formData.usernameOrEmail)
          ? "Invalid email format"
          : "",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(formData.password),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    setTouched({
      usernameOrEmail: true,
      password: true,
    });

    if (isValid) {
      navigate("/home"); 
    }
  };

  return (
    <Container fluid className="signin-container">
      <Row className="justify-content-center w-100 m-0">
        <Col>
          <Card className="signin-card">
            <Card.Body>
              <div className="form-card">
                <h1 className="signin-title">Sign In</h1>

                <p className="new-user-text">
                  <span className="new-user-label">New user?</span>
                  <a className="create-account-link">Create an account</a>
                </p>

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-3" controlId="usernameOrEmail">
                    {/* <Form.Label className="input-label">Email</Form.Label> */}
                    <Form.Control
                      type="email"
                      name="usernameOrEmail"
                      value={formData.usernameOrEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Username or email"
                      className={`signin-input ${
                        touched.usernameOrEmail && errors.usernameOrEmail
                          ? "is-invalid"
                          : ""
                      }`}
                      required
                    />
                    {touched.usernameOrEmail && errors.usernameOrEmail && (
                      <div className="invalid-feedback">
                        {errors.usernameOrEmail}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    {/* <Form.Label className="input-label">Password</Form.Label> */}
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Password"
                      className={`signin-input ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                      required
                    />
                    {touched.password && errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="keepSignedIn">
                    <Form.Check
                      type="checkbox"
                      name="keepSignedIn"
                      label="Keep me signed in"
                      checked={formData.keepSignedIn}
                      onChange={handleChange}
                      className="keep-signed-in"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className={`signin-button w-100 `}
                    disabled={
                      Object.values(errors).some((err) => err) ||
                      !formData.usernameOrEmail ||
                      !formData.password
                    }
                  >
                    Sign In
                  </Button>
                </Form>

                <div className="divider-container">
                  <hr className="divider-line" />
                  <span className="divider-text">Or Sign In With</span>
                  <hr className="divider-line" />
                </div>
                <SocialMediaButtons />
              </div>
              <div className="svgImage">
                <svg
                  width="301"
                  height="510"
                  viewBox="0 0 301 510"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="login-svg"
                >
                  <path
                    d="M98.4012 161.345C94.0453 161.8 89.6736 160.64 86.1165 158.085C82.5979 155.533 79.6063 152.324 77.3065 148.635C73.2568 142.527 70.3366 135.741 68.6847 128.601C65.9022 131.945 61.499 133.477 57.2416 132.582C50.4252 131.052 46.3374 123.099 47.6669 116.241C48.9965 109.382 54.623 103.945 61.044 101.192C67.4649 98.4396 74.6207 97.9849 81.6068 98.0004C86.2134 98.0106 90.9081 98.2254 95.2352 99.8054C99.5622 101.385 103.526 104.534 105.064 108.877C106.027 111.599 105.996 114.613 107.092 117.285C109.081 122.136 114.241 124.785 119.084 126.795C123.926 128.805 129.191 130.846 132.046 135.243C135.271 140.208 134.34 147.138 130.787 151.874C127.233 156.61 121.525 159.356 115.717 160.504C109.909 161.652 103.925 161.368 98.0113 161.079"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M151.269 473.272L170.354 464.996L159.999 443.682L144.586 452.701L151.269 473.272Z"
                    fill="#737373"
                  />
                  <path
                    d="M80.6687 363.986L99.1014 401.479L131.63 467.65L165.167 451.534L128.145 364.857L128.04 353.946L127.709 319.994L80.6687 363.986Z"
                    fill="#3D3D3D"
                  />
                  <path
                    d="M28.4012 456.325L48.0017 463.294L54.9707 440.644L37.5483 436.725L28.4012 456.325Z"
                    fill="#737373"
                  />
                  <path
                    d="M32.7571 259.116L91.9934 242.129L74.571 230.369L28.8372 244.742L8.15735 249.706C5.19922 250.415 2.71113 252.406 1.36976 255.137C0.0284475 257.867 -0.0267283 261.053 1.21937 263.829C2.38733 266.43 4.58912 268.425 7.29273 269.332C9.9964 270.239 12.9559 269.975 15.4562 268.604L32.7571 259.116Z"
                    fill="#737373"
                  />
                  <path
                    d="M70.651 230.829L94.6068 244.767C96.7208 227.337 86.2991 196.309 73.2644 162.446C65.4873 168.078 61.4392 177.532 62.7304 187.047L70.651 230.829Z"
                    fill="#FBFBFB"
                  />
                  <path
                    d="M173.879 265.65L174.382 283.529C174.471 286.682 175.999 289.621 178.528 291.506C181.057 293.391 184.31 294.014 187.357 293.198C190.289 292.413 192.725 290.376 194.018 287.63C195.31 284.884 195.328 281.708 194.065 278.948L187.381 264.343L166.474 214.689L152.101 219.916L173.879 265.65Z"
                    fill="#737373"
                  />
                  <ellipse
                    cx="76.531"
                    cy="126.107"
                    rx="18.7291"
                    ry="18.7291"
                    fill="#737373"
                  />
                  <path
                    d="M77.1843 165.526L98.962 155.072L88.0736 130.681L69.7795 134.165L77.1843 165.526Z"
                    fill="#737373"
                  />
                  <path
                    d="M91.1223 253.944L135.549 243.055L126.628 161.278C125.778 153.48 118.837 147.801 111.025 148.511L96.349 149.845L76.3132 158.992L68.9087 166.832L71.168 176.494C69.0618 196.395 70.6853 213.663 82.2555 223.911L91.1223 253.944Z"
                    fill="#FBFBFB"
                  />
                  <path
                    d="M147.745 223.02L170.83 216.922L139.881 165.662C133.249 154.679 120.87 148.516 108.109 149.845L119.869 188.61C130.742 196.815 139.878 208.609 147.745 223.02Z"
                    fill="#FBFBFB"
                  />
                  <path
                    d="M27.5303 438.902L62.8107 449.356C105.771 379.611 167.287 304.449 143.389 254.224L134.678 233.753L89.3799 247.691L86.7665 301.701L58.8906 345.257L27.5303 438.902Z"
                    fill="#3D3D3D"
                  />
                  <path
                    d="M10.2193 486.325L41.5733 486.017C47.7815 485.976 52.7929 480.932 52.7929 474.723L52.793 459.093C52.7975 457.946 52.2555 456.865 51.3334 456.182C50.4112 455.5 49.2191 455.297 48.1233 455.637C42.4599 457.452 37.8232 456.848 34.3264 453.557C32.2303 451.584 31.9856 451.187 29.4904 452.623L15.3348 468.085L9.59383 468.455C5.14315 468.743 1.58419 472.265 1.25069 476.712C1.0638 479.202 1.92648 481.657 3.62984 483.482C5.33334 485.308 7.72237 486.339 10.2193 486.325Z"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M158.678 507.345L180.63 484.957C184.992 480.538 184.968 473.427 180.578 469.037L169.526 457.985C168.718 457.171 167.571 456.79 166.436 456.959C165.301 457.128 164.315 457.828 163.78 458.843C161.059 464.132 157.353 466.983 152.554 467.128C149.676 467.215 149.223 467.108 148.474 469.887L149.398 490.831L145.6 495.152C142.656 498.502 142.63 503.509 145.539 506.89C147.167 508.782 149.513 509.908 152.009 509.995C154.504 510.081 156.922 509.121 158.678 507.345Z"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M77.2866 121.737C74.7219 125.817 70.9109 128.962 66.4184 130.706C63.2366 131.932 59.1992 132.236 56.8111 129.803C55.0811 128.04 54.7363 125.327 54.9817 122.869C55.7479 115.198 61.5134 108.518 68.6669 105.644C75.8203 102.769 84.0786 103.398 91.2176 106.308C97.9533 109.053 104.35 114.678 104.713 121.943C104.898 125.666 103.55 129.765 105.549 132.912C107.054 135.282 109.961 136.245 112.565 137.294C115.169 138.343 117.964 139.999 118.498 142.756C118.762 144.678 118.096 146.612 116.705 147.965C115.321 149.287 113.682 150.315 111.889 150.985C107.643 152.793 102.968 153.92 98.4057 153.221C93.8435 152.522 89.432 149.744 87.6465 145.488C86.2716 142.21 86.5532 138.512 86.712 134.961C86.8707 131.41 86.8225 127.629 84.9267 124.622C83.0308 121.616 78.6293 119.933 75.796 122.079"
                    fill="#3C3C3C"
                  />
                  <path
                    d="M212.456 18.9088L250.912 41.1112C258.302 33.2049 270.428 31.098 280.193 36.736C291.561 43.2992 295.47 57.8863 288.907 69.2542C282.343 80.6222 267.756 84.5308 256.388 77.9675C246.623 72.3296 242.385 60.7743 245.537 50.4215L235.677 44.7291L233.757 48.0542C232.273 50.6252 228.985 51.506 226.414 50.0216C223.843 48.5373 222.963 45.2498 224.447 42.6789L226.367 39.3537L219.716 35.5142L214.725 44.1595C213.241 46.7305 209.953 47.6114 207.382 46.127C204.811 44.6426 203.93 41.3552 205.415 38.7841L210.406 30.1388L207.081 28.2191C204.51 26.7348 203.629 23.4473 205.113 20.8762C206.598 18.3053 209.885 17.4244 212.456 18.9088ZM261.764 68.6571C267.998 72.2563 275.997 70.1129 279.596 63.8789C283.195 57.6449 281.052 49.6455 274.818 46.0463C268.584 42.4471 260.585 44.5906 256.985 50.8245C253.386 57.0585 255.53 65.058 261.764 68.6571Z"
                    fill="#3D3D3D"
                  />
                </svg>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
