// API Service layer for ProFolio AI with Timeout & Error Handling
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const DEFAULT_TIMEOUT_MS = 15000; // 15 seconds timeout

export async function checkBackendHealth() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${API_BASE_URL}/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    clearTimeout(timeoutId);
    const msg = error.name === 'AbortError' ? 'Backend connection timed out.' : error.message;
    console.error('Backend health check failed:', msg);
    return { success: false, error: msg };
  }
}

export async function generateResumeApi(profileData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/resume/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errText = `Server returned status ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson.error) errText = errJson.error;
      } catch (e) {}
      throw new Error(errText);
    }

    const data = await response.json();
    if (!data || !data.success || !data.data) {
      throw new Error('Received an empty or malformed response from backend API.');
    }

    return { success: true, data: data.data, meta: data.meta };
  } catch (error) {
    clearTimeout(timeoutId);
    const msg = error.name === 'AbortError' ? 'AI Resume request timed out (15s limit).' : error.message;
    console.error('Resume generation API error:', msg);
    return { success: false, error: msg };
  }
}

export async function generatePortfolioApi(profileData) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/portfolio/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errText = `Server returned status ${response.status}`;
      try {
        const errJson = await response.json();
        if (errJson.error) errText = errJson.error;
      } catch (e) {}
      throw new Error(errText);
    }

    const data = await response.json();
    if (!data || !data.success || !data.data) {
      throw new Error('Received an empty or malformed response from backend API.');
    }

    return { success: true, data: data.data, meta: data.meta };
  } catch (error) {
    clearTimeout(timeoutId);
    const msg = error.name === 'AbortError' ? 'AI Portfolio request timed out (15s limit).' : error.message;
    console.error('Portfolio generation API error:', msg);
    return { success: false, error: msg };
  }
}
