import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { CheckCircle2, BookOpen, Users, Globe, Zap } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Landing() {
  const { translations } = useApp();
  const navigate = useNavigate();

  const features = [
    {
      icon: BookOpen,
      title: '8-Week Curriculum',
      description: 'Structured learning path from AI basics to advanced integration',
    },
    {
      icon: Users,
      title: 'Collaborative Learning',
      description: 'Connect with educators across Ghana and Nigeria',
    },
    {
      icon: Globe,
      title: 'Low-Bandwidth Optimized',
      description: 'Works seamlessly even with limited internet connectivity',
    },
    {
      icon: Zap,
      title: 'Google Workspace Integration',
      description: 'Seamlessly integrate with Docs, Slides, Sheets, and Sites',
    },
  ];

  const weeklyTopics = [
    { week: 1, topic: 'Introduction to AI & Ethics', status: 'completed' },
    { week: 2, topic: 'AI Tools for Lesson Planning', status: 'completed' },
    { week: 3, topic: 'Creating Interactive Content', status: 'inProgress' },
    { week: 4, topic: 'Assessment & Analytics', status: 'notStarted' },
    { week: 5, topic: 'Personalized Learning Paths', status: 'notStarted' },
    { week: 6, topic: 'Collaboration & Communication', status: 'notStarted' },
    { week: 7, topic: 'Advanced AI Integration', status: 'notStarted' },
    { week: 8, topic: 'Capstone Project & Certification', status: 'notStarted' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl">{translations.heroTitle}</h1>
              <p className="text-lg sm:text-xl text-white/90">
                {translations.heroSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#10B981] hover:bg-[#059669] text-white border-0"
                  onClick={() => navigate('/dashboard')}
                  aria-label="Enroll in the program"
                >
                  {translations.enrollNow}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      aria-label="View full curriculum"
                    >
                      {translations.viewCurriculum}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>8-Week AI Literacy Curriculum</DialogTitle>
                      <DialogDescription>
                        Comprehensive program designed for educators in emerging markets
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3">
                      {weeklyTopics.map((item) => (
                        <div key={item.week} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-[#1E3A8A] text-white rounded-full">
                              {item.week}
                            </div>
                            <span>{item.topic}</span>
                          </div>
                          {item.status === 'completed' && (
                            <CheckCircle2 className="w-5 h-5 text-[#10B981]" aria-label="Completed" />
                          )}
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/flagged/photo-1579133311477-9121405c78dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwdGVhY2hlciUyMGNsYXNzcm9vbSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU5OTI1MjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Teachers using technology in an African classroom"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle>Get Started Today</CardTitle>
              <CardDescription>Sign in with your Google account to access the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 flex items-center justify-center space-x-2"
                onClick={() => {
                  // Mock login - navigate to dashboard
                  navigate('/dashboard');
                }}
                aria-label="Sign in with Google"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>{translations.loginWithGoogle}</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4">{translations.aboutProgram}</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
              {translations.aboutText}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-[#1E3A8A] rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
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

      {/* Stats Section */}
      <section className="py-16 bg-[#1E3A8A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl mb-2">50+</div>
              <p className="text-white/80">Active Educators</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl mb-2">25%</div>
              <p className="text-white/80">Engagement Increase</p>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl mb-2">8</div>
              <p className="text-white/80">Weeks of Learning</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
