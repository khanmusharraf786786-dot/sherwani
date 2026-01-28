import Navigation from './Navigation';
import Hero from './Hero';
import Services from './Services';
import Gallery from './Gallery';
import Reviews from './Reviews';
import Contact from './Contact';
import Footer from './Footer';
import CustomizationChat from './CustomizationChat';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Navigation />
            <Hero />
            <CustomizationChat />
            <Services />
            <Gallery />
            <Reviews />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
