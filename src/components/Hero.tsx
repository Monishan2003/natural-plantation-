import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import aloeImage1 from 'figma:asset/ff80019072e37ee12a8913fd37b4ff653483488f.png';
import woodenFurnitureImage from 'figma:asset/225c44bb45d8d119006689840d34be5f05e8f9d1.png';
import aloeImage2 from 'figma:asset/0b5db0370ba53d9e8e23ffa9a8d3cd29a5428f79.png';

export function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: aloeImage1,
      title: "Pure Aloe Vera Products",
      subtitle: "Natural healing power for your skin and wellness",
      cta: "Shop Aloe Vera"
    },
    {
      image: woodenFurnitureImage,
      title: "Handcrafted Wood Furniture",
      subtitle: "Sustainable, beautiful furniture for your natural home",
      cta: "View Furniture"
    },
    {
      image: aloeImage2,
      title: "Premium Natural Collection",
      subtitle: "Discover the finest organic products from Sri Lanka",
      cta: "Explore All"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[700px] overflow-hidden">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${slide.image})`
              }}
            >
              {/* Content overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white max-w-4xl px-4">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 font-primary">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-secondary leading-relaxed">
                    {slide.subtitle}
                  </p>
                  <Button 
                    onClick={() => navigate('/shop')}
                    className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90 text-white px-10 py-4 rounded-full text-lg font-secondary"
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 text-white"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[var(--primary-green)] scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
        <div 
          className="h-full bg-[var(--primary-green)] transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
}