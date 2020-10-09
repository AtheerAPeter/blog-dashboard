import { Input, Row, Col, Button } from "antd";

const Login = () => {
  return (
    <div className="login-page">
      <div className="content">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Input placeholder="Email" />
          </Col>
          <Col span={24}>
            <Input.Password placeholder="Password" />
          </Col>
          <Col span={24}>
            <Button style={{ width: "100%" }} type="primary">
              Login
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
