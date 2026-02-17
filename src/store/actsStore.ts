import { create } from 'zustand';
import { actsApi } from '../api/actsApi';

type AnyObj = Record<string, any>;

const isPlainObject = (v: any): v is AnyObj => {
  return !!v && typeof v === 'object' && !Array.isArray(v);
};

const nowIso = () => new Date().toISOString();

/** Убираем undefined (сервер/SQL часто не любит undefined). */
const stripUndefinedShallow = (obj: AnyObj): AnyObj => {
  const out: AnyObj = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (v !== undefined) out[k] = v;
  }
  return out;
};

const withoutDetails = (obj: AnyObj): AnyObj => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { details, ...rest } = obj || {};
  return rest;
};

/**
 * Служебные ключи акта (мета), которые НЕ должны попадать внутрь details.
 * Сервер хранит их отдельными колонками.
 */
const META_KEYS = new Set([
  'id',
  'type',
  'invoice_id',
  'act_id',
  'act_number',
  'act_date',
  'created_at',
  'updated_at',
  'status',
  'title',
  'document_scan_path',
  'document_scan',
  'details',
  'token',
]);

const isNumericKey = (k: string) => /^\d+$/.test(k);

/**
 * Убираем мусорные числовые ключи "0", "1" и т.п.
 * Они появляются, когда массив случайно расплющили через {...arr}.
 */
const stripNumericKeysShallow = (obj: AnyObj): AnyObj => {
  const out: AnyObj = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (isNumericKey(k)) continue;
    out[k] = v;
  }
  return out;
};

/**
 * Достаём объект details из разных форматов:
 * - массив [{...}] (часто так приходит с сервера)
 * - объект с ключами "0": {...}
 * - обычный объект {...}
 */
const extractDetailsObject = (rawDetails: any): AnyObj => {
  // массив -> склеиваем элементы
  if (Array.isArray(rawDetails)) {
    return rawDetails.reduce((acc: AnyObj, item: any) => {
      if (isPlainObject(item)) return { ...acc, ...item };
      return acc;
    }, {});
  }

  // объект
  if (isPlainObject(rawDetails)) {
    // объект с числовыми ключами "0": {...}
    const numericKeys = Object.keys(rawDetails).filter(isNumericKey);
    if (numericKeys.length > 0) {
      return numericKeys
        .sort((a, b) => Number(a) - Number(b))
        .reduce((acc: AnyObj, k: string) => {
          const v = (rawDetails as AnyObj)[k];
          if (isPlainObject(v)) return { ...acc, ...v };
          return acc;
        }, {});
    }

    return rawDetails;
  }

  return {};
};

/**
 * Чистим details: удаляем мета-ключи, числовые ключи и undefined.
 */
const cleanDetails = (details: AnyObj): AnyObj => {
  const out: AnyObj = {};
  for (const [k, v] of Object.entries(details || {})) {
    if (v === undefined) continue;
    if (isNumericKey(k)) continue;
    if (META_KEYS.has(k)) continue;
    out[k] = v;
  }
  return out;
};

/**
 * Базовая нормализация payload под бэкенд mp_set_act.
 * В старом приложении эти поля всегда присутствовали.
 */
const normalizeActPayload = (actData: AnyObj): AnyObj => {
  const ts = nowIso();

  // Иногда actData уже содержит мусорные ключи "0", "1"...
  const cleanedAct = stripNumericKeysShallow(actData || {});

  const base: AnyObj = {
    // Не даём упасть SQL на NOT NULL
    status: cleanedAct?.status || 'draft',
    document_scan_path: cleanedAct?.document_scan_path ?? '',
    title: cleanedAct?.title || cleanedAct?.type || 'Акт',
    created_at: cleanedAct?.created_at || ts,
    updated_at: ts,
  };

  // 1) Пытаемся взять details из actData.details
  const rawDetailsObj = extractDetailsObject(cleanedAct?.details);

  // 2) Если details пустой — соберём его из полей акта (без мета),
  //    потому что некоторые места шлют FLAT payload без details.
  const fallbackDetails = withoutDetails(cleanedAct);
  const combinedDetails = Object.keys(rawDetailsObj).length > 0 ? rawDetailsObj : fallbackDetails;
  const details = cleanDetails(stripUndefinedShallow(stripNumericKeysShallow(combinedDetails)));

  // Удаляем undefined на верхнем уровне, чтобы не слать "undefined" в JSON
  // И гарантируем, что details — объект, а не массив.
  return stripUndefinedShallow({
    ...cleanedAct,
    ...base,
    details,
  });
};

interface ActsState {
  list: any[];
  currentAct: any | null;
  loading: boolean;

  loadActs: (token: string, invoiceId: string) => Promise<void>;
  loadActDetails: (token: string, invoiceId: string, actId: string) => Promise<void>;

  /** Получить/создать черновик акта по типу (сервер сам выдаёт act_number) */
  loadActDraft: (token: string, invoiceId: string, actType: string) => Promise<any | null>;

  // вернет объект акта или кинет ошибку
  saveAct: (token: string, actData: any) => Promise<any>;

  // «Отправить акты» — ставим status signed всем актам по заявке
  sendAllActs: (token: string, invoiceId: string) => Promise<void>;

  clearCurrentAct: () => void;
  setCurrentAct: (act: any) => void;
}

export const useActsStore = create<ActsState>((set, get) => ({
  list: [],
  currentAct: null,
  loading: false,

  loadActs: async (token, invoiceId) => {
    set({ loading: true });
    try {
      const res = await actsApi.getByInvoice(token, invoiceId);
      if (res.success) set({ list: res.data || [] });
    } finally {
      set({ loading: false });
    }
  },

  loadActDetails: async (token, invoiceId, actId) => {
    set({ loading: true, currentAct: null });
    try {
      const res = await actsApi.getById(token, invoiceId, actId);
      if (res.success) set({ currentAct: res.data });
    } finally {
      set({ loading: false });
    }
  },

  loadActDraft: async (token, invoiceId, actType) => {
    set({ loading: true, currentAct: null });
    try {
      const res = await actsApi.getByType(token, invoiceId, actType);
      if (res.success) {
        set({ currentAct: res.data, loading: false });
        return res.data;
      }
      set({ loading: false });
      return null;
    } catch (e) {
      console.error(e);
      set({ loading: false });
      return null;
    }
  },

  saveAct: async (token, actData) => {
    set({ loading: true });
    try {
      const payload = normalizeActPayload(actData);
      const res = await actsApi.save(token, payload);

      if (res.success) {
        const savedAct = res.data || payload;

        const list = get().list;
        const idx = list.findIndex((a) => a.id === savedAct.id);

        let newList: any[] = [];
        if (idx >= 0) {
          newList = [...list];
          newList[idx] = { ...newList[idx], ...savedAct };
        } else {
          newList = [savedAct, ...list];
        }

        set({ list: newList, currentAct: savedAct, loading: false });
        return savedAct;
      }

      set({ loading: false });
      throw new Error(res.message || 'Не удалось сохранить акт');
    } catch (e) {
      console.error(e);
      set({ loading: false });
      throw e;
    }
  },

  sendAllActs: async (token, invoiceId) => {
    set({ loading: true });
    try {
      const acts = get().list || [];
      if (acts.length === 0) return;

      for (const a of acts) {
        const actId = a?.id;
        if (!actId) continue;

        // берем полный акт, если список вернул "шапку"
        const fullRes = await actsApi.getById(token, invoiceId, String(actId));
        const fullAct = fullRes.success ? (fullRes.data || a) : a;

        const payload = normalizeActPayload({
          ...fullAct,
          invoice_id: invoiceId,
          status: 'signed',
        });

        const saveRes = await actsApi.save(token, payload);
        if (!saveRes.success) {
          throw new Error(saveRes.message || 'Не удалось отправить акты');
        }
      }

      // Перезагружаем список
      const res = await actsApi.getByInvoice(token, invoiceId);
      if (res.success) set({ list: res.data || [] });
    } finally {
      set({ loading: false });
    }
  },

  clearCurrentAct: () => set({ currentAct: null }),
  setCurrentAct: (act) => set({ currentAct: act }),
}));
