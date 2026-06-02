// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import * as portfolioService from './services/portfolioService';
import { mockPortfolioData } from './data';

// Mock the API fetching layer to bypass asynchronous server operations
vi.mock('./services/portfolioService', async () => {
  const actual = await vi.importActual<typeof portfolioService>('./services/portfolioService');
  return {
    ...actual,
    fetchPortfolioData: vi.fn(),
  };
});

// Mock Framer Motion since layout transitions use Web APIs not implemented by JSDOM
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Portfolio Suite de Pruebas Unitarias', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('debe renderizar la pantalla de carga inicialmente', () => {
    // Resolve with a slow promise to ensure loading renders
    vi.mocked(portfolioService.fetchPortfolioData).mockReturnValue(new Promise(() => {}));

    render(<App />);
    expect(screen.getByText('Cargando')).toBeDefined();
    expect(screen.getByText(/Sincronizando información/i)).toBeDefined();
  });

  it('debe renderizar el portafolio creativo con la información de Sofía correctamente', async () => {
    // Mock instant resolve to fetch mockPortfolioData
    vi.mocked(portfolioService.fetchPortfolioData).mockResolvedValue({
      data: mockPortfolioData,
      source: 'mock',
    });

    render(<App />);

    // Wait for the loader to leave and component to mount
    const nameHeadings = await screen.findAllByText(/Sofía Garcés/i);
    expect(nameHeadings.length).toBeGreaterThan(0);

    // Verify role matches
    const roleHeadings = await screen.findAllByText(/Full-Stack Creative Engineer/i);
    expect(roleHeadings.length).toBeGreaterThan(0);

    // Verify header navigation labels
    const sectionTabs = await screen.findAllByText('Habilidades');
    expect(sectionTabs.length).toBeGreaterThan(0);
  });
});
