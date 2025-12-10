let token = "";

const generateHeader = (userHeader = {}) => {
  return {
    Authorization: token,
    ...userHeader,
  };
};

const generatePath = (path = "") => {
  return `http://95.217.183.52:1337/${path}`;
};

// Helper to build URL with query parameters
const buildUrl = (baseUrl, params) => {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl;
  }
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value);
    }
  });
  return url.toString();
};

export const get = async (path, params, fetchOptions = {}) => {
  const url = generatePath(path);
  const fullUrl = buildUrl(url, params);
  // Extract Next.js specific options (like revalidate) from fetchOptions
  const { next, ...restHeaders } = fetchOptions;
  const headers = generateHeader(restHeaders);

  // Use Next.js native fetch with revalidation support
  const response = await fetch(fullUrl, {
    method: "GET",
    headers,
    ...(next && { next }), // Pass Next.js revalidation options
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return { data };
};

export const post = async (path, data, header = {}) => {
  const url = generatePath(path);
  const headers = generateHeader(header);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return { data: responseData };
};

export const put = async (path, data, header = {}) => {
  const url = generatePath(path);
  const headers = generateHeader(header);

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return { data: responseData };
};

export const deleteRequest = async (path, params, headers = {}) => {
  const url = generatePath(path);
  const fullUrl = buildUrl(url, params);
  const headerObj = generateHeader(headers);

  const response = await fetch(fullUrl, {
    method: "DELETE",
    headers: headerObj,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return { data: responseData };
};

export const setToken = (t) => {
  token = t || token;
};

const apiService = {
  get,
  post,
  put,
  deleteRequest,
  setToken,
};

export default apiService;
