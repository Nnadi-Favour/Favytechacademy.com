import { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  CheckCircle2, 
  AlertCircle,
  Save,
  Eye
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function LessonPlanner() {
  const { translations } = useApp();
  const [lessonTitle, setLessonTitle] = useState('');
  const [weekNumber, setWeekNumber] = useState('3');
  const [objectives, setObjectives] = useState('');
  const [accessibilityChecked, setAccessibilityChecked] = useState(false);
  const [accessibilityIssues, setAccessibilityIssues] = useState<string[]>([]);

  const googleWorkspaceTools = [
    { name: 'Google Docs', icon: FileText, color: 'bg-blue-500' },
    { name: 'Google Slides', icon: FileText, color: 'bg-yellow-500' },
    { name: 'Google Sheets', icon: FileText, color: 'bg-green-500' },
    { name: 'Google Sites', icon: FileText, color: 'bg-red-500' },
  ];

  const uploadedResources = [
    { name: 'lesson-intro.pdf', type: 'PDF', size: '2.4 MB' },
    { name: 'activity-worksheet.docx', type: 'Document', size: '1.1 MB' },
  ];

  const handleAccessibilityCheck = () => {
    // Simulate accessibility check
    const issues: string[] = [];
    
    if (!lessonTitle.trim()) {
      issues.push('Lesson title is missing');
    }
    
    if (!objectives.trim()) {
      issues.push('Learning objectives are missing');
    }
    
    if (objectives.length > 0 && objectives.length < 20) {
      issues.push('Objectives description is too short');
    }

    // Simulate checking for common accessibility issues
    if (Math.random() > 0.5) {
      issues.push('Consider adding alternative text descriptions for visual content');
    }

    setAccessibilityIssues(issues);
    setAccessibilityChecked(true);
    
    if (issues.length === 0) {
      toast.success('Accessibility check passed! ✓', {
        description: 'Your lesson meets accessibility standards',
      });
    } else {
      toast.error(`Found ${issues.length} accessibility issues`, {
        description: 'Review and fix the highlighted issues',
      });
    }
  };

  const handleSaveLesson = () => {
    if (!lessonTitle.trim()) {
      toast.error('Please add a lesson title');
      return;
    }
    
    toast.success('Lesson saved successfully!', {
      description: 'Your lesson plan has been saved to Google Drive',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">{translations.lessonPlanner}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create engaging, accessible lessons integrated with Google Workspace
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Planner Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Lesson Information</CardTitle>
                <CardDescription>Set up the basic details of your lesson</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lesson-title">{translations.lessonTitle}</Label>
                  <Input
                    id="lesson-title"
                    placeholder="e.g., Introduction to AI-Powered Assessment Tools"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="week-select">Week Number</Label>
                  <Select value={weekNumber} onValueChange={setWeekNumber}>
                    <SelectTrigger id="week-select">
                      <SelectValue placeholder="Select week" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
                        <SelectItem key={week} value={week.toString()}>
                          Week {week}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Objectives */}
            <Card>
              <CardHeader>
                <CardTitle>{translations.weeklyObjectives}</CardTitle>
                <CardDescription>Define what students will learn and achieve</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="objectives">{translations.objectives}</Label>
                  <Textarea
                    id="objectives"
                    placeholder="Enter learning objectives (e.g., Students will be able to...)"
                    rows={6}
                    value={objectives}
                    onChange={(e) => setObjectives(e.target.value)}
                    className="resize-none"
                    aria-required="true"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {objectives.length} characters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Google Workspace Integration */}
            <Card>
              <CardHeader>
                <CardTitle>{translations.googleWorkspace}</CardTitle>
                <CardDescription>Embed Google Workspace tools directly into your lesson</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {googleWorkspaceTools.map((tool, index) => {
                    const Icon = tool.icon;
                    return (
                      <button
                        key={index}
                        className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-[#1E3A8A] dark:hover:border-[#1E3A8A] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => toast.info(`Opening ${tool.name}...`)}
                        aria-label={`Add ${tool.name}`}
                      >
                        <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center mb-2`}>
                          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                        <span className="text-xs text-center">{tool.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Embedded Preview Placeholder */}
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Eye className="w-12 h-12 mx-auto mb-3 text-gray-400" aria-hidden="true" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Google Workspace integration preview will appear here
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Click a tool above to embed it
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Resource Uploader */}
            <Card>
              <CardHeader>
                <CardTitle>{translations.uploadResources}</CardTitle>
                <CardDescription>Add supplementary materials to your lesson</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-[#1E3A8A] dark:hover:border-[#1E3A8A] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" aria-hidden="true" />
                  <p className="mb-1">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports: PDF, DOC, PPT, Images, Videos (Max 10MB for low-bandwidth)
                  </p>
                </div>

                {/* Uploaded Resources List */}
                {uploadedResources.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Resources</Label>
                    {uploadedResources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-[#1E3A8A]" aria-hidden="true" />
                          <div>
                            <p className="text-sm">{resource.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {resource.type} • {resource.size}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" aria-label={`Remove ${resource.name}`}>
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Accessibility Checker */}
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Checker</CardTitle>
                <CardDescription>Ensure your lesson is accessible to all students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleAccessibilityCheck}
                  className="w-full bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white border-0"
                  aria-label="Run accessibility check"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" aria-hidden="true" />
                  {translations.checkAccessibility}
                </Button>

                {accessibilityChecked && (
                  <Alert variant={accessibilityIssues.length === 0 ? 'default' : 'destructive'}>
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    <AlertDescription>
                      {accessibilityIssues.length === 0 ? (
                        <div>
                          <p className="mb-1">All checks passed!</p>
                          <p className="text-xs">Your lesson meets accessibility standards.</p>
                        </div>
                      ) : (
                        <div>
                          <p className="mb-2">Found {accessibilityIssues.length} issues:</p>
                          <ul className="text-xs space-y-1 list-disc list-inside">
                            {accessibilityIssues.map((issue, index) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* WCAG Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>WCAG Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Use high contrast colors</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Add alt text to all images</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Ensure keyboard navigation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>Provide captions for videos</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Actions */}
            <Card>
              <CardContent className="pt-6 space-y-3">
                <Button 
                  onClick={handleSaveLesson}
                  className="w-full bg-[#10B981] hover:bg-[#059669] text-white border-0"
                  aria-label="Save lesson plan"
                >
                  <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                  {translations.saveLesson}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  aria-label="Preview lesson"
                >
                  <Eye className="w-4 h-4 mr-2" aria-hidden="true" />
                  Preview Lesson
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-sm">💡 Pro Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Keep file sizes under 5MB for optimal performance in low-bandwidth environments.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
