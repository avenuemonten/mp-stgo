// src/api/invoicesApi.ts
import { post } from './http';
import { normalizeInvoice } from '../domain/normalizers';
import { API_METHODS } from './endpoints';

export const invoicesApi = {
  fetchAll: async (token: string) => {
    const res = await post(API_METHODS.INVOICES, { token });
    if (res.success && Array.isArray(res.data)) {
      return res.data.map(normalizeInvoice);
    }
    return [];
  },

  updateAddress: async (token: string, id: string, address: string) => {
    
    // Попытка 1: upd_inv_address (как было)
    console.log(`Попытка 1: ${API_METHODS.UPDATE_ADDRESS_V1}`);
    let res = await post(API_METHODS.UPDATE_ADDRESS_V1, { token, id, address });
    
    // Если сервер ругается на метод, пробуем вариант 2
    if (!res.success && (res.message?.includes('method') || res.message?.includes('404'))) {
        console.warn(`Метод ${API_METHODS.UPDATE_ADDRESS_V1} не найден. Пробуем ${API_METHODS.UPDATE_ADDRESS_V2}`);
        res = await post(API_METHODS.UPDATE_ADDRESS_V2, { token, id, address });
    }

    // Если всё еще ошибка, пробуем вариант 3 (mp_set...)
    if (!res.success && (res.message?.includes('method') || res.message?.includes('404'))) {
        console.warn(`Метод ${API_METHODS.UPDATE_ADDRESS_V2} не найден. Пробуем ${API_METHODS.UPDATE_ADDRESS_V3}`);
        res = await post(API_METHODS.UPDATE_ADDRESS_V3, { token, id, address });
    }

    return res;
  },

  // НОВЫЙ МЕТОД: Закрыть заявку
  closeInvoice: async (token: string, id: string) => {
      // Используем прямой путь, если в API_METHODS нет константы
      const response = await post(`/invoices/${id}/close`, { token });
      return response;
  }
};