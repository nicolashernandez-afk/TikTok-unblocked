export default async function handler(request, response) {
  const destinationUrl = 'https://www.tiktok.com' + request.url.replace('/api/proxy', '');

  try {
    const apiResponse = await fetch(destinationUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    apiResponse.headers.forEach((value, key) => {
      response.setHeader(key, value);
    });

    response.status(apiResponse.status).send(await apiResponse.text());
  } catch (error) {
    response.status(500).send('Proxy error: ' + error.message);
  }
}
