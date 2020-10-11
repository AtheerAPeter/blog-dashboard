import { Card } from "antd";
import Link from "next/link";
export const PureCard = ({ art }) => {
  console.log(art);
  return (
    <div className="pure-card">
      <img src="https://picsum.photos/300/300" alt="" />
      <h3>{art.title}</h3>
      <small>By FikraSpace</small>
      <div className="blog-card-footer">
        <Link href={`/blog/${art.id}`}>
          <a>Read article</a>
        </Link>
        <span>June 19, 2020</span>
      </div>
    </div>
  );
};
