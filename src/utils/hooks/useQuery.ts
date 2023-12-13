import { navigate } from 'astro:transitions/client';
import { useEffect, useState } from 'react';

import MyQueryString from '../myQueryString';

export const useQuery = () => {
  const [queryObject, setQueryObject] = useState<
    Record<string, (string | number)[]>
  >({});

  useEffect(() => {
    const queryObj = MyQueryString.parse(window.location.search);
    setQueryObject(queryObj);
  }, []);

  const setQuery = (key: string, value: string) => {
    const queryObj = MyQueryString.parse(window.location.search);
    if (queryObj[key]?.includes(value)) {
      queryObj[key] = queryObj[key]?.filter((val) => val !== value) || [];
    } else {
      queryObj[key] = [...(queryObj[key] || []), value];
    }
    const newQuery = MyQueryString.stringify(queryObj);
    const urlQuery = newQuery ? `?${newQuery}` : '/';
    navigate(urlQuery);
  };

  return { queryObject, setQueryObject: setQuery };
};
