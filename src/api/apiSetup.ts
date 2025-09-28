import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL;
const RAPIDAPI_HOST = process.env.EXPO_PUBLIC_RAPIDAPI_HOST;
const RAPIDAPI_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY;

export const apiClient = axios.create({
  baseURL,
  headers: {
    "x-rapidapi-host": RAPIDAPI_HOST!,
    "x-rapidapi-key": RAPIDAPI_KEY!,
    "Content-Type": "application/json",
  },
});


export async function queryCompanies(query: string) {
  try {
    const response = await apiClient.get("/company-search", {
      params: { query },
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error [queryCompanies]:", error.response?.data || error.message);
    throw error;
  }
}

export async function fetchCompanyReviews(domain: string, page = 1) {
  try {
    const response = await apiClient.get("/company-reviews", {
      params: {
        company_domain: domain,
        page,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("API Error [fetchCompanyReviews]:", error.response?.data || error.message);
    throw error;
  }
}
