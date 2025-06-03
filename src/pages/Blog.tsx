
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Restoring a 1920s Family Portrait: A Journey Through Time",
      excerpt: "Discover how we brought back life to a severely damaged family portrait from the 1920s, using advanced AI techniques and careful manual refinement.",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop&auto=format&sepia=100&brightness=0.7",
      restoredImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop&auto=format",
      author: "Restoration Team",
      date: "December 15, 2024",
      readTime: "5 min read",
      content: "This 1920s family portrait came to us with extensive water damage, torn edges, and severe fading. The challenge was not just technical but emotional - this was the only remaining photo of four generations of a family..."
    },
    {
      id: 2,
      title: "Wedding Memories from 1955: Bringing Back the Joy",
      excerpt: "A wedding photo from 1955 that survived decades in poor storage conditions gets a new lease on life through our restoration process.",
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=400&fit=crop&auto=format&sepia=100&brightness=0.5",
      restoredImage: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=400&fit=crop&auto=format",
      author: "Restoration Team",
      date: "December 10, 2024",
      readTime: "4 min read",
      content: "This beautiful wedding photograph from 1955 came to us with significant yellowing, scratches across the bride's dress, and missing corners. The couple's daughter wanted to surprise them for their 65th anniversary..."
    },
    {
      id: 3,
      title: "Military Service Photo: Honoring a Hero's Memory",
      excerpt: "Restoring a WWII military service photo that had been damaged by time and poor storage, preserving the memory of a true hero.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format&sepia=100&brightness=0.6",
      restoredImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&auto=format",
      author: "Restoration Team",
      date: "December 5, 2024",
      readTime: "6 min read",
      content: "This World War II service photo held immense sentimental value for the veteran's family. Years of storage in a basement had left it with mold damage, creases, and significant fading..."
    },
    {
      id: 4,
      title: "Childhood Memories: Restoring a 1960s School Photo",
      excerpt: "A class photo from the 1960s gets carefully restored, bringing back memories of childhood friendships and simpler times.",
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop&auto=format&sepia=100&brightness=0.6",
      restoredImage: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop&auto=format",
      author: "Restoration Team",
      date: "November 28, 2024",
      readTime: "3 min read",
      content: "This 1960s elementary school class photo came to us as part of a reunion project. The original had suffered from sun damage and had several tears from being stored in an old album..."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Restoration Case Studies
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our detailed case studies showcasing the art and science of photo restoration. 
              Each story represents a unique challenge and the journey to preserve precious memories.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <div className="grid grid-cols-2 gap-2 p-4">
                    <div className="relative">
                      <img 
                        src={post.image} 
                        alt={`${post.title} - Before`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs">
                        Before
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={post.restoredImage} 
                        alt={`${post.title} - After`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div className="absolute top-1 left-1 bg-green-500 text-white px-1 py-0.5 rounded text-xs">
                        After
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-gray-900 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {post.content}
                    </p>
                    <button className="text-amber-700 hover:text-amber-800 font-medium text-sm mt-2 inline-flex items-center">
                      Read full case study →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Load More Case Studies
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
