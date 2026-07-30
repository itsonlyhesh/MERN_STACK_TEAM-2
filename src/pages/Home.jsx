import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Categories from "../components/Categories/Categories";
import TodayDeals from "../components/TodayDeals/TodayDeals";
import FeaturedCollections from "../components/FeaturedCollections/FeaturedCollections";
import TrendingProducts from "../components/TrendingProducts/TrendingProducts";
import Brands from "../components/Brands/Brands";
//import WhyChooseUs from "../components/WhyChooseUs/WhyChooseUs";
import StoreInfo from "../components/StoreInfo/StoreInfo";
import Footer from "../components/Footer/Footer";
//import WeeklyHighlights from "../components/WeeklyHighlights/WeeklyHighlights";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <TodayDeals />
      <Brands/>
      <FeaturedCollections />
       <StoreInfo />
       <Footer />
    </>
  );
}

export default Home;