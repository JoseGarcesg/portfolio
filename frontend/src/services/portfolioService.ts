import { PortfolioData, StrapiConfig } from '../types';
import { mockPortfolioData } from '../data';
import {
  parseStrapiItem,
  parseStrapiCollection,
  normalizeProfile,
  normalizeSkills,
  normalizeEducation,
  normalizeExperience,
  normalizeSocials
} from '../utils/strapiParser';

const STORAGE_KEY = 'portfolio_strapi_config';

/**
 * Retrieve configuration from LocalStorage, falling back to environment variables.
 */
export function getStrapiConfig(): StrapiConfig {
  const envUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

  // Note: VITE_USE_MOCK_DATA is a string or undefined. Default is true if not set to 'false'.
  const envUseMock = import.meta.env.VITE_USE_MOCK_DATA !== undefined
    ? import.meta.env.VITE_USE_MOCK_DATA === 'true'
    : true;

  const defaultStrapiConfig: StrapiConfig = {
    baseUrl: envUrl,
    apiToken: import.meta.env.VITE_STRAPI_TOKEN || '',
    useMock: envUseMock,
  };

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultStrapiConfig;

  try {
    const parsed = JSON.parse(stored);
    
    // Explicit VITE_USE_MOCK_DATA=false overrides local storage true state
    const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'false' 
      ? false 
      : (typeof parsed.useMock === 'boolean' ? parsed.useMock : defaultStrapiConfig.useMock);

    return {
      baseUrl: parsed.baseUrl || defaultStrapiConfig.baseUrl,
      apiToken: parsed.apiToken || defaultStrapiConfig.apiToken,
      useMock,
    };
  } catch {
    return defaultStrapiConfig;
  }
}

/**
 * Save configuration to LocalStorage.
 */
export function saveStrapiConfig(config: StrapiConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/**
 * Main function to fetch portfolio data.
 * If Strapi is enabled and configured, it attempts to query individual endpoints.
 * Includes fallback logic to load standard Mock Data if query fails or is set to Mock.
 */
export async function fetchPortfolioData(config: StrapiConfig): Promise<{ data: PortfolioData; source: 'strapi' | 'mock'; error?: string }> {
  if (config.useMock) {
    return { data: mockPortfolioData, source: 'mock' };
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (config.apiToken) {
    headers['Authorization'] = `Bearer ${config.apiToken}`;
  }

  try {
    const baseUrl = config.baseUrl.replace(/\/$/, ''); // strip trailing slash

    // Run parallel fetch calls to replicate a fully functioning decoupled frontend
    const [profileRes, skillsRes, educationsRes, experiencesRes, socialsRes] = await Promise.all([
      fetch(`${baseUrl}/api/profiles?populate=*`, { headers }).then(r => r.ok ? r.json() : null),
      fetch(`${baseUrl}/api/skills?pagination[limit]=100&populate=*`, { headers }).then(r => r.ok ? r.json() : null),
      fetch(`${baseUrl}/api/educations?sort=duration:desc&populate=*`, { headers }).then(r => r.ok ? r.json() : null),
      fetch(`${baseUrl}/api/experiences?sort=duration:desc&populate=*`, { headers }).then(r => r.ok ? r.json() : null),
      fetch(`${baseUrl}/api/socials?populate=*`, { headers }).then(r => r.ok ? r.json() : null),
    ]);

    // Check if at least we got profile or some data
    if (!profileRes && !skillsRes && !educationsRes && !experiencesRes) {
      throw new Error("No se pudo obtener datos de Strapi (endpoints vacíos o errores 404). Verifica que Strapi esté activo, tus endpoints creados y los permisos públicos configurados en Ajustes > Roles > Public.");
    }

    // Parse items using the modular strapiParser utility
    const rawProfile = profileRes?.data ? parseStrapiItem(profileRes.data) : null;
    const rawSkills = parseStrapiCollection(skillsRes);
    const rawEducations = parseStrapiCollection(educationsRes);
    const rawExperiences = parseStrapiCollection(experiencesRes);
    const rawSocials = parseStrapiCollection(socialsRes);

    // Normalize using our parsing utility
    const profile = normalizeProfile(rawProfile, baseUrl, mockPortfolioData.profile);
    const skills = normalizeSkills(rawSkills, mockPortfolioData.skills);
    const education = normalizeEducation(rawEducations, mockPortfolioData.education);
    const experience = normalizeExperience(rawExperiences, mockPortfolioData.experience);
    const socials = normalizeSocials(rawSocials, mockPortfolioData.socials);

    return {
      data: { profile, socials, skills, education, experience },
      source: 'strapi'
    };
  } catch (err: any) {
    console.warn('Strapi Fetch Error, falling back to Mock:', err);
    return {
      data: mockPortfolioData,
      source: 'mock',
      error: err.message || 'Error de conexión con Strapi Api.'
    };
  }
}

/**
 * Tests connection to a Strapi URL.
 */
export async function testStrapiConnection(config: StrapiConfig): Promise<{ success: boolean; message: string }> {
  try {
    const baseUrl = config.baseUrl.replace(/\/$/, '');
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (config.apiToken) {
      headers['Authorization'] = `Bearer ${config.apiToken}`;
    }

    // Check main Strapi API root or standard endpoint
    const res = await fetch(`${baseUrl}/api/profile`, { headers });
    if (res.ok) {
      return { success: true, message: 'Conexión exitosa. El endpoint /api/profile fue accedido correctamente.' };
    }

    const generalRes = await fetch(`${baseUrl}/admin`, { method: 'HEAD' });
    if (generalRes.ok) {
      return { success: true, message: 'Se contactó el servidor Strapi, pero el endpoint /api/profile devolvió código ' + res.status + '. Asegúrate de configurar permisos públicos o proveer un Token válido.' };
    }

    throw new Error(`Código de respuesta: ${res.status}`);
  } catch (err: any) {
    return { success: false, message: `Error de conexión: ${err.message || 'Verifica que el host y puerto estén activos y permitan tráfico CORS.'}` };
  }
}
