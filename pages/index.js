import { useRouter } from "next/router";
import { PureHeader, AuthContainer } from "../components/main";
import { PureCard } from "../components/home";
import { Input, Button, Row, Col, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getData } from "../api";
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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
        setLoading(false);
      }
    });
  }, []);

  const handlesearch = (e) => {
    if (e.target.value.length > 0) {
      setIsSearching(true);
      let temp = data.filter((item) => {
        return (
          item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.description.toLowerCase().includes(e.target.value.toLowerCase())
        );
      });
      if (temp.length > 0) {
        setSearchData(temp);
      }
    } else {
      setIsSearching(false);
    }
  };
  return (
    <AuthContainer>
      <Spin tip="Loading..." spinning={loading} size="large">
        <PureHeader />
        <main>
          <div className="container">
            <div className="search-box">
              <Input.Search
                onChange={(e) => handlesearch(e)}
                style={{ width: "300px" }}
                placeholder="Search by title or description"
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
              {(isSearching ? searchData : data).map((art) => (
                <Col md={8} sm={12} xs={24} key={art.id}>
                  <PureCard art={art} />
                </Col>
              ))}
            </Row>
          </div>
        </main>
      </Spin>
    </AuthContainer>
  );
};

export default Home;
