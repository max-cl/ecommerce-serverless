import type { NextPage } from "next";

// Components
import NavBar from "../components/Navbar";
import HomeContainer from "../components/containers/Home";
import ProductsPage from "../pages/products";
import HeadContainer from "../components/containers/Head";
import FooterContainer from "../components/containers/Footer";

const Home: NextPage = () => {
    return (
        <>
            {/* Head */}
            <HeadContainer />

            {/* Navigation Bar */}
            <NavBar />

            {/* Home Section */}
            <HomeContainer />

            {/* Products Section */}
            <ProductsPage />

            {/* Footer */}
            <FooterContainer />
        </>
    );
};

export default Home;
