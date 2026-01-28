import { USD_LOGO_BASE64 } from '../../../constants/logo';

const formatDateSmart = (value?: string) => {
  if (!value) return { full: '___', short: '__.__', year: '____' };
  const s = String(value).trim();

  const m1 = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m1) {
    const [, y, mm, dd] = m1;
    return { full: `${dd}.${mm}.${y}`, short: `${dd}.${mm}`, year: y };
  }

  const m2 = s.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
  if (m2) {
    const [, dd, mm, y] = m2;
    return { full: `${dd}.${mm}.${y}`, short: `${dd}.${mm}`, year: y };
  }

  const m3 = s.match(/^(\d{2})\.(\d{2})/);
  if (m3) {
    const [, dd, mm] = m3;
    return { full: `${dd}.${mm}.____`, short: `${dd}.${mm}`, year: '____' };
  }

  return { full: s, short: s, year: '____' };
};

const safeStr = (v: any, fallback = '________________') => {
  const s = v === null || v === undefined ? '' : String(v);
  const t = s.trim();
  return t.length ? t : fallback;
};

const formatSign = (sign: any) => {
  const dataUrl = sign && sign.dataUrl ? sign.dataUrl : sign;
  if (typeof dataUrl === 'string' && dataUrl.startsWith('data:') && dataUrl.length > 32) {
    return `<img src="${dataUrl}" alt="sign" />`;
  }
  return '';
};

// Для произвольных изображений (фото результата и т.п.)
const formatImg = (img: any, maxHeight = 220) => {
  const val = img && img.dataUrl ? img.dataUrl : img;
  if (typeof val === 'string' && val.startsWith('data:') && val.length > 32) {
    return `<img src="${val}" alt="img" style="max-width: 100%; max-height: ${maxHeight}px; object-fit: contain;" />`;
  }
  return '';
};

const normalizeAddress = (value: any) => {
  if (!value) return '________________';
  if (typeof value === 'string') return safeStr(value);
  if (typeof value === 'object') {
    const parts = [
      value?.city,
      value?.street,
      value?.house,
      value?.flat,
      value?.address,
      value?.full,
      value?.value,
    ]
      .filter(Boolean)
      .map(String);
    return parts.length ? parts.join(', ') : '________________';
  }
  return safeStr(value);
};

export const fillActTemplate = (htmlTemplate: string, act: any) => {
  const common = act || {};
  const d = common.details || {};

  const actDate = formatDateSmart(d.act_date || common.act_date);
  const number = safeStr(d.act_number || common.act_number || common.number || common.id || 'Б/Н', 'Б/Н');

  // ВАЖНО: PERSONAL_ACCOUNT объявляем ОДИН раз (иначе warning дубль ключа)
  // В заявках лицевой счёт чаще приходит как "lic", но в шаблонах используем PERSONAL_ACCOUNT.
  const personalAccount = d.personal_account || d.lic || '________________';

  // Для акта выполненных работ
  const workDescription = String(d.work_description || d.service || '').trim() || '________________';
  const workAmount = (d.amount ?? d.work_amount ?? '') === '' ? '________________' : String(d.amount ?? d.work_amount);
  const workWarranty = String(d.warranty || '').trim() || '________________';
  const photoResult = formatImg(d.photo_result, 220);

  const replacements: Record<string, string> = {
    '{{LOGO_SRC}}': USD_LOGO_BASE64,

    '{{NUMBER}}': number,
    '{{ACT_DATE_FULL}}': actDate.full,
    '{{ACT_DATE_SHORT}}': actDate.short,
    '{{ACT_YEAR}}': actDate.year,

    '{{OWNER_NAME}}': safeStr(d.owner_name || common.owner_name),
    '{{OWNER_PHONE}}': safeStr(d.owner_phone || common.owner_phone),
    '{{OBJECT_TYPE}}': safeStr(d.object_type),
    '{{OBJECT_ADDRESS}}': normalizeAddress(d.object_address || d.address || d.object),
    '{{PERSONAL_ACCOUNT}}': personalAccount,

    // ---- Акт выполненных работ ----
    '{{WORK_DESCRIPTION}}': workDescription.replace(/\n/g, '<br />'),
    '{{WORK_AMOUNT}}': workAmount,
    '{{WORK_WARRANTY}}': workWarranty,
    '{{PHOTO_RESULT}}': photoResult,

    // Общие подписи
    '{{TECHNICIAN_NAME}}': safeStr(d.technician_name || d.executor_name || common.executor_name),
    '{{TECHNICIAN_SIGNATURE}}': formatSign(d.technician_signature),
    '{{OWNER_SIGNATURE}}': formatSign(d.owner_signature),

    // BR (замена батареи)
    '{{ACT_NUMBER}}': safeStr(d.act_number || number),
    '{{ACT_DATE}}': actDate.full,
    '{{TECHNICIAN_POSITION}}': safeStr(d.technician_position || d.executor_position),
    '{{REMOVAL_DATE}}': safeStr(d.removal_date),
    '{{REMOVAL_YEAR}}': formatDateSmart(d.removal_date).year,
    '{{REMOVAL_TIME}}': safeStr(d.removal_time),
    '{{REMOVED_METER_MODEL}}': safeStr(d.removed_meter_model),
    '{{REMOVED_METER_NUMBER}}': safeStr(d.removed_meter_number),
    '{{REMOVED_METER_READING}}': safeStr(d.removed_meter_reading),
    '{{REMOVED_SEAL_NUMBER}}': safeStr(d.removed_seal_number),
    '{{INSTALLATION_DATE}}': safeStr(d.installation_date),
    '{{INSTALLATION_YEAR}}': formatDateSmart(d.installation_date).year,
    '{{INSTALLED_METER_MODEL}}': safeStr(d.installed_meter_model),
    '{{INSTALLED_METER_NUMBER}}': safeStr(d.installed_meter_number),
    '{{INSTALLED_METER_READING}}': safeStr(d.installed_meter_reading),
    '{{INSTALLED_SEAL_NUMBER}}': safeStr(d.installed_seal_number),

    // MI (установка прибора)
    '{{MI_SERVICE_ID}}': safeStr(d.mi_service_id),
    '{{MI_ADDRESS}}': normalizeAddress(d.mi_address || d.object_address),
    '{{MI_PHONE}}': safeStr(d.mi_phone || d.owner_phone),
    '{{MI_ACCOUNT}}': safeStr(d.mi_account || d.lic || personalAccount),
    '{{MI_DATE}}': safeStr(d.mi_date || d.act_date),
    '{{MI_DEVICE_NAME}}': safeStr(d.mi_device_name),
    '{{MI_DEVICE_NUM}}': safeStr(d.mi_device_num),
    '{{MI_DEVICE_G}}': safeStr(d.mi_device_g),
    '{{MI_DEVICE_PRICE}}': safeStr(d.mi_device_price),
    '{{MI_INSTALL_WORK_PRICE}}': safeStr(d.mi_install_work_price),
    '{{MI_TOTAL_PRICE}}': safeStr(d.mi_total_price),

    // MR (снятие показаний)
    '{{MR_PERSON}}': safeStr(d.mr_person || d.owner_name),
    '{{MR_ADDRESS}}': normalizeAddress(d.mr_address || d.object_address),
    '{{MR_PHONE}}': safeStr(d.mr_phone || d.owner_phone),
    '{{MR_ACCOUNT}}': safeStr(d.mr_account || personalAccount),
    '{{MR_DATE}}': safeStr(d.mr_date || d.act_date),
    '{{MR_METER_TYPE}}': safeStr(d.mr_meter_type),
    '{{MR_METER_NUM}}': safeStr(d.mr_meter_num),
    '{{MR_READING}}': safeStr(d.mr_reading),
    '{{MR_RESULT}}': safeStr(d.mr_result),
    '{{MR_NOTE}}': safeStr(d.mr_note),

    // Пломбирование (3 счетчика)
    '{{M1_MODEL}}': safeStr(d.m1_model),
    '{{M1_NUMBER}}': safeStr(d.m1_number),
    '{{M1_SEAL_NUMBER}}': safeStr(d.m1_seal_number),
    '{{M1_NOTE}}': safeStr(d.m1_note),
    '{{M1_READING}}': safeStr(d.m1_reading),

    '{{M2_MODEL}}': safeStr(d.m2_model),
    '{{M2_NUMBER}}': safeStr(d.m2_number),
    '{{M2_SEAL_NUMBER}}': safeStr(d.m2_seal_number),
    '{{M2_NOTE}}': safeStr(d.m2_note),
    '{{M2_READING}}': safeStr(d.m2_reading),

    '{{M3_MODEL}}': safeStr(d.m3_model),
    '{{M3_NUMBER}}': safeStr(d.m3_number),
    '{{M3_SEAL_NUMBER}}': safeStr(d.m3_seal_number),
    '{{M3_NOTE}}': safeStr(d.m3_note),
    '{{M3_READING}}': safeStr(d.m3_reading),

    '{{RECEIVED_DATE}}': safeStr(d.received_date || d.act_date),

    // SF (недопуск/отключение)
    '{{SF_REASON}}': safeStr(d.sf_reason),
    '{{SF_CHECKBOX_1}}': d.sf_checkbox_1 ? 'X' : '',
    '{{SF_CHECKBOX_2}}': d.sf_checkbox_2 ? 'X' : '',
    '{{SF_CHECKBOX_3}}': d.sf_checkbox_3 ? 'X' : '',
    '{{SF_NOTE}}': safeStr(d.sf_note),

    // SGE / предписание
    '{{SGE_OBJECT_NAME}}': safeStr(d.sge_object_name),
    '{{SGE_OBJECT_ADDRESS}}': normalizeAddress(d.sge_object_address || d.object_address),
    '{{SGE_DEFECTS}}': safeStr(d.sge_defects),
    '{{SGE_DEADLINE}}': safeStr(d.sge_deadline),

    // AAD
    '{{AAD_OBJECT_ADDRESS}}': normalizeAddress(d.aad_object_address || d.object_address),
    '{{AAD_PERSONAL_ACCOUNT}}': safeStr(d.aad_personal_account || d.lic || personalAccount),
    '{{AAD_SUPPLIER_REP_FIO}}': safeStr(d.aad_supplier_rep_fio),
    '{{AAD_CUSTOMER_FIO}}': safeStr(d.aad_customer_fio || d.owner_name),
  };

  let html = htmlTemplate;
  for (const [key, value] of Object.entries(replacements)) {
    html = html.split(key).join(value);
  }
  return html;
};
