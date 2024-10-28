import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export default function useFetch<T>(url: string, method: 'GET' | 'PUT' = 'GET', requestBody?: T) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch data (GET request)
  useEffect(() => {
    if (method !== 'GET') return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<T>(url);
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method]);

  // PUT request function
  const putData = useCallback(async () => {
    if (method !== 'PUT') return;

    const config: AxiosRequestConfig = {
      headers: { 'ngrok-skip-browser-warning': '69420','Content-Type': 'application/json' },
    };

    try {
      setLoading(true);
      const response = await axios.put<T>(url, requestBody, config);
      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to update data');
    } finally {
      setLoading(false);
    }
  }, [url, method, requestBody]);

  return { data, error, loading, putData };
}
