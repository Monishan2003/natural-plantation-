import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { MockDatabase } from '../../lib/database';
import { Product, User } from '../../lib/types';
import { Plus, Edit2, Trash2, Users, Package, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true,
    featured: false
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allProducts, allUsers] = await Promise.all([
        MockDatabase.getAllProducts(),
        MockDatabase.getFromStorage<User>('np_users')
      ]);
      setProducts(allProducts);
      setUsers(allUsers);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const products = MockDatabase.getFromStorage<Product>('np_products');
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        currency: 'LKR',
        category: newProduct.category,
        image: newProduct.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        inStock: newProduct.inStock,
        featured: newProduct.featured
      };

      products.push(product);
      MockDatabase.saveToStorage('np_products', products);
      
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        inStock: true,
        featured: false
      });
      
      setShowAddProduct(false);
      loadData();
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const products = MockDatabase.getFromStorage<Product>('np_products');
      const updatedProducts = products.filter(p => p.id !== productId);
      MockDatabase.saveToStorage('np_products', updatedProducts);
      loadData();
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const toggleProductStatus = async (productId: string, field: 'inStock' | 'featured') => {
    try {
      const products = MockDatabase.getFromStorage<Product>('np_products');
      const productIndex = products.findIndex(p => p.id === productId);
      if (productIndex !== -1) {
        products[productIndex][field] = !products[productIndex][field];
        MockDatabase.saveToStorage('np_products', products);
        loadData();
        toast.success(`Product ${field} updated!`);
      }
    } catch (error) {
      toast.error(`Failed to update product ${field}`);
    }
  };

  const formatPrice = (price: number, currency: string = 'LKR') => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background-light p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Admin Dashboard</h1>
          <p className="text-[var(--text-secondary)]">Manage products, users, and orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground">
                {products.filter(p => p.inStock).length} in stock
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                Registered customers
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured Products</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.filter(p => p.featured).length}</div>
              <p className="text-xs text-muted-foreground">
                Highlighted products
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <Button 
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            {showAddProduct && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                  <CardDescription>Create a new product for your store</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name *</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Aloe Vera">Aloe Vera</SelectItem>
                            <SelectItem value="Wood Furniture">Wood Furniture</SelectItem>
                            <SelectItem value="Tea">Tea</SelectItem>
                            <SelectItem value="Honey">Honey</SelectItem>
                            <SelectItem value="Soap">Soap</SelectItem>
                            <SelectItem value="Kitchen">Kitchen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="price">Price (LKR) *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          placeholder="Enter price"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                          id="image"
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                          placeholder="Enter image URL"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        placeholder="Enter product description"
                        required
                      />
                    </div>
                    
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="inStock"
                          checked={newProduct.inStock}
                          onCheckedChange={(checked) => setNewProduct({...newProduct, inStock: checked})}
                        />
                        <Label htmlFor="inStock">In Stock</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={newProduct.featured}
                          onCheckedChange={(checked) => setNewProduct({...newProduct, featured: checked})}
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-[var(--primary-green)] hover:bg-[var(--primary-green)]/90">
                        Add Product
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowAddProduct(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{product.category}</Badge>
                              {product.featured && <Badge className="bg-[var(--accent-red)]">Featured</Badge>}
                              <Badge variant={product.inStock ? "default" : "destructive"}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </Badge>
                            </div>
                            <p className="font-semibold text-lg" style={{ color: 'var(--primary-green)' }}>
                              {formatPrice(product.price, product.currency)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleProductStatus(product.id, 'inStock')}
                            >
                              {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleProductStatus(product.id, 'featured')}
                            >
                              {product.featured ? 'Unfeature' : 'Feature'}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <h2 className="text-xl font-semibold">User Management</h2>
            <div className="grid gap-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
                        <p className="text-xs text-muted-foreground mt-1">
                          Joined: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                        {user.lastLogin && (
                          <p className="text-xs text-muted-foreground">
                            Last login: {new Date(user.lastLogin).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline">Customer</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};