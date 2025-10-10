import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BookOpen, Users, Award, Sparkles, Download, Video } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive E-Books',
      description: 'Access comprehensive learning materials with step-by-step guidance',
      color: 'bg-blue-500',
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch engaging video content to master AI, Web Development, and Google Workspace',
      color: 'bg-teal-500',
    },
    {
      icon: Users,
      title: 'Community Learning',
      description: 'Join our WhatsApp community and learn with peers',
      color: 'bg-orange-500',
    },
    {
      icon: Award,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed progress reports',
      color: 'bg-purple-500',
    },
  ];

  const courses = [
    {
      title: 'Introduction to AI',
      description: 'Understand the fundamentals of artificial intelligence (Primary Course)',
      duration: '2 weeks',
      level: 'Beginner',
    },
    {
      title: 'Web Development Basics',
      description: 'Learn HTML, CSS, and JavaScript fundamentals',
      duration: '4 weeks',
      level: 'Beginner',
    },
    {
      title: 'Google Workspace Essentials',
      description: 'Master Google Docs, Sheets, Slides, and Drive',
      duration: '2 weeks',
      level: 'Beginner',
    },
    {
      title: 'Machine Learning for Kids',
      description: 'Fun introduction to ML concepts with practical examples',
      duration: '4 weeks',
      level: 'Intermediate',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm">Welcome to the Future of Learning</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl">
                Welcome to Favy Tech Academy
              </h1>
              
              <p className="text-xl text-white/90">
                Master AI, Web Development & Google Workspace
              </p>
              
              <p className="text-lg text-white/80">
                Join hundreds of students mastering Artificial Intelligence (our primary focus), Web Development, Google Workspace, and digital skills through our comprehensive e-learning platform. Learn at your own pace with expert guidance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="bg-white hover:bg-gray-100 text-blue-600 border-0 text-lg px-8"
                >
                  <BookOpen className="w-5 h-5 mr-2" aria-hidden="true" />
                  Login to Start Learning
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/about')}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1745674684639-9cef0092212c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTk4Mzc3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Students learning AI and technology"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Notice */}
      <section className="py-6 bg-blue-100 dark:bg-blue-900/20 border-y-2 border-blue-200 dark:border-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-lg text-gray-800 dark:text-gray-200">
                <strong>New to Favy Tech Academy?</strong> Contact our support team to register and get your student login credentials after payment.
              </p>
            </div>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white border-0 whitespace-nowrap"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose Favy Tech Academy?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience world-class tech education with our comprehensive platform designed for modern learners
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-xl transition-shadow border-2">
                  <CardHeader>
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Course Offerings</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our curated curriculum designed to take you from beginner to expert
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{course.title}</CardTitle>
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full text-xs">
                      {course.level}
                    </span>
                  </div>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>📅 Duration: {course.duration}</span>
                    <Button size="sm" variant="outline" onClick={() => navigate('/login')}>
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-4">Ready to Start Your AI Learning Journey?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community of learners and unlock your potential in artificial intelligence and technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-white hover:bg-gray-100 text-blue-600 border-0 text-lg px-8"
            >
              Login Now
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/contact')}
              className="bg-white/10 border-white text-white hover:bg-white/20 text-lg px-8"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <p className="text-gray-600 dark:text-gray-400">Active Students</p>
            </div>
            <div>
              <div className="text-4xl text-teal-600 dark:text-teal-400 mb-2">15+</div>
              <p className="text-gray-600 dark:text-gray-400">Course Modules</p>
            </div>
            <div>
              <div className="text-4xl text-orange-600 dark:text-orange-400 mb-2">95%</div>
              <p className="text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}