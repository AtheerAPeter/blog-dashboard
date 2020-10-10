import { useState } from "react";
import { Input, Row, Col, Button, message } from "antd";
import { loginApi } from "../api";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    //we send the data object first then take the callback answer which has error and answer then  we check on our errorfirst then the api error second if everything is fine we take the results from the else
    loginApi({ email, password }, (err, result) => {
      if (err) throw err;
      if (!result.status) {
        setIsLoading(false);
        Object.keys(result.errMsg).forEach((key) => {
          message.error(result.errMsg[key]);
        });
      } else {
        localStorage.setItem("blog_token", result.token);
        localStorage.setItem("blog_user", JSON.stringify(result.user));
        //redirect using next router
        router.replace("/");
        setIsLoading(false);
        console.log(result.user);
      }
    });
  };

  return (
    <div className="login-page">
      <div className="content">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Col>
          <Col span={24}>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Col>
          <Col span={24}>
            <Button
              loading={isLoading}
              onClick={handleSubmit}
              style={{ width: "100%" }}
              type="primary"
            >
              Login
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
