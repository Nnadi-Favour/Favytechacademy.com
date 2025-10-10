import { Card, CardContent } from '../ui/card';
import { Award, BookOpen, Target, Heart } from 'lucide-react';
import founderImage from "figma:asset/695b3c9ccf25843155855ce1cd8b1471907b60fe.png";

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To democratize AI and digital education, making cutting-edge technology and essential digital skills accessible to every learner, regardless of their background or location.',
    },
    {
      icon: BookOpen,
      title: 'Our Approach',
      description: 'We combine interactive e-books, hands-on projects, and community support to create an engaging learning experience across AI, Web Development, and Google Workspace.',
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Excellence, inclusivity, innovation, and student success drive everything we do at Favy Tech Academy.',
    },
    {
      icon: Award,
      title: 'Our Impact',
      description: 'Empowering hundreds of students to build careers in AI, Web Development, Google Workspace administration, and digital technology.',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h1 className="mb-4">About Favy Tech Academy</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your gateway to mastering AI, Web Development, Google Workspace, and digital skills through innovative e-learning
          </p>
        </div>
      </section>

      {/* Author Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Card className="overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Author Image */}
            <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-700 p-8 flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={founderImage}
                    alt="Favour Nnadi - Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="lg:col-span-2 p-8 md:p-12">
              <div className="space-y-6">
                <div>
                  <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm mb-4">
                    Founder & Lead Educator
                  </div>
                  <h2 className="mb-2">About the Founder — Favour Nnadi</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Digital Education & AI Integration Specialist
                  </p>
                </div>

                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <p>
                    Favour Nnadi is the founder of <strong>Favy Tech Academy</strong>, a dynamic online learning platform that empowers educators, students, and professionals to master <strong>Artificial Intelligence (AI)</strong>, Web Development, and Google Workspace tools through practical, hands-on training.
                  </p>

                  <p>
                    With a strong background in Digital Education, Google Workspace administration, and AI integration, Favour helps people of all levels — from teachers to students — gain the skills to use technology confidently in their daily work and learning. <strong>AI is the primary focus</strong> of the academy, but courses also cover Web Development and Google Workspace essentials.
                  </p>

                  <p>
                    She believes that technology should be accessible, inspiring, and simple to understand, and she has trained many individuals to explore how AI, web technologies, and digital tools can transform teaching, learning, and creativity.
                  </p>

                  <p>
                    Through <strong>Favy Tech Academy</strong>, Favour continues to create opportunities for people to learn, explore, and grow in the fast-changing world of technology, with AI leading the way.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  <span className="px-4 py-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                    Software Engineering
                  </span>
                  <span className="px-4 py-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                    Digital Education
                  </span>
                  <span className="px-4 py-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                    Google Workspaces
                  </span>
                  <span className="px-4 py-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                    AI Integration
                  </span>
                  <span className="px-4 py-2 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
                    Google Educator
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Mission & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <h2 className="mb-4">Our Mission & Values</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Guided by our commitment to excellence and innovation in education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-2">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="mb-4">Our Story</h2>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              Favy Tech Academy was born from a vision to make artificial intelligence education accessible to everyone. 
              We recognized that while AI is transforming industries worldwide, many aspiring learners lack access to 
              quality, affordable education in this field.
            </p>
            
            <p>
              Starting with a small group of passionate students, we've grown into a thriving community of tech 
              enthusiasts. Our comprehensive e-learning platform combines carefully crafted e-books, interactive 
              content, and practical projects to ensure that every student can master AI concepts at their own pace.
            </p>
            
            <p>
              Today, Favy Tech Academy serves hundreds of students across multiple countries, helping them build 
              careers in AI, machine learning, and digital technology. Our success is measured not just in numbers, 
              but in the transformative impact we have on each student's life.
            </p>
            
            <p className="text-lg pt-4 border-t border-gray-200 dark:border-gray-700">
              Join us on this exciting journey as we continue to innovate and expand, making world-class tech 
              education accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl text-blue-600 dark:text-blue-400 mb-2">500+</div>
            <p className="text-gray-600 dark:text-gray-400">Students Enrolled</p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-teal-600 dark:text-teal-400 mb-2">15+</div>
            <p className="text-gray-600 dark:text-gray-400">Course Modules</p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-orange-600 dark:text-orange-400 mb-2">95%</div>
            <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl text-purple-600 dark:text-purple-400 mb-2">24/7</div>
            <p className="text-gray-600 dark:text-gray-400">Community Support</p>
          </div>
        </div>
      </section>
    </div>
  );
}