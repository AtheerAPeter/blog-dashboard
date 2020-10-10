import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContainer = (props) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("blog_token")) {
      setLoading(false);
      router.replace("/login");
    }
  }, []);

  return loading && props.children;
};

//this is a component with opening and closing tags to act as security wrapper
