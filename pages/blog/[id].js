import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PureHeader } from "../../components/main";
import { Input, Button, Card, message, Popover, Col, Row } from "antd";
import { AuthContainer } from "../../components/main";
import { addData, editData, getOne, deleteOne } from "../../api";
import { DeleteOutlined } from "@ant-design/icons";

const Create = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter("");

  useEffect(() => {
    if (router.query) {
      if (router.query.id == "create") return;
      else {
        setIsEdit(true);
        getOne(router.query.id, (err, result) => {
          if (err) throw err;
          if (!result.status) {
            Object.keys(result.errMsg).forEach((key) =>
              message.error(result.errMsg[key])
            );
          } else {
            setText(result.article.text);
            setTitle(result.article.title);
            setDescription(result.article.description);
            setImage(result.article.image);
          }
        });
      }
    }
  }, [router]);

  var ReactQuill;
  if (typeof window !== "undefined") {
    ReactQuill = require("react-quill");
  }

  const handleNew = () => {
    setLoading(true);
    addData(
      {
        title,
        image,
        text,
        description,
        athor: Number(JSON.parse(localStorage.getItem("blog_user")).id),
      },
      (err, result) => {
        if (err) throw err;
        if (!result.status) {
          setLoading(false);
          Object.keys(result.errMsg).forEach((key) =>
            message.error(result.errMsg[key])
          );
        } else {
          router.push("/");
        }
      }
    );
  };

  const handleEdit = () => {
    setLoading(true);
    editData(
      router.query.id,
      {
        title,
        image,
        text,
        description,
        athor: Number(JSON.parse(localStorage.getItem("blog_user")).id),
      },
      (err, result) => {
        if (err) throw err;
        if (!result.status) {
          setLoading(false);
          Object.keys(result.errMsg).forEach((key) =>
            message.error(result.errMsg[key])
          );
        } else {
          router.push("/");
        }
      }
    );
  };

  const handleDelete = () => {
    deleteOne(router.query.id, (err, result) => {
      if (err) throw err;
      if (!result.status) {
        Object.keys(result.errMsg).forEach((key) =>
          message.error(result.errMsg[key])
        );
      } else {
        message.success("Deleted");
        router.push("/");
      }
    });
  };

  return (
    <AuthContainer>
      <div className="create-page">
        <PureHeader />
        <main>
          <div className="container">
            <div className="search-box">
              <Row
                gutter={[20]}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Col span={10}>
                  <Popover content={<img src={image && image} />}>
                    <Input
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      style={{ width: 300 }}
                      placeholder="https://example/image.png"
                    />
                  </Popover>
                </Col>
                <Col span={9}>
                  <Button
                    style={{ width: "100%", margin: "0" }}
                    loading={loading}
                    onClick={isEdit ? handleEdit : handleNew}
                    disabled={
                      image && text && description && title ? false : true
                    }
                    type="primary"
                  >
                    Save
                  </Button>
                </Col>
                <Col span={3}>
                  <Button
                    onClick={handleDelete}
                    style={{ width: "100%" }}
                    type="primary"
                    icon={<DeleteOutlined />}
                    danger
                    disabled={router.query.id != "create" ? false : true}
                  ></Button>
                </Col>
              </Row>
            </div>
            <Input.TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short Description . . ."
              style={{ margin: "20px 0" }}
            />
            <Card
              style={{ marginTop: "20px" }}
              title={
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-title"
                  placeholder="Write Blog title . . ."
                />
              }
            >
              {ReactQuill && (
                <ReactQuill
                  theme="bubble"
                  value={text}
                  onChange={(value) => setText(value)}
                />
              )}
            </Card>
          </div>
        </main>
      </div>
    </AuthContainer>
  );
};

export default Create;
