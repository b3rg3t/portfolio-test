import Link from "next/link";
import Layout from "../components/layout";

const Index = () => {
  return (
    <Layout>
      <div>
        <h1>Will&Skill</h1>
        <span>Test</span>
        <Link href="/portfolio">
          <a>Portfolios</a>
        </Link>
      </div>
      <style jsx>
        {`
          div {
            display: flex;
            flex-direction: column;
          }
          h1 {
            margin: 10px 0 5px 0;
          }
          a {
            text-decoration: none;
            color: blue;
            font-family: "Arial";
            margin-top: 30px;
          }
          a:hover {
            opacity: 0.6;
          }
        `}
      </style>
    </Layout>
  );
};

export default Index;
