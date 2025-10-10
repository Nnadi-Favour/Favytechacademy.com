import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen,
  Video,
  FileText,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function EBook() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialChapter = (location.state as any)?.chapterId || 1;
  const [currentChapter, setCurrentChapter] = useState(initialChapter);

  const chapters = [
    {
      id: 1,
      title: 'Introduction to AI',
      sections: [
        { title: 'What is Artificial Intelligence?', content: 'Artificial Intelligence (AI) is the simulation of human intelligence by machines...' },
        { title: 'History of AI', content: 'AI has its roots in ancient history, but modern AI began in the 1950s...' },
        { title: 'Types of AI', content: 'There are three main types of AI: Narrow AI, General AI, and Super AI...' },
        { title: 'AI in Daily Life', content: 'From voice assistants to recommendation systems, AI is everywhere...' },
      ],
      hasVideo: true,
      hasPDF: true,
    },
    {
      id: 2,
      title: 'Exploring AI Tools',
      sections: [
        { title: 'Popular AI Platforms', content: 'ChatGPT, DALL-E, Midjourney, and more are transforming how we work...' },
        { title: 'AI for Content Creation', content: 'Learn how to use AI tools for writing, design, and multimedia...' },
        { title: 'AI for Education', content: 'Personalized learning platforms powered by AI...' },
        { title: 'Hands-On Exercises', content: 'Practice using AI tools with guided exercises...' },
      ],
      hasVideo: true,
      hasPDF: true,
    },
    {
      id: 3,
      title: 'Machine Learning for Kids',
      sections: [
        { title: 'What is Machine Learning?', content: 'Machine Learning is a subset of AI that allows computers to learn from data...' },
        { title: 'Simple ML Concepts', content: 'Classification, regression, and clustering explained simply...' },
        { title: 'Building Your First Model', content: 'Step-by-step guide to creating a simple ML model...' },
        { title: 'Fun ML Projects', content: 'Exciting projects like image recognition and predictive games...' },
      ],
      hasVideo: true,
      hasPDF: true,
    },
    {
      id: 4,
      title: 'Scratch Programming',
      sections: [
        { title: 'Introduction to Scratch', content: 'Scratch is a visual programming language perfect for beginners...' },
        { title: 'Your First Program', content: 'Create an animated story in Scratch...' },
        { title: 'Interactive Games', content: 'Build games with sprites, sounds, and logic...' },
        { title: 'Advanced Scratch Techniques', content: 'Variables, lists, and custom blocks...' },
      ],
      hasVideo: true,
      hasPDF: true,
    },
    {
      id: 5,
      title: 'Hosting & Sharing Projects',
      sections: [
        { title: 'What is Web Hosting?', content: 'Understanding domains, servers, and hosting platforms...' },
        { title: 'Deploying Your First Project', content: 'Step-by-step guide to publishing your Scratch project...' },
        { title: 'Sharing on Social Media', content: 'Best practices for showcasing your work...' },
        { title: 'Building a Portfolio', content: 'Create a professional portfolio of your projects...' },
      ],
      hasVideo: true,
      hasPDF: true,
    },
  ];

  const currentChapterData = chapters.find(ch => ch.id === currentChapter) || chapters[0];

  const handleDownload = () => {
    toast.success('PDF Download Started!', {
      description: `Downloading: ${currentChapterData.title}`,
    });
    // Simulate download
    setTimeout(() => {
      toast.success('Download Complete!');
    }, 2000);
  };

  const handlePrevious = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentChapter < chapters.length) {
      setCurrentChapter(currentChapter + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/student')}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="mb-2">Course E-Book</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive learning materials with downloadable PDFs
              </p>
            </div>
            
            <Button
              onClick={handleDownload}
              className="bg-orange-500 hover:bg-orange-600 text-white border-0"
            >
              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
              Download Current Chapter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Chapter Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-base">Chapters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        setCurrentChapter(chapter.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentChapter === chapter.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <BookOpen className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <div className="text-sm">Chapter {chapter.id}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {chapter.title}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={() => {
                      toast.success('Downloading all chapters...');
                    }}
                    variant="outline"
                    className="w-full text-sm"
                    size="sm"
                  >
                    <Download className="w-3 h-3 mr-2" aria-hidden="true" />
                    Download All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary">Chapter {currentChapterData.id}</Badge>
                      {currentChapterData.hasVideo && (
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <Video className="w-3 h-3" aria-hidden="true" />
                          <span>Video</span>
                        </Badge>
                      )}
                      {currentChapterData.hasPDF && (
                        <Badge variant="outline" className="flex items-center space-x-1">
                          <FileText className="w-3 h-3" aria-hidden="true" />
                          <span>PDF</span>
                        </Badge>
                      )}
                    </div>
                    <CardTitle>{currentChapterData.title}</CardTitle>
                    <CardDescription className="mt-2">
                      Complete this chapter to advance your AI knowledge
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="content" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="video">Video Tutorial</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="content" className="mt-6">
                    <div className="space-y-8">
                      {currentChapterData.sections.map((section, index) => (
                        <div key={index} className="space-y-3">
                          <h3 className="text-blue-600 dark:text-blue-400">
                            {index + 1}. {section.title}
                          </h3>
                          <div className="prose dark:prose-invert max-w-none">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {section.content}
                            </p>
                            
                            {/* Placeholder for detailed content */}
                            <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                📚 <strong>Learning Content Preview</strong>
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                This section contains comprehensive learning materials including:
                              </p>
                              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 list-disc list-inside">
                                <li>Step-by-step explanations</li>
                                <li>Visual diagrams and illustrations</li>
                                <li>Real-world examples</li>
                                <li>Practice exercises</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Interactive Section */}
                      <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 rounded-lg">
                        <h4 className="mb-3">🎯 Practice Exercise</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                          Apply what you've learned with hands-on exercises and projects.
                        </p>
                        <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white border-0">
                          Start Exercise
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="mt-6">
                    <div className="space-y-6">
                      {/* Video Placeholder */}
                      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-teal-600/20"></div>
                        <div className="relative text-center text-white z-10">
                          <Video className="w-16 h-16 mx-auto mb-4 opacity-50" aria-hidden="true" />
                          <h4 className="text-white mb-2">Video Tutorial Placeholder</h4>
                          <p className="text-white/80 text-sm mb-4">
                            Video content for {currentChapterData.title}
                          </p>
                          <Button
                            size="sm"
                            className="bg-white text-gray-900 hover:bg-gray-100 border-0"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                            Watch on YouTube
                          </Button>
                        </div>
                      </div>

                      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                        <CardContent className="pt-6">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>📹 Video Tutorial Note:</strong> This is a placeholder for video content.
                            Videos can be embedded here using YouTube, Vimeo, or self-hosted solutions.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources" className="mt-6">
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                              </div>
                              <div>
                                <h4 className="text-sm">{currentChapterData.title} - Complete Guide</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF Document • 2.4 MB</p>
                              </div>
                            </div>
                            <Button size="sm" onClick={handleDownload}>
                              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                              </div>
                              <div>
                                <h4 className="text-sm">Exercise Workbook</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF Document • 1.8 MB</p>
                              </div>
                            </div>
                            <Button size="sm" onClick={handleDownload}>
                              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                              </div>
                              <div>
                                <h4 className="text-sm">Additional Resources & Links</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PDF Document • 850 KB</p>
                              </div>
                            </div>
                            <Button size="sm" onClick={handleDownload}>
                              <Download className="w-4 h-4 mr-2" aria-hidden="true" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentChapter === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                    Previous Chapter
                  </Button>
                  
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Chapter {currentChapter} of {chapters.length}
                  </span>
                  
                  <Button
                    onClick={handleNext}
                    disabled={currentChapter === chapters.length}
                    className="bg-blue-600 hover:bg-blue-700 text-white border-0"
                  >
                    Next Chapter
                    <ChevronRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
