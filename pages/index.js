import { PureHeader, AuthContainer } from "../components/main";
import { PureCard } from "../components/home";
import { Input, Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const Home = () => {
  return (
    <AuthContainer>
      <PureHeader />
      <main>
        <div className="container">
          <div className="search-box">
            <Input.Search
              style={{ width: "300px" }}
              placeholder="Search for something..."
            />
            <Button href="/blog/create" type="primary" icon={<PlusOutlined />}>
              New Article
            </Button>
          </div>

          <Row gutter={[30, 30]} style={{ marginTop: 30 }}>
            <Col md={8} sm={12} xs={24}>
              <PureCard />
            </Col>
            <Col md={8} sm={12} xs={24}>
              <PureCard />
            </Col>
            <Col md={8} sm={12} xs={24}>
              <PureCard />
            </Col>
            <Col md={8} sm={12} xs={24}>
              <PureCard />
            </Col>
            <Col md={8} sm={12} xs={24}>
              <PureCard />
            </Col>
          </Row>
        </div>
      </main>
    </AuthContainer>
  );
};

export default Home;
