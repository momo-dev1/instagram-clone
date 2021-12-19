import { Helmet } from "react-helmet";

const SEO = ({ title }) => {
  const titleName = title ? `${title} • Instagram` : "Mo Instagram";
  return (
    <Helmet>
      <title>{titleName}</title>
    </Helmet>
  );
};

export default SEO;
