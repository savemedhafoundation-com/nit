import api from '../utils/api';

export const fetchHeroContent = async () => {
  const { data } = await api.get('/content/hero');
  return data;
};

export const fetchDiseases = async () => {
  const { data } = await api.get('/content/diseases');
  return data;
};

export const fetchBoosters = async () => {
  const { data } = await api.get('/content/boosters');
  return data;
};

export const fetchBlogPosts = async () => {
  const { data } = await api.get('/content/blog');
  return data;
};

export const registerPatient = async payload => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const loginPatient = async payload => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const getPatientProfile = async () => {
  const { data } = await api.get('/patient/profile');
  return data;
};

// Symptom checker flow
export const startCheckerSession = async payload => {
  const { data } = await api.post('/checker/sessions', payload);
  return data;
};

export const fetchCheckerSymptoms = async params => {
  const { data } = await api.get('/checker/symptoms', { params });
  return data;
};

export const fetchCommonCheckerSymptoms = async params => {
  const { data } = await api.get('/checker/symptoms/common', { params });
  return data;
};

export const saveSessionSymptoms = async (sessionId, selectedSymptoms) => {
  const { data } = await api.post(`/checker/sessions/${sessionId}/symptoms`, {
    selectedSymptoms,
  });
  return data;
};

export const matchConditions = async (sessionId, payload) => {
  const { data } = await api.post(`/checker/sessions/${sessionId}/match`, payload);
  return data;
};

export const fetchConditionDetails = async slug => {
  const { data } = await api.get(`/checker/conditions/${slug}`);
  return data;
};

export const fetchTreatmentDetails = async conditionId => {
  const { data } = await api.get(`/checker/treatments/${conditionId}`);
  return data;
};

export const createReportSnapshot = async sessionId => {
  const { data } = await api.post('/checker/reports', { sessionId });
  return data;
};

// Medical report explainer
export const uploadMedicalReport = async file => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post('/reports/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: Number(import.meta.env.VITE_API_TIMEOUT || 15000),
  });

  return data;
};

export const explainMedicalReport = async payload => {
  const { data } = await api.post('/reports/explain', payload, {
    timeout: Number(import.meta.env.VITE_API_TIMEOUT || 20000),
  });
  return data;
};

export default api;
