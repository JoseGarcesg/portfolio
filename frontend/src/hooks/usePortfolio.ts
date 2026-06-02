import { useState, useEffect, useCallback } from 'react';
import { PortfolioData, StrapiConfig } from '../types';
import {
  getStrapiConfig,
  saveStrapiConfig,
  fetchPortfolioData
} from '../services/portfolioService';

export function usePortfolio() {
  const [config, setConfigState] = useState<StrapiConfig>(() => getStrapiConfig());
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<'strapi' | 'mock'>('mock');
  const [fetchError, setFetchError] = useState<string | null>(null);

  const loadData = useCallback(async (activeConfig: StrapiConfig) => {
    setLoading(true);
    setFetchError(null);
    try {
      const response = await fetchPortfolioData(activeConfig);
      setPortfolioData(response.data);
      setDataSource(response.source);
      if (response.error) {
        setFetchError(response.error);
      }
    } catch (err: any) {
      console.error("Critical error in usePortfolio loading state: ", err);
      setFetchError("Error crítico al procesar la información del portafolio.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(config);
  }, [config, loadData]);

  const updateConfig = useCallback((newConfig: StrapiConfig) => {
    setConfigState(newConfig);
    saveStrapiConfig(newConfig);
  }, []);

  const reloadData = useCallback(() => {
    loadData(config);
  }, [config, loadData]);

  return {
    portfolioData,
    loading,
    dataSource,
    fetchError,
    config,
    updateConfig,
    reloadData,
  };
}
