import { useState } from "react";
import { PureHeader } from "../../components/main";
import { Input, Button, Card } from "antd";

const Create = () => {
  const [text, setText] = useState("");

  var ReactQuill;
  if (typeof window !== "undefined") {
    ReactQuill = require("react-quill");
  }
  return (
    <div className="create-page">
      <PureHeader />
      <main>
        <div className="container">
          <div className="search-box">
            <Input
              style={{ width: 300 }}
              placeholder="https://example/image.png"
            />
            <Button type="primary">Save</Button>
          </div>
          <Input.TextArea
            placeholder="Short Description . . ."
            style={{ margin: "20px 0" }}
          />
          <Card
            style={{ marginTop: "20px" }}
            title={
              <input
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
  );
};

export default Create;
