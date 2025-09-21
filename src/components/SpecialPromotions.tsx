import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useCart } from "../hooks/useCart";
import { toast } from "sonner@2.0.3";

export function SpecialPromotions() {
  const { addToCart } = useCart();
  const products = [

    {
      id: 2,
      name: "Pure Organic Honey",
      price: "LKR 1,999",
      originalPrice: "LKR 2,499",
      image: "https://images.unsplash.com/photo-1645549826194-1956802d83c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwaG9uZXklMjBqYXJ8ZW58MXx8fHwxNzU3NTg5NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "SALE"
    },
    {
      id: 3,
      name: "Aloe Vera Gel",
      price: "LKR 1,699",
      originalPrice: "LKR 1,999",
      image: "https://farmaimpresa.com/wp-content/uploads/2025/01/Gel-all_Aloe-Vera-per-Piaghe-da-Decubito-1920x960.webp",
      badge: "POPULAR"
    },
    {
      id: 4,
      name: "Bamboo Cutting Board",
      price: "LKR 3,499",
      originalPrice: "LKR 3,999",
      image: "data:image/jpeg;base64,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",
      badge: "HOT"
    },

    {
      id: 6,
      name: "Organic Soap Bar",
      price: "LKR 899",
      originalPrice: "LKR 1,199",
      image: "data:image/jpeg;base64,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",
      badge: "NEW"
    },

    {
      id: 8,
      name: "Wooden Furniture Set",
      price: "LKR 12,999",
      originalPrice: "LKR 15,999",
      image: "https://images.unsplash.com/photo-1756362401802-2c099b34c177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBmdXJuaXR1cmUlMjBuYXR1cmFsfGVufDF8fHx8MTc1NzU5MjgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      badge: "HOT"
    }
  ];

  return (
    <section className="py-20 bg-[var(--background-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 font-primary">
            🌟 Special Promotions
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-secondary">
            Don't miss out on these amazing deals on our premium natural products
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-[var(--border)] hover:border-[var(--primary-green)]/30">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge 
                    className={`absolute top-3 left-3 font-secondary ${
                      product.badge === 'SALE' ? 'bg-[var(--accent-red)]' : 
                      product.badge === 'NEW' ? 'bg-[var(--primary-green)]' : 
                      product.badge === 'HOT' ? 'bg-[var(--neutral-brown)]' : 'bg-[var(--primary-green)]'
                    } text-white`}
                  >
                    {product.badge}
                  </Badge>
                </div>
                
                <div className="p-5">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3 font-secondary">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-[var(--primary-green)] font-secondary">{product.price}</span>
                    <span className="text-sm text-[var(--text-secondary)] line-through font-secondary">{product.originalPrice}</span>
                  </div>
                  <Button 
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: parseFloat(product.price.replace('LKR ', '').replace(',', '')),
                        image: product.image,
                        category: 'special-promotion'
                      });
                      toast.success(`${product.name} added to cart!`);
                    }}
                    className="w-full bg-[var(--accent-red)] hover:bg-[var(--accent-red)]/90 text-white font-secondary"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}