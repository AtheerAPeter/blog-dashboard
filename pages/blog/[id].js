import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PureHeader } from "../../components/main";
import { Input, Button, Card, message, Popover } from "antd";
import { AuthContainer } from "../../components/main";
import { addData, editData, getOne } from "../../api";

const Create = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const router = useRouter("");
  useEffect(() => {
    if (router && router.query) {
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

  return (
    <AuthContainer>
      <div className="create-page">
        <PureHeader />
        <main>
          <div className="container">
            <div className="search-box">
              <Popover content={<img src={image && image} />}>
                <Input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  style={{ width: 300 }}
                  placeholder="https://example/image.png"
                />
              </Popover>
              <Button
                loading={loading}
                onClick={isEdit ? handleEdit : handleNew}
                disabled={image && text && description && title ? false : true}
                type="primary"
              >
                Save
              </Button>
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
