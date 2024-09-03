import MainNavbar from "../common/MainNavbar";

function Layout({ children }) {
  return (
    <>
      <MainNavbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;
