
import React, { useState } from 'react';
import { ShoppingCart, Play, Star, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [cart, setCart] = useState([]);
  const [currentView, setCurrentView] = useState('home');

  // Sample tutorial data
  const featuredTutorials = [
    {
      id: 1,
      title: "Excel Mastery: From Beginner to Advanced",
      price: 49.99,
      originalPrice: 79.99,
      rating: 4.9,
      students: 15420,
      image: "/placeholder.svg",
      description: "Complete Excel course covering formulas, pivot tables, macros, and advanced analytics",
      duration: "12 hours",
      lessons: 45,
      level: "All Levels",
      bestseller: true
    },
    {
      id: 2,
      title: "Excel Dashboard Creation Masterclass",
      price: 39.99,
      originalPrice: 59.99,
      rating: 4.8,
      students: 8750,
      image: "/placeholder.svg",
      description: "Learn to create stunning, interactive dashboards that wow your clients and colleagues",
      duration: "8 hours",
      lessons: 32,
      level: "Intermediate",
      bestseller: false
    },
    {
      id: 3,
      title: "Excel VBA Programming Complete Guide",
      price: 59.99,
      originalPrice: 89.99,
      rating: 4.7,
      students: 6340,
      image: "/placeholder.svg",
      description: "Master VBA programming to automate tasks and create powerful Excel applications",
      duration: "15 hours",
      lessons: 58,
      level: "Advanced",
      bestseller: false
    }
  ];

  const addToCart = (tutorial) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === tutorial.id);
      if (existing) {
        return prev.map(item => 
          item.id === tutorial.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...tutorial, quantity: 1 }];
    });
  };

  const removeFromCart = (tutorialId) => {
    setCart(prev => prev.filter(item => item.id !== tutorialId));
  };

  const updateQuantity = (tutorialId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(tutorialId);
      return;
    }
    setCart(prev => 
      prev.map(item => 
        item.id === tutorialId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (currentView === 'cart') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div 
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setCurrentView('home')}
              >
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold text-gray-900">ExcelMaster</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('home')}
                className="flex items-center space-x-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Back to Catalog</span>
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Start learning with our amazing Excel tutorials!</p>
              <Button onClick={() => setCurrentView('home')} className="bg-blue-600 hover:bg-blue-700">
                Browse Tutorials
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.duration} • {item.lessons} lessons</p>
                          <div className="flex items-center space-x-4 mt-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-600">
                              ${item.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <h3 className="text-lg font-semibold">Order Summary</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItemCount} items)</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
                      Proceed to Checkout
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      30-day money-back guarantee
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Award className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">ExcelMaster</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentView('cart')}
                className="flex items-center space-x-2 relative"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Excel Like a 
              <span className="text-blue-600"> Pro</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your career with our comprehensive Excel tutorials. From basic formulas to advanced automation, 
              we'll take you from beginner to expert in record time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50,000+</div>
                <div className="text-gray-600">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-gray-600">Expert Tutorials</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Excel Tutorials
            </h2>
            <p className="text-xl text-gray-600">
              Our most popular courses to accelerate your Excel mastery
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTutorials.map(tutorial => (
              <Card key={tutorial.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {tutorial.bestseller && (
                    <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
                      Bestseller
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-t-lg">
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Play className="mr-2 h-5 w-5" />
                      Preview
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-sm">
                      {tutorial.level}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{tutorial.rating}</span>
                      <span className="text-sm text-gray-500">({tutorial.students.toLocaleString()})</span>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {tutorial.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {tutorial.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{tutorial.duration}</span>
                    <span>{tutorial.lessons} lessons</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${tutorial.price}
                      </span>
                      {tutorial.originalPrice > tutorial.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ${tutorial.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button 
                      onClick={() => addToCart(tutorial)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View All Tutorials
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ExcelMaster?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to become an Excel expert
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: "Expert Instructors",
                description: "Learn from industry professionals with years of real-world experience"
              },
              {
                icon: <Play className="h-8 w-8" />,
                title: "HD Video Content",
                description: "Crystal clear video tutorials you can follow along with ease"
              },
              {
                icon: <CheckCircle className="h-8 w-8" />,
                title: "Lifetime Access",
                description: "Once you buy a course, it's yours forever. Learn at your own pace"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Certificates",
                description: "Get recognized for your achievements with completion certificates"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-100 text-blue-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Excel Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have already mastered Excel with our comprehensive tutorials
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-lg">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">ExcelMaster</span>
              </div>
              <p className="text-gray-400">
                Your ultimate destination for mastering Excel skills and advancing your career.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Beginner Excel</li>
                <li>Advanced Formulas</li>
                <li>Data Analysis</li>
                <li>VBA Programming</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Refund Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Newsletter</li>
                <li>Blog</li>
                <li>Community</li>
                <li>Social Media</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ExcelMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
