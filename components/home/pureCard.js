import { Card } from "antd";

export const PureCard = () => {
  return (
    <div className="pure-card">
      <img src="https://picsum.photos/300/300" alt="" />
      <h3>FIRST BLOG TITL…</h3>
      <small>By FikraSpace</small>
      <div className="blog-card-footer">
        <a>Reade article</a>
        <span>June 19, 2020</span>
      </div>
    </div>
  );
};
