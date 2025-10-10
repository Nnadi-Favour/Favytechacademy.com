import { Card, CardContent } from '../ui/card';
import { Mail, Linkedin, Github } from 'lucide-react';
import preciousImage from "figma:asset/462124ee2497dfcbd98bc745a84be68e9af95880.png";
import estherImage from "figma:asset/a73ca194ee26b83d0e162cf932b03d9e2aa10154.png";

export function Team() {
  const teamMembers = [
    {
      name: 'Precious',
      role: 'Scratch Programming Guide',
      specialty: 'Guide for Scratch',
      bio: 'Precious is a passionate guide specializing in Scratch programming and visual coding for young learners. With expertise in Digital Learning, Google for Education, and AI integration, she creates engaging, age-appropriate content that makes programming accessible and fun for everyone.',
      expertise: ['Digital Learning', 'Google for Education', 'AI Integration', 'Scratch Programming'],
      image: preciousImage,
    },
    {
      name: 'Esther',
      role: 'Machine Learning Guide',
      specialty: 'Guide for Machine Learning',
      bio: 'Esther brings deep knowledge in machine learning and artificial intelligence education. Specializing in Digital Learning, Google for Education, and AI applications, she helps students understand complex ML concepts through practical, hands-on approaches that build confidence and expertise.',
      expertise: ['Digital Learning', 'Google for Education', 'AI Integration', 'Machine Learning'],
      image: estherImage,
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h1 className="mb-4">Meet Our Expert Team</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Dedicated educators and industry professionals committed to your success in AI and technology
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="space-y-12">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <div className={`grid grid-cols-1 lg:grid-cols-3 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                {/* Image Section */}
                <div className={`lg:col-span-1 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-8 flex items-center justify-center ${index % 2 === 1 ? 'lg:col-start-3' : ''}`}>
                  <div className="relative w-full max-w-sm">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.role}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-3xl">👩‍🏫</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className={`lg:col-span-2 p-8 md:p-12 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div className="space-y-6">
                    <div>
                      <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm mb-4">
                        {member.role}
                      </div>
                      <h2 className="mb-2">{member.name}</h2>
                      <p className="text-lg text-blue-600 dark:text-blue-400 mb-4">
                        📚 {member.specialty}
                      </p>
                    </div>

                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                      <p>{member.bio}</p>
                    </div>

                    {/* Expertise Tags */}
                    <div>
                      <h4 className="text-sm mb-3">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Links Placeholder */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Connect:</span>
                      <button
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                      </button>
                      <button
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Team Info */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="mb-4">Why Our Team Stands Out</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="mb-2">Expert Educators</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Years of experience in tech education and curriculum development
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="mb-2">Industry Experience</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-world expertise in AI, ML, and software development
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="mb-2">Student-Focused</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Passionate about making complex concepts accessible and fun
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-12">
          <h2 className="text-white mb-4">Want to Join Our Team?</h2>
          <p className="text-lg text-white/90 mb-6">
            We're always looking for passionate educators and tech professionals to expand our team.
          </p>
          <a
            href="mailto:help.favytechacademy@gmail.com"
            className="inline-block px-8 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* Photo Upload Note */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-700 dark:text-gray-300">
              <p className="mb-2">
                <strong>👩‍🏫 Meet Our Guides:</strong> Dedicated to making AI and technology education accessible to all learners.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Our team brings together expertise in digital learning, AI integration, and Google for Education.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}