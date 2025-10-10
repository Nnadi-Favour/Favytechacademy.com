import { useApp } from '../../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  Download, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  Lightbulb,
  Smartphone
} from 'lucide-react';

export function Analytics() {
  const { translations } = useApp();

  const completionData = [
    { week: 'Week 1', completion: 92 },
    { week: 'Week 2', completion: 85 },
    { week: 'Week 3', completion: 68 },
    { week: 'Week 4', completion: 45 },
    { week: 'Week 5', completion: 22 },
    { week: 'Week 6', completion: 12 },
    { week: 'Week 7', completion: 5 },
    { week: 'Week 8', completion: 0 },
  ];

  const feedbackData = [
    { name: 'Excellent', value: 45, color: '#10B981' },
    { name: 'Good', value: 35, color: '#3B82F6' },
    { name: 'Average', value: 15, color: '#F59E0B' },
    { name: 'Needs Improvement', value: 5, color: '#EF4444' },
  ];

  const engagementData = [
    { date: 'Oct 1', active: 42 },
    { date: 'Oct 2', active: 48 },
    { date: 'Oct 3', active: 45 },
    { date: 'Oct 4', active: 52 },
    { date: 'Oct 5', active: 49 },
    { date: 'Oct 6', active: 55 },
    { date: 'Oct 7', active: 58 },
  ];

  const keyMetrics = [
    {
      title: 'Total Students',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Lessons',
      value: '24',
      change: '+8%',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-[#10B981]',
    },
    {
      title: 'Completion Rate',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: Award,
      color: 'bg-purple-500',
    },
    {
      title: 'Avg. Engagement',
      value: '4.2/5',
      change: '+0.3',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  const uxTips = [
    {
      title: 'Optimize for Mobile Learners',
      description: '72% of your students access content via mobile. Keep layouts simple and touch-friendly.',
      icon: Smartphone,
    },
    {
      title: 'Break Content into Chunks',
      description: 'Students complete shorter lessons 35% faster. Consider splitting long modules.',
      icon: BookOpen,
    },
    {
      title: 'Use Visual Feedback',
      description: 'Progress indicators increase completion rates by 23%. Add more visual cues.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="mb-2">{translations.analyticsOverview}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track student progress and lesson effectiveness
            </p>
          </div>
          <Button 
            className="bg-[#10B981] hover:bg-[#059669] text-white border-0 w-full sm:w-auto"
            aria-label="Export analytics to Google Sheets"
          >
            <Download className="w-4 h-4 mr-2" aria-hidden="true" />
            {translations.exportToSheets}
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${metric.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                    </div>
                    <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="bg-[#10B981] text-white border-0">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-2xl mb-1">{metric.value}</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{metric.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Completion Rates Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{translations.studentCompletion}</CardTitle>
                <CardDescription>Weekly completion rates across the program</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={completionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completion" fill="#1E3A8A" name="Completion %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Active Users</CardTitle>
                <CardDescription>Student engagement over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="active" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Active Students"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Feedback Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>{translations.feedbackDistribution}</CardTitle>
                <CardDescription>Student satisfaction ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-around">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={feedbackData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {feedbackData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4 md:mt-0">
                    {feedbackData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                          aria-hidden="true"
                        ></div>
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* UX Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" aria-hidden="true" />
                  <span>{translations.uxTips}</span>
                </CardTitle>
                <CardDescription>Data-driven insights to improve your teaching</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {uxTips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#1E3A8A] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="text-sm mb-1">{tip.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg. Session Time</span>
                  <span>18 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Resources Viewed</span>
                  <span>1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Assignments Submitted</span>
                  <span>89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Mobile vs Desktop</span>
                  <span>72% / 28%</span>
                </div>
              </CardContent>
            </Card>

            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>Download your analytics data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Export as PDF
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Export as CSV
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                  Share Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
