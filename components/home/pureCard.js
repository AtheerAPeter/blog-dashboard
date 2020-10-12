import Link from "next/link";
export const PureCard = ({ art }) => { 
  return (
    <div className="pure-card">
      <img src={art.image} alt="" />
      <h3>{art.title}</h3>
      <small>{art.description}</small>

      <div className="blog-card-footer">
        <Link href={`/blog/${art.id}`}>
          <a>View</a>
        </Link>
        <span>June 19, 2020</span>
      </div>
    </div>
  );
};
