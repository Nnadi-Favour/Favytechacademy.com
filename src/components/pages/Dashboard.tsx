import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  CheckCircle2, 
  Circle, 
  PlusCircle, 
  BookOpen, 
  Video, 
  FileText,
  Clock,
  TrendingUp
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Dashboard() {
  const { translations } = useApp();
  const navigate = useNavigate();

  const weeklyProgress = [
    { week: 1, title: 'AI Basics & Ethics', status: 'completed', progress: 100 },
    { week: 2, title: 'Lesson Planning Tools', status: 'completed', progress: 100 },
    { week: 3, title: 'Interactive Content', status: 'inProgress', progress: 60 },
    { week: 4, title: 'Assessment & Analytics', status: 'notStarted', progress: 0 },
    { week: 5, title: 'Personalized Learning', status: 'notStarted', progress: 0 },
    { week: 6, title: 'Collaboration Tools', status: 'notStarted', progress: 0 },
    { week: 7, title: 'Advanced Integration', status: 'notStarted', progress: 0 },
    { week: 8, title: 'Capstone Project', status: 'notStarted', progress: 0 },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Week 1: AI Basics – Completed Slide',
      type: 'slides',
      time: '2 hours ago',
      icon: FileText,
    },
    {
      id: 2,
      title: 'Uploaded lesson plan to Google Docs',
      type: 'docs',
      time: '5 hours ago',
      icon: BookOpen,
    },
    {
      id: 3,
      title: 'Watched: Introduction to AI Ethics',
      type: 'video',
      time: '1 day ago',
      icon: Video,
    },
    {
      id: 4,
      title: 'Completed Week 2 Assessment',
      type: 'assessment',
      time: '2 days ago',
      icon: CheckCircle2,
    },
  ];

  const quickActions = [
    {
      title: translations.createLesson,
      description: 'Start a new lesson plan',
      icon: PlusCircle,
      color: 'bg-[#10B981]',
      action: () => navigate('/planner'),
    },
    {
      title: translations.viewResources,
      description: 'Access course materials',
      icon: BookOpen,
      color: 'bg-[#1E3A8A]',
      action: () => {},
    },
    {
      title: translations.joinWorkshop,
      description: 'Join live session',
      icon: Video,
      color: 'bg-purple-600',
      action: () => {},
    },
  ];

  const completedWeeks = weeklyProgress.filter(w => w.status === 'completed').length;
  const overallProgress = (completedWeeks / weeklyProgress.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="mb-2">{translations.welcomeBack}, Teacher!</h1>
          <p className="text-gray-600 dark:text-gray-400">
            You're making great progress on your AI literacy journey
          </p>
        </div>

        {/* Overall Progress Card */}
        <Card className="mb-8 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] text-white border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">{translations.yourProgress}</CardTitle>
                <CardDescription className="text-white/80">
                  {completedWeeks} of 8 weeks completed
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-8 h-8 text-[#10B981]" aria-hidden="true" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={overallProgress} className="h-3 bg-white/20" />
            <p className="mt-2 text-sm text-white/90">{Math.round(overallProgress)}% Complete</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>8-Week Timeline</CardTitle>
                <CardDescription>Track your progress through the AI literacy program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyProgress.map((week) => (
                    <div 
                      key={week.week} 
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() => {
                        if (week.status !== 'notStarted') {
                          navigate('/planner');
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Week ${week.week}: ${week.title} - ${translations[week.status as keyof typeof translations]}`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {week.status === 'completed' ? (
                          <CheckCircle2 className="w-6 h-6 text-[#10B981]" aria-hidden="true" />
                        ) : week.status === 'inProgress' ? (
                          <div className="w-6 h-6 rounded-full border-4 border-[#1E3A8A] border-t-transparent animate-spin" aria-hidden="true"></div>
                        ) : (
                          <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {translations.weekTimeline} {week.week}
                            </span>
                            <h4>{week.title}</h4>
                          </div>
                          <Badge variant={week.status === 'completed' ? 'default' : week.status === 'inProgress' ? 'secondary' : 'outline'}>
                            {translations[week.status as keyof typeof translations]}
                          </Badge>
                        </div>
                        {week.progress > 0 && (
                          <Progress value={week.progress} className="h-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>{translations.activityFeed}</CardTitle>
                <CardDescription>Your recent learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div 
                        key={activity.id} 
                        className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex-shrink-0 w-10 h-10 bg-[#1E3A8A] rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p>{activity.title}</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 mr-1" aria-hidden="true" />
                            <span>{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{translations.quickActions}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      onClick={action.action}
                      className={`w-full ${action.color} hover:opacity-90 text-white border-0 justify-start h-auto py-4`}
                      aria-label={action.title}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <Icon className="w-5 h-5 mt-0.5" aria-hidden="true" />
                        <div className="text-left">
                          <div className="text-sm">{action.title}</div>
                          <div className="text-xs text-white/80 mt-0.5">{action.description}</div>
                        </div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Motivational Card */}
            <Card className="overflow-hidden">
              <div className="relative h-32">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1608986596619-eb50cc56831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBvbmxpbmUlMjBsZWFybmluZ3xlbnwxfHx8fDE3NTk5MjUyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Education inspiration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <CardContent className="pt-4">
                <h4 className="mb-2">Keep Going! 🚀</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  You're 60% through Week 3. Complete the interactive content module to unlock Week 4!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
