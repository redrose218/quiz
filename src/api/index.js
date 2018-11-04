export const BASE_URL = 'https://opentdb.com/api.php';

export function call(api, method, params) {
  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    method: method,
    body: method === 'POST' ? JSON.stringify(params) : null
  };

  let url = BASE_URL + (api ? api : '');
  if (method === 'GET' && params) {
    url += '?' + Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
  }
  if (__DEV__) {
    console.log('API URL', url);
    if (method === 'POST' || method === 'DELETE') console.log('API- ' + method + ' PARAMS', params);
  }

  let isOK;
  return fetch(url, requestOptions)
    .then(response => {
      if (__DEV__) console.log('API-Response', response);
      isOK = response.ok;
      if (response._bodyText.charAt(0) === '<') {
        return response.text();
      } else {
        return response.json();
      }
    }).then(response => {
      if (__DEV__) console.log('API-JSON Response', response);
      if (isOK) {
        return response;
      } else {
        return Promise.reject(response);
      }
    }).catch(error => {
      if (__DEV__) console.log('API-Error', error.message ? error.message : error);
      return Promise.reject(error.message ? error.message : JSON.stringify(error));
    });
}
