import Navbar from "./Navbar";
import Head from "./Head";
const Layout = ({ children, title, maxWidth, noIcons = false }) => {
  return (
    <section>
      <Head title={title} />
      <Navbar noIcons={noIcons} />
      <section className={` ${maxWidth} mx-auto`}>{children}</section>
    </section>
  );
};

export default Layout;
