import queryString from 'query-string';

class MyQueryString {
  static parse(searchParam: string, options?: queryString.ParseOptions) {
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

  static stringify(
    object: Record<string, any>,
    options?: queryString.StringifyOptions,
  ) {
    return queryString.stringify(object, { arrayFormat: 'comma', ...options });
  }
}

export default MyQueryString;
