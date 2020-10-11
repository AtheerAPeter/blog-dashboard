import { Typography, Avatar, Popover, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";

const { Title, Text } = Typography;

export const PureHeader = () => {
  const router = useRouter("");

  return (
    <header>
      <div className="container">
        <div className="content">
          <Title style={{ color: "#fff" }} level={3}>
            Dashboard
          </Title>
          <div className="user-account">
            <Text style={{ color: "#fff", marginRight: 8 }}>atheer006</Text>
            <Popover
              content={
                <div>
                  <Text>Change password</Text>
                  <br />

                  <Button
                    type="link"
                    onClick={() => {
                      localStorage.removeItem("blog_token");
                      localStorage.removeItem("blog_user");
                      router.replace("/login");
                    }}
                  >
                    Sign out
                  </Button>
                </div>
              }
            >
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};
