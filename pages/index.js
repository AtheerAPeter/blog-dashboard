import { useRouter } from "next/router";
import { PureHeader, AuthContainer } from "../components/main";
import { PureCard } from "../components/home";
import { Input, Button, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getData } from "../api";
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter("");

  useEffect(() => {
    getData((err, result) => {
      if (err) throw err;
      if (!result.status) {
        Object.keys(result.errMsg).forEach((key) =>
          message.error(result.errMsg[key])
        );
      } else {
        setData(result.articles);
      }
    });
  }, []);
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
            <Button
              onClick={() => router.push("/blog/create")}
              type="primary"
              icon={<PlusOutlined />}
            >
              New Article
            </Button>
          </div>

          <Row gutter={[30, 30]} style={{ marginTop: 30 }}>
            {data.map((art) => (
              <Col md={8} sm={12} xs={24} key={art.id}>
                <PureCard art={art} />
              </Col>
            ))}
          </Row>
        </div>
      </main>
    </AuthContainer>
  );
};

export default Home;
