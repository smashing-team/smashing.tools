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

  static toggle = (key: string, value: string) => {
    const queryObj = this.parseSearchParam(window.location.search);
    if (queryObj[key]?.includes(value)) {
      queryObj[key] = queryObj[key]?.filter((val) => val !== value) || [];
    } else {
      queryObj[key] = [...(queryObj[key] || []), value];
    }
    const newQuery = this.stringifySearchParam(queryObj);

    if (newQuery) navigate(`?${newQuery}`);
    else this.clear();
  };

  static clear = () => {
    navigate(window.location.href.split('?')[0] || '/');
  };
}

export default Query;
