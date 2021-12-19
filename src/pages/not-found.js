import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/shared/Layout";

const NotFoundPage = () => {
  return (
    <Layout noIcons={true} maxWidth="max-w-5xl" title="Page Not Found">
      <section className="mt-32 text-center">
        <h2 className="text-3xl font-medium">
          Sorry, this page isn't available
        </h2>
        <p className="mt-6 text-xl font-medium text-gray-800">
          The link you followed may be broken, or the page may have been
          removed.
          <Link to="/">
            <span className="ml-1 text-blue-800">Go back to Instagram</span>
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default NotFoundPage;
