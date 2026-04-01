import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import QuickCategories from "@/components/landing/QuickCategories";
import PromoBanner from "@/components/landing/PromoBanner";
import ShopByCategory from "@/components/landing/ShopByCategory";
import ProductGrid, { allProducts } from "@/components/landing/ProductGrid";
import TrendsBanner from "@/components/landing/TrendsBanner";
import FoundationBanner from "@/components/landing/FoundationBanner";
import BrandsOnBoard from "@/components/landing/BrandsOnBoard";
import OffersSection from "@/components/landing/OffersSection";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
import BrandCTA from "@/components/landing/BrandCTA";
import StatsBar from "@/components/landing/StatsBar";
import LandingFooter from "@/components/landing/LandingFooter";

const Index = () => (
  <main>
    <LandingNavbar />
    {/* Spacer for fixed nav with marquee */}
    <div className="h-[105px] lg:h-[120px]" />
    <LandingHero />
    <QuickCategories />
    <PromoBanner />
    <ShopByCategory />
    <ProductGrid
      id="new-arrivals"
      title="Back In Stock"
      subtitle="Restocked favorites you love"
      products={allProducts.slice(0, 4)}
      bgClass="bg-background"
    />
    <TrendsBanner />
    <ProductGrid
      id="best-sellers"
      title="Best Sellers"
      subtitle="Top picks loved by thousands"
      products={allProducts.slice(2, 6)}
      bgClass="bg-background"
    />
    <FoundationBanner />
    <BrandsOnBoard />
    <ProductGrid
      title="Flying Off The Shelves"
      subtitle="Grab them before they're gone"
      products={allProducts.slice(4, 8)}
      bgClass="bg-card"
    />
    <OffersSection />
    <LandingTestimonials />
    <BrandCTA />
    <StatsBar />
    <LandingFooter />
  </main>
);

export default Index;
