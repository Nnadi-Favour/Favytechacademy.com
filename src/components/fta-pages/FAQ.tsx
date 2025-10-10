import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, MessageCircle, Mail, Book } from 'lucide-react';

export function FAQ() {
  const navigate = useNavigate();

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I register for Favy Tech Academy?',
          a: 'Contact our support team through the Contact page or email us at help.favytechacademy@gmail.com. After payment confirmation, you will receive your unique Student ID and login credentials.',
        },
        {
          q: 'What are the course prerequisites?',
          a: 'No prior programming experience is required! Our courses in AI, Web Development, and Google Workspace are designed for beginners. All you need is a computer with internet access and a passion for learning.',
        },
        {
          q: 'How do I access my e-books?',
          a: 'Once logged in, navigate to your Student Dashboard. You\'ll find all course materials, including downloadable e-books, in the E-Book section.',
        },
      ],
    },
    {
      category: 'Account & Login',
      questions: [
        {
          q: 'I forgot my password. What should I do?',
          a: 'Contact our support team at help.favytechacademy@gmail.com with your Student ID. We\'ll help you reset your password securely.',
        },
        {
          q: 'Can I change my Student ID?',
          a: 'Student IDs are unique identifiers and cannot be changed. If you have concerns about your ID, please contact support.',
        },
        {
          q: 'How long does my account remain active?',
          a: 'Your account remains active throughout your course duration and for 6 months after course completion for revision purposes.',
        },
      ],
    },
    {
      category: 'Learning & Progress',
      questions: [
        {
          q: 'How do I track my progress?',
          a: 'Your Student Dashboard displays a comprehensive progress tracker showing completed modules, ongoing lessons, and overall course completion percentage.',
        },
        {
          q: 'Can I learn at my own pace?',
          a: 'Absolutely! Our platform is designed for self-paced learning. You can access materials 24/7 and learn according to your schedule.',
        },
        {
          q: 'Are there any deadlines for completing courses?',
          a: 'While we recommend completing courses within the suggested timeframe, you have flexibility. However, staying on track helps maintain learning momentum.',
        },
      ],
    },
    {
      category: 'E-Books & Materials',
      questions: [
        {
          q: 'Can I download the e-books?',
          a: 'Yes! All e-books are available for download in PDF format from your Student Dashboard. You can read them offline anytime.',
        },
        {
          q: 'Are video tutorials included?',
          a: 'Yes, our courses include video placeholders and interactive content to complement the e-book materials for a richer learning experience.',
        },
        {
          q: 'How often is the content updated?',
          a: 'We regularly update our content to reflect the latest trends and technologies in AI, Web Development, Google Workspace, and other digital learning tools.',
        },
      ],
    },
    {
      category: 'Payment & Pricing',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept bank transfers, mobile money, and other local payment methods. Contact support for specific payment details.',
        },
        {
          q: 'Is there a refund policy?',
          a: 'Please contact our support team within 7 days of registration if you\'re not satisfied. We\'ll work with you to address any concerns.',
        },
        {
          q: 'Are there any hidden fees?',
          a: 'No hidden fees! The course price includes access to all materials, e-books, community support, and updates during your enrollment.',
        },
      ],
    },
    {
      category: 'Technical Support',
      questions: [
        {
          q: 'What if I experience technical issues?',
          a: 'Contact our technical support team immediately. We\'re here to help! Email help.favytechacademy@gmail.com or join our WhatsApp community for quick assistance.',
        },
        {
          q: 'What browsers are supported?',
          a: 'Our platform works best on modern browsers: Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated.',
        },
        {
          q: 'Can I access the platform on mobile devices?',
          a: 'Yes! Our platform is fully responsive and works seamlessly on smartphones and tablets.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h1 className="mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about Favy Tech Academy
          </p>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/contact')}>
            <CardContent className="pt-6 space-y-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h3>Email Support</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get help via email within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6 space-y-3">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h3>WhatsApp Community</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Join our active support community
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/student')}>
            <CardContent className="pt-6 space-y-3">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto">
                <Book className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h3>Student Dashboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access your learning materials
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="space-y-8">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="mb-4 text-blue-600 dark:text-blue-400">
                {section.category}
              </h2>
              
              <Accordion type="single" collapsible className="space-y-2">
                {section.questions.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${sectionIndex}-${faqIndex}`}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span>{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-400">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-5xl mb-4">💬</div>
            <h2 className="text-white">Join Our Learning Community</h2>
            <p className="text-lg text-white/90">
              Get instant support, share ideas, and connect with fellow students learning AI, Web Development, and Google Workspace in our active WhatsApp group
            </p>
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 border-0"
              onClick={() => window.open('https://chat.whatsapp.com/LPz6wqlgo5o8TRv6HX40nV?mode=ems_copy_t', '_blank')}
            >
              <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
              Join WhatsApp Group
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Still Need Help */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="pt-6 text-center space-y-4">
            <h3>Still Have Questions?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Can't find the answer you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white border-0"
              >
                Contact Support
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}