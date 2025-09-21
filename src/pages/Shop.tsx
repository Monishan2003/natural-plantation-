import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Search, Filter } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

export function Shop() {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'organic-foods', label: 'Organic Foods' },
    { value: 'health-supplements', label: 'Health Supplements' },
    { value: 'aloe-vera', label: 'Aloe Vera Products' },
    { value: 'wood-furniture', label: 'Wood Furniture' },
    { value: 'personal-care', label: 'Personal Care' },
    { value: 'home-garden', label: 'Home & Garden' }
  ];

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="pt-8 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            Our Product Store
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-secondary max-w-2xl mx-auto">
            Discover our complete range of organic products, from fresh foods to natural health supplements, 
            all sourced from sustainable farms across Sri Lanka.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-[var(--secondary-green)] rounded-lg">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--text-secondary)]" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-[var(--border)]"
              />
            </div>
          </div>
          <div className="md:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white border-[var(--border)]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:w-48">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="bg-white border-[var(--border)]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[var(--text-secondary)] font-secondary">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                className="hover:shadow-lg transition-shadow duration-300"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              No products found
            </h3>
            <p className="text-[var(--text-secondary)] font-secondary mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('name');
              }}
              className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}