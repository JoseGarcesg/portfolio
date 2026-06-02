import { Profile, Skill, Education, Experience, SocialLink } from '../types';

/**
 * Safely extracts attributes and data fields from Strapi API JSON formats.
 * Supports both Strapi v4 (nested attributes) and Strapi v5 (flattened fields).
 * If the item is an array (e.g. from a collectionType endpoint query), returns the parsed first element.
 */
export function parseStrapiItem(item: any): any {
  if (!item) return null;
  
  if (Array.isArray(item)) {
    return item.length > 0 ? parseStrapiItem(item[0]) : null;
  }
  
  // If it's wrapped in attributes (Strapi v4)
  if (item.attributes) {
    return {
      id: item.id,
      ...item.attributes,
    };
  }
  return item;
}

/**
 * Safely extracts collections from Strapi response formats.
 */
export function parseStrapiCollection(response: any): any[] {
  if (!response) return [];
  const data = response.data || response;
  if (!Array.isArray(data)) return [];
  return data.map(parseStrapiItem);
}

/**
 * Safely extracts media URLs from both Strapi v4 and v5 nested/flat data structures.
 */
export function extractMediaUrl(media: any, baseUrl: string): string | null {
  if (!media) return null;

  if (typeof media === 'string') {
    return media.startsWith('http') ? media : `${baseUrl}${media}`;
  }

  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${baseUrl}${media.url}`;
  }

  const data = media.data;
  if (data) {
    const target = Array.isArray(data) ? data[0] : data;
    if (target) {
      if (target.attributes && target.attributes.url) {
        const url = target.attributes.url;
        return url.startsWith('http') ? url : `${baseUrl}${url}`;
      }
      if (target.url) {
        return target.url.startsWith('http') ? target.url : `${baseUrl}${target.url}`;
      }
    }
  }

  return null;
}

/**
 * Normalizes Profile data from Strapi raw profile response.
 */
export function normalizeProfile(rawProfile: any, baseUrl: string, mockProfile: Profile): Profile {
  if (!rawProfile) return mockProfile;

  const target = Array.isArray(rawProfile) ? rawProfile[0] : rawProfile;
  if (!target) return mockProfile;

  const avatarUrl = extractMediaUrl(target.avatar, baseUrl) || target.avatarUrl || mockProfile.avatarUrl;
  const resumeUrl = extractMediaUrl(target.resume, baseUrl) || target.resumeUrl || mockProfile.resumeUrl;

  return {
    name: target.name || mockProfile.name,
    role: target.role || mockProfile.role,
    description: target.description || mockProfile.description,
    longDescription: target.longDescription || mockProfile.longDescription,
    avatarUrl,
    resumeUrl,
    email: target.email || mockProfile.email,
    location: target.location || mockProfile.location,
    // Support both 'workStatus' from the Strapi config guide and legacy 'status'
    status: target.workStatus || target.status || mockProfile.status,
  };
}

/**
 * Normalizes Skills list from Strapi raw response.
 */
export function normalizeSkills(rawSkills: any[], mockSkills: Skill[]): Skill[] {
  if (rawSkills.length === 0) return mockSkills;

  return rawSkills.map(s => ({
    name: s.name,
    category: s.category || 'Frontend',
    level: s.level || 80,
    icon: s.icon || 'Code2',
  }));
}

/**
 * Normalizes Education track list from Strapi raw response.
 */
export function normalizeEducation(rawEducations: any[], mockEducation: Education[]): Education[] {
  if (rawEducations.length === 0) return mockEducation;

  return rawEducations.map(e => ({
    institution: e.institution,
    degree: e.degree,
    duration: e.duration,
    description: e.description,
    credentialUrl: e.credentialUrl,
    type: e.type || 'education',
  }));
}

/**
 * Normalizes Experience items from Strapi raw response.
 */
export function normalizeExperience(rawExperiences: any[], mockExperience: Experience[]): Experience[] {
  if (rawExperiences.length === 0) return mockExperience;

  return rawExperiences.map(exp => ({
    company: exp.company,
    role: exp.role,
    duration: exp.duration,
    description: Array.isArray(exp.description) 
      ? exp.description 
      : typeof exp.description === 'string' 
        ? exp.description.split('\n').filter((l: string) => l.trim().length > 0)
        : [exp.description],
    skills: Array.isArray(exp.skills) 
      ? exp.skills 
      : typeof exp.skills === 'string' 
        ? exp.skills.split(',').map((s: string) => s.trim())
        : [],
  }));
}

/**
 * Normalizes Social link items from Strapi raw response.
 */
export function normalizeSocials(rawSocials: any[], mockSocials: SocialLink[]): SocialLink[] {
  if (rawSocials.length === 0) return mockSocials;

  return rawSocials.map(soc => ({
    platform: (soc.platform || 'github').toLowerCase() as any,
    url: soc.url,
    label: soc.label || soc.platform,
  }));
}
