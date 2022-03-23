import type { NextPage } from "next";

// Components
import HeroContainer from "../components/containers/Hero";
import HeadContainer from "../components/containers/Head";
import FooterContainer from "../components/containers/Footer";
import NavBar from "../components/Navbar";

const Home: NextPage = () => {
    return (
        <>
            {/* Head */}
            <HeadContainer />

            {/* NavBar */}
            <NavBar />

            <main>
                {/* Hero Section */}
                <HeroContainer />

                {/* Section X */}
                <div className="h-[calc(100vh)] px-64 bg-white flex justify-center items-center">
                    <h1>Section X</h1>
                </div>
            </main>

            {/* Footer */}
            <FooterContainer />
        </>
    );
};

export default Home;
