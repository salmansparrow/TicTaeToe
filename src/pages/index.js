import Layout from "@/components/layouts/Layout";
import GameSection from "@/components/main/GameSection";

function HomePage({ children }) {
  return (
    <>
      <Layout>
        {children}
        <GameSection />
      </Layout>
    </>
  );
}

export default HomePage;
