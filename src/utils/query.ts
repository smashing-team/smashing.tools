import { navigate } from 'astro:transitions/client';
import queryString from 'query-string';

class Query {
  static parseSearchParam(
    searchParam: string,
    options?: queryString.ParseOptions,
  ) {
    const queries: Record<string, (string | number)[]> = {};
    const queryObj = queryString.parse(searchParam, {
      arrayFormat: 'comma',
      ...options,
    });

    Object.keys(queryObj).forEach((key) => {
      if (!queryObj[key]) return;
      queries[key] =
        typeof queryObj[key] === 'string'
          ? ([queryObj[key]] as string[])
          : (queryObj[key] as string[]) || [];
    });

    return queries;
  }

  static stringifySearchParam(
    object: Record<string, any>,
    options?: queryString.StringifyOptions,
  ) {
    return queryString.stringify(object, { arrayFormat: 'comma', ...options });
  }

  static set = (key: string, value: string) => {
    const queryObj = Query.parseSearchParam(window.location.search);
    if (queryObj[key]?.includes(value)) {
      queryObj[key] = queryObj[key]?.filter((val) => val !== value) || [];
    } else {
      queryObj[key] = [...(queryObj[key] || []), value];
    }
    const newQuery = Query.stringifySearchParam(queryObj);
    const urlQuery = newQuery
      ? `?${newQuery}`
      : window.location.href.split('?')[0] || '/';
    navigate(urlQuery);
  };
}

export default Query;
