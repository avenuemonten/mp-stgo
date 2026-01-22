import { USD_LOGO_BASE64 } from '../../../constants/logo';

// Умный парсер даты.
// Если дата '2026-01-21', он вернет:
// full: '21.01.2026'
// short: '21.01'
// year: '2026'
const parseDateSmart = (isoDate?: string) => {
  if (!isoDate) return { full: '___', short: '__.__', year: '____' };
  try {
    const d = new Date(isoDate);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString();
    
    return {
      full: `${day}.${month}.${year}`,
      short: `${day}.${month}`,
      year: year
    };
  } catch {
    return { full: isoDate, short: isoDate, year: '____' };
  }
};

const formatSign = (sign: any) => {
  if (sign && sign.dataUrl) {
    return `<img src="${sign.dataUrl}" style="height: 100%; border: none; max-height: 50px;" />`;
  }
  return '';
};

export const fillActTemplate = (htmlTemplate: string, act: any) => {
  const d = act.details || {}; 
  const common = act;

  // Парсим все даты
  const actDate = parseDateSmart(common.act_date);
  const remDate = parseDateSmart(d.removal_date);
  const instDate = parseDateSmart(d.installation_date);

  const replacements: Record<string, string> = {
    '{{LOGO_SRC}}': USD_LOGO_BASE64 || '',
    '{{NUMBER}}': common.act_number || 'Б/Н',
    
    // ДАТЫ (Специально для твоего шаблона)
    '{{ACT_DATE}}': actDate.short,      // 21.01
    '{{ACT_YEAR}}': actDate.year,       // 2026
    '{{YEAR}}': actDate.year,           // Для совместимости, если где-то просто YEAR

    // ЛЮДИ И АДРЕС
    '{{TECHNICIAN_NAME}}': d.technician_name || '________________',
    '{{OWNER_NAME}}': d.owner_name || '________________',
    '{{OBJECT_TYPE}}': d.object_type || '_________',
    '{{OBJECT_ADDRESS}}': typeof d.object_address === 'object' ? d.object_address.address : (d.object_address || '________________'),

    // --- СНЯТИЕ ---
    '{{REMOVAL_DATE}}': remDate.short,  // 21.01
    '{{REMOVAL_YEAR}}': remDate.year,   // 2026
    '{{REMOVED_METER_MODEL}}': d.removed_meter_model || '______',
    '{{REMOVED_METER_NUMBER}}': d.removed_meter_number || '______',
    '{{REMOVED_METER_READING}}': d.removed_meter_reading || '______',
    '{{REMOVED_SEAL_NUMBER}}': d.removed_seal_number || '______',

    // --- УСТАНОВКА ---
    '{{INSTALLATION_DATE}}': instDate.short, // 21.01
    '{{INSTALLATION_YEAR}}': instDate.year,  // 2026
    '{{INSTALLED_METER_MODEL}}': d.installed_meter_model || d.meter_model || '______',
    '{{INSTALLED_METER_NUMBER}}': d.installed_meter_number || d.meter_number || '______',
    '{{INSTALLED_METER_READING}}': d.installed_meter_reading || '______',
    '{{INSTALLED_SEAL_NUMBER}}': d.installed_seal_number || '______',

    // ДЛЯ ДРУГИХ АКТОВ (Пломба, SGE и т.д.)
    '{{METER_MODEL}}': d.meter_model || '______',
    '{{METER_NUMBER}}': d.meter_number || '______',
    '{{METER_READING}}': d.meter_reading || '______',
    '{{SEAL_NUMBER}}': d.seal_number || '______',
    '{{SEAL_PLACE}}': d.seal_place || '______',
    '{{NOTE}}': d.note || '',
    '{{REASON}}': d.reason || '________________',
    '{{METHOD}}': d.method || '________________',

    // ПОДПИСИ
    '{{TECHNICIAN_SIGNATURE}}': formatSign(d.technician_signature),
    '{{OWNER_SIGNATURE}}': formatSign(d.owner_signature)
  };

  let result = htmlTemplate;
  Object.entries(replacements).forEach(([key, value]) => {
     // Глобальная замена всех вхождений
     result = result.split(key).join(value);
  });

  return result;
};