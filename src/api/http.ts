// src/api/http.ts

// URL из .env или используем хардкод как запасной вариант
const BASE_URL = import.meta.env.VITE_API_URL || 'https://fhd.aostng.ru/mi/';
const VESTA_URL = 'https://fhd.aostng.ru/inter_vesta/hs/API_STNG/V2/';

export interface APIResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

// Основной метод (POST JSON)
export async function post<T = any>(method: string, params: any): Promise<APIResponse<T>> {
  try {
    const response = await fetch(`${BASE_URL}${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(params)
    });
    return await response.json();
  } catch (error) {
    console.error(`API Error (${method}):`, error);
    return { success: false, data: {} as T, message: 'Ошибка сети' };
  }
}

// Метод для Vesta (getData)
export async function getData<T = any>(method: string, params: any): Promise<APIResponse<T>> {
  try {
    const response = await fetch(`${VESTA_URL}${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(params)
    });
    return await response.json();
  } catch (error) {
    console.error(`Vesta API Error (${method}):`, error);
    return { success: false, data: {} as T, message: 'Ошибка сети' };
  }
}