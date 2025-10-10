import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  translations: typeof englishTranslations;
}

const englishTranslations = {
  // Navigation
  home: 'Home',
  dashboard: 'Dashboard',
  planner: 'Lesson Planner',
  analytics: 'Analytics',
  profile: 'Profile',
  
  // Landing Page
  heroTitle: 'Empower Teachers with AI: 8-Week Journey',
  heroSubtitle: 'Transform your teaching with cutting-edge AI tools integrated with Google Workspace',
  enrollNow: 'Enroll Now',
  viewCurriculum: 'View Curriculum',
  loginWithGoogle: 'Login with Google',
  aboutProgram: 'About the Program',
  aboutText: 'This comprehensive 8-week AI literacy program equips educators with essential skills to integrate AI into their teaching practice, designed specifically for low-bandwidth environments.',
  
  // Dashboard
  welcomeBack: 'Welcome Back',
  yourProgress: 'Your Progress',
  weekTimeline: 'Week',
  activityFeed: 'Recent Activity',
  quickActions: 'Quick Actions',
  createLesson: 'Create New Lesson',
  viewResources: 'View Resources',
  joinWorkshop: 'Join Workshop',
  
  // Lesson Planner
  lessonPlanner: 'Lesson Planner',
  weeklyObjectives: 'Weekly Objectives',
  googleWorkspace: 'Google Workspace Integration',
  uploadResources: 'Upload Resources',
  checkAccessibility: 'Check Accessibility',
  saveLesson: 'Save Lesson',
  lessonTitle: 'Lesson Title',
  objectives: 'Objectives',
  
  // Analytics
  analyticsOverview: 'Analytics Overview',
  studentCompletion: 'Student Completion Rates',
  feedbackDistribution: 'Feedback Distribution',
  exportToSheets: 'Export to Google Sheets',
  uxTips: 'UX Tips for Educators',
  
  // Profile
  profileSettings: 'Profile & Settings',
  editProfile: 'Edit Profile',
  displayName: 'Display Name',
  email: 'Email',
  uploadPhoto: 'Upload Photo',
  languagePreference: 'Language Preference',
  accessibilitySettings: 'Accessibility Settings',
  darkModeToggle: 'Dark Mode',
  fontSizeLabel: 'Font Size',
  saveSettings: 'Save Settings',
  upcomingWorkshops: 'Upcoming Workshops',
  
  // Common
  completed: 'Completed',
  inProgress: 'In Progress',
  notStarted: 'Not Started',
  save: 'Save',
  cancel: 'Cancel',
  loading: 'Loading...',
};

const frenchTranslations = {
  // Navigation
  home: 'Accueil',
  dashboard: 'Tableau de bord',
  planner: 'Planificateur de leçons',
  analytics: 'Analytique',
  profile: 'Profil',
  
  // Landing Page
  heroTitle: 'Autonomisez les enseignants avec l\'IA : Parcours de 8 semaines',
  heroSubtitle: 'Transformez votre enseignement avec des outils d\'IA de pointe intégrés à Google Workspace',
  enrollNow: 'S\'inscrire maintenant',
  viewCurriculum: 'Voir le programme',
  loginWithGoogle: 'Se connecter avec Google',
  aboutProgram: 'À propos du programme',
  aboutText: 'Ce programme complet de littératie en IA de 8 semaines dote les éducateurs de compétences essentielles pour intégrer l\'IA dans leur pratique pédagogique, conçu spécifiquement pour les environnements à faible bande passante.',
  
  // Dashboard
  welcomeBack: 'Bon retour',
  yourProgress: 'Votre progrès',
  weekTimeline: 'Semaine',
  activityFeed: 'Activité récente',
  quickActions: 'Actions rapides',
  createLesson: 'Créer une nouvelle leçon',
  viewResources: 'Voir les ressources',
  joinWorkshop: 'Rejoindre l\'atelier',
  
  // Lesson Planner
  lessonPlanner: 'Planificateur de leçons',
  weeklyObjectives: 'Objectifs hebdomadaires',
  googleWorkspace: 'Intégration Google Workspace',
  uploadResources: 'Télécharger des ressources',
  checkAccessibility: 'Vérifier l\'accessibilité',
  saveLesson: 'Enregistrer la leçon',
  lessonTitle: 'Titre de la leçon',
  objectives: 'Objectifs',
  
  // Analytics
  analyticsOverview: 'Aperçu analytique',
  studentCompletion: 'Taux d\'achèvement des étudiants',
  feedbackDistribution: 'Distribution des commentaires',
  exportToSheets: 'Exporter vers Google Sheets',
  uxTips: 'Conseils UX pour les éducateurs',
  
  // Profile
  profileSettings: 'Profil et paramètres',
  editProfile: 'Modifier le profil',
  displayName: 'Nom d\'affichage',
  email: 'E-mail',
  uploadPhoto: 'Télécharger une photo',
  languagePreference: 'Préférence linguistique',
  accessibilitySettings: 'Paramètres d\'accessibilité',
  darkModeToggle: 'Mode sombre',
  fontSizeLabel: 'Taille de la police',
  saveSettings: 'Enregistrer les paramètres',
  upcomingWorkshops: 'Ateliers à venir',
  
  // Common
  completed: 'Terminé',
  inProgress: 'En cours',
  notStarted: 'Pas commencé',
  save: 'Enregistrer',
  cancel: 'Annuler',
  loading: 'Chargement...',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  React.useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${fontSize}px`);
  }, [fontSize]);

  const translations = language === 'en' ? englishTranslations : frenchTranslations;

  return (
    <AppContext.Provider value={{ language, setLanguage, darkMode, toggleDarkMode, fontSize, setFontSize, translations }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
