export async function api(fethcUrl, fetchOptions) {
  return fetch(fethcUrl, {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      'Authorization': `Basic ${fetchOptions.headers.Authorization}`,
      'Content-Type': 'application/json'
    }
  });
}