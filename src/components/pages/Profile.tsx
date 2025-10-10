import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  User, 
  Mail, 
  Upload, 
  Save, 
  Calendar,
  Video,
  MapPin,
  Award
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Profile() {
  const { translations, language, setLanguage, darkMode, toggleDarkMode, fontSize, setFontSize } = useApp();
  const [displayName, setDisplayName] = useState('Sarah Mensah');
  const [email, setEmail] = useState('sarah.mensah@edutech.org');
  const [location, setLocation] = useState('Accra, Ghana');

  const upcomingWorkshops = [
    {
      title: 'Advanced AI Integration Techniques',
      date: 'October 15, 2025',
      time: '2:00 PM GMT',
      instructor: 'Dr. Kwame Nkrumah',
    },
    {
      title: 'Creating Accessible Digital Content',
      date: 'October 22, 2025',
      time: '3:00 PM GMT',
      instructor: 'Prof. Amina Ibrahim',
    },
    {
      title: 'Low-Bandwidth Teaching Strategies',
      date: 'October 29, 2025',
      time: '1:00 PM GMT',
      instructor: 'Dr. Chidi Okonkwo',
    },
  ];

  const achievements = [
    { title: 'Week 1 Completed', icon: '🎯', date: 'Sep 15' },
    { title: 'Week 2 Completed', icon: '⭐', date: 'Sep 22' },
    { title: 'First Lesson Created', icon: '📝', date: 'Sep 28' },
    { title: 'Active Learner', icon: '🔥', date: 'Oct 5' },
  ];

  const handleSaveSettings = () => {
    toast.success('Settings saved successfully!', {
      description: 'Your preferences have been updated',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">{translations.profileSettings}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle>{translations.editProfile}</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1661877854265-48a976379af4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzU5OTIxMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Profile picture of Sarah Mensah" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="mb-2" aria-label="Upload new profile photo">
                      <Upload className="w-4 h-4 mr-2" aria-hidden="true" />
                      {translations.uploadPhoto}
                    </Button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      JPG, PNG or GIF. Max size 2MB
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display-name">
                      <User className="w-4 h-4 inline mr-1" aria-hidden="true" />
                      {translations.displayName}
                    </Label>
                    <Input
                      id="display-name"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="w-4 h-4 inline mr-1" aria-hidden="true" />
                      {translations.email}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="location">
                      <MapPin className="w-4 h-4 inline mr-1" aria-hidden="true" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Accra, Ghana"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>{translations.accessibilitySettings}</CardTitle>
                <CardDescription>Customize your learning experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language Preference */}
                <div className="space-y-2">
                  <Label htmlFor="language-select">{translations.languagePreference}</Label>
                  <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'fr')}>
                    <SelectTrigger id="language-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">{translations.darkModeToggle}</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Reduce eye strain in low-light environments
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={darkMode}
                    onCheckedChange={toggleDarkMode}
                    aria-label="Toggle dark mode"
                  />
                </div>

                <Separator />

                {/* Font Size Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size">{translations.fontSizeLabel}</Label>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{fontSize}px</span>
                  </div>
                  <Slider
                    id="font-size"
                    min={12}
                    max={24}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    aria-label="Adjust font size"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>

                <Separator />

                {/* Save Button */}
                <Button 
                  onClick={handleSaveSettings}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white border-0"
                  aria-label="Save profile settings"
                >
                  <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                  {translations.saveSettings}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" aria-hidden="true" />
                  <span>Achievements</span>
                </CardTitle>
                <CardDescription>Your learning milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="text-2xl" role="img" aria-label={achievement.title}>
                      {achievement.icon}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Workshops */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-[#1E3A8A]" aria-hidden="true" />
                  <span>{translations.upcomingWorkshops}</span>
                </CardTitle>
                <CardDescription>Live sessions and events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingWorkshops.map((workshop, index) => (
                  <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-[#1E3A8A] dark:hover:border-[#1E3A8A] transition-colors">
                    <h4 className="text-sm mb-2">{workshop.title}</h4>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" aria-hidden="true" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Video className="w-3 h-3 mr-1" aria-hidden="true" />
                        <span>{workshop.time}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" aria-hidden="true" />
                        <span>{workshop.instructor}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full mt-3 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white border-0"
                      aria-label={`Register for ${workshop.title}`}
                    >
                      Register
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] text-white border-0">
              <CardHeader>
                <CardTitle className="text-white">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80">Lessons Completed</span>
                  <span>12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Hours Learned</span>
                  <span>24.5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Streak Days</span>
                  <span>7 🔥</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Resources Created</span>
                  <span>8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
