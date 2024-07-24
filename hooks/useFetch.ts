import { useEffect, useState } from "react";
import { useAppSelector } from '../redux/hooks';

const useFetch = (url: any) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useAppSelector((state) => state.login.admin);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await fetch(`https://hpms.vercel.app/api/${url}`, config);
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, error, loading };
};

export default useFetch;
