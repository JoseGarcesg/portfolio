import React from 'react';
import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 20 }) => {
  // Safe lookup dictionary for the icons we support
  const iconMap: Record<string, keyof typeof Icons> = {
    // Skills
    'React': 'FileCode',
    'Code2': 'Code2',
    'Palette': 'Palette',
    'Motion': 'Zap',
    'Server': 'Server',
    'Database': 'Database',
    'TestTube': 'TestTube',
    'GitBranch': 'GitBranch',
    'Figma': 'Figma',
    'Cpu': 'Cpu',
    
    // Socials
    'github': 'Github',
    'linkedin': 'Linkedin',
    'instagram': 'Instagram',
    'twitter': 'Twitter',
    'email': 'Mail',
     'correo': 'Mail',
    
    // UI General
    'Award': 'Award',
    'GraduationCap': 'GraduationCap',
    'Briefcase': 'Briefcase',
    'Calendar': 'Calendar',
    'calendar': 'Calendar',
    'MapPin': 'MapPin',
    'Sparkles': 'Sparkles',
    'Download': 'Download',
    'ExternalLink': 'ExternalLink',
    'Settings': 'Settings',
    'AlertCircle': 'AlertCircle',
    'CheckCircle2': 'CheckCircle2',
    'Menu': 'Menu',
    'X': 'X',
    'ChevronDown': 'ChevronDown',
  };

  const lookupName = iconMap[name] || iconMap[name.toLowerCase()] || name;
  
  // Try to retrieve the component from lucide-react dynamically
  const IconComponent = (Icons as any)[lookupName] || Icons.HelpCircle;

  return <IconComponent className={className} size={size} />;
};
export default Icon;
