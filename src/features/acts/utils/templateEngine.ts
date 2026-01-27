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
      year: year,
    };
  } catch {
    return { full: isoDate, short: isoDate, year: '____' };
  }
};

const formatSign = (sign: any) => {
  // В проекте подписи обычно хранятся как объект { dataUrl: "data:image/png;base64,..." }
  if (sign && sign.dataUrl) {
    return `<img src="${sign.dataUrl}" style="height: 100%; border: none; max-height: 55px;" />`;
  }
  // Иногда могут прийти строкой dataUrl
  if (typeof sign === 'string' && sign.startsWith('data:')) {
    return `<img src="${sign}" style="height: 100%; border: none; max-height: 55px;" />`;
  }
  return '';
};

const parseTimeHHMM = (val?: string) => {
  const s = String(val || '').trim();
  const m = s.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return { hh: '____', mm: '____' };
  return { hh: m[1].padStart(2, '0'), mm: m[2] };
};

export const fillActTemplate = (htmlTemplate: string, act: any) => {
  const d = act?.details || {};
  const common = act || {};

  // Даты
  const actDate = parseDateSmart(common.act_date);
  const remDate = parseDateSmart(d.removal_date);
  const instDate = parseDateSmart(d.installation_date);

  // Для предписания
  const predDeadline = parseDateSmart(d.pred_deadline);

  // Для ААД времени
  const aadTime = parseTimeHHMM(d.aad_time);

  const objectAddress =
    typeof d.object_address === 'object' ? d.object_address?.address : (d.object_address || '________________');

  // ВАЖНО: PERSONAL_ACCOUNT объявляем ОДИН раз (иначе warning дубль ключа)
  const personalAccount = d.personal_account || '________________';

  const replacements: Record<string, string> = {
    // ---- Общие ----
    '{{LOGO_SRC}}': USD_LOGO_BASE64 || '',
    '{{NUMBER}}': common.act_number || 'Б/Н',
    '{{ACT_NUMBER}}': common.act_number || 'Б/Н',

    '{{ACT_DATE}}': actDate.short,
    '{{ACT_YEAR}}': actDate.year,
    '{{YEAR}}': actDate.year,
    '{{ACT_DATE_FULL}}': actDate.full,

    '{{TECHNICIAN_NAME}}': d.technician_name || '________________',
    '{{OWNER_NAME}}': d.owner_name || '________________',
    '{{OWNER_PHONE}}': d.owner_phone || '',
    '{{OBJECT_TYPE}}': d.object_type || '_________',
    '{{OBJECT_ADDRESS}}': objectAddress,
    '{{PERSONAL_ACCOUNT}}': personalAccount,

    // ---- Замена/демонтаж/монтаж (BR и общие) ----
    '{{REMOVAL_DATE}}': remDate.short,
    '{{REMOVAL_YEAR}}': remDate.year,
    '{{REMOVED_METER_MODEL}}': d.removed_meter_model || '______',
    '{{REMOVED_METER_NUMBER}}': d.removed_meter_number || '______',
    '{{REMOVED_METER_READING}}': d.removed_meter_reading || '______',
    '{{REMOVED_SEAL_NUMBER}}': d.removed_seal_number || '______',

    '{{INSTALLATION_DATE}}': instDate.short,
    '{{INSTALLATION_YEAR}}': instDate.year,
    '{{INSTALLED_METER_MODEL}}': d.installed_meter_model || d.meter_model || '______',
    '{{INSTALLED_METER_NUMBER}}': d.installed_meter_number || d.meter_number || '______',
    '{{INSTALLED_METER_READING}}': d.installed_meter_reading || '______',
    '{{INSTALLED_SEAL_NUMBER}}': d.installed_seal_number || '______',

    '{{METER_MODEL}}': d.meter_model || '______',
    '{{METER_NUMBER}}': d.meter_number || '______',
    '{{METER_READING}}': d.meter_reading || '______',
    '{{SEAL_NUMBER}}': d.seal_number || '______',
    '{{SEAL_PLACE}}': d.seal_place || '______',
    '{{NOTE}}': d.note || '',
    '{{REASON}}': d.reason || '________________',
    '{{METHOD}}': d.method || '________________',

    // ---- Подписи общие ----
    '{{TECHNICIAN_SIGNATURE}}': formatSign(d.technician_signature),
    '{{OWNER_SIGNATURE}}': formatSign(d.owner_signature),

    // =================================================================
    // actmr (снятие показаний)
    // =================================================================
    '{{MR_OBJECT}}': d.mr_object || d.object_type || '________________',

    '{{MR1_MODEL}}': d.mr1_model || '',
    '{{MR1_NUMBER}}': d.mr1_number || '',
    '{{MR1_SEAL}}': d.mr1_seal || '',
    '{{MR1_VERIFY_DATE}}': d.mr1_verify_date ? parseDateSmart(d.mr1_verify_date).full : '',
    '{{MR1_READING}}': d.mr1_reading || '',
    '{{MR1_FLOW}}': d.mr1_flow || '',

    '{{MR2_MODEL}}': d.mr2_model || '',
    '{{MR2_NUMBER}}': d.mr2_number || '',
    '{{MR2_SEAL}}': d.mr2_seal || '',
    '{{MR2_VERIFY_DATE}}': d.mr2_verify_date ? parseDateSmart(d.mr2_verify_date).full : '',
    '{{MR2_READING}}': d.mr2_reading || '',
    '{{MR2_FLOW}}': d.mr2_flow || '',

    '{{MR3_MODEL}}': d.mr3_model || '',
    '{{MR3_NUMBER}}': d.mr3_number || '',
    '{{MR3_SEAL}}': d.mr3_seal || '',
    '{{MR3_VERIFY_DATE}}': d.mr3_verify_date ? parseDateSmart(d.mr3_verify_date).full : '',
    '{{MR3_READING}}': d.mr3_reading || '',
    '{{MR3_FLOW}}': d.mr3_flow || '',

    '{{MR_CONCLUSION}}': d.mr_conclusion || '',

    // =================================================================
    // actsge (акт-наряд на отключение)
    // =================================================================
    '{{SGE_EXP_FIO}}': d.sge_exp_fio || '________________',
    '{{SGE_EXP_POSITION}}': d.sge_exp_position || '________________',
    '{{SGE_REASON}}': d.sge_reason || '________________',
    '{{SGE_APPLIANCES}}': d.sge_appliances || '________________',

    '{{SGE_APT}}': d.sge_apt || '____',
    '{{SGE_HOUSE}}': d.sge_house || '____',
    '{{SGE_STREET}}': d.sge_street || '________________',

    '{{SGE_ISSUED_BY}}': d.sge_issued_by || '________________',
    '{{SGE_RECEIVED_BY}}': d.sge_received_by || '________________',
    '{{SGE_EXECUTOR}}': d.sge_executor || '________________',

    '{{SGE_OFF_DATETIME}}': d.sge_off_datetime || '________________',
    '{{SGE_OFF_DETAILS}}': d.sge_off_details || '________________',

    '{{SGE_ON_DATE}}': d.sge_on_date || '________________',
    '{{SGE_ON_EXP}}': d.sge_on_exp || '________________',
    '{{SGE_ON_BY}}': d.sge_on_by || '________________',

    '{{SGE_ISSUED_SIGNATURE}}': formatSign(d.sge_issued_signature),
    '{{SGE_RECEIVED_SIGNATURE}}': formatSign(d.sge_received_signature),
    '{{SGE_OFF_EXP_SIGNATURE}}': formatSign(d.sge_off_exp_signature),
    '{{SGE_OFF_OWNER_SIGNATURE}}': formatSign(d.sge_off_owner_signature),
    '{{SGE_ON_EXP_SIGNATURE}}': formatSign(d.sge_on_exp_signature),
    '{{SGE_ON_OWNER_SIGNATURE}}': formatSign(d.sge_on_owner_signature),

    // =================================================================
    // actsge_predpisanie (предписание)
    // =================================================================
    '{{PRED_VIOLATIONS}}': d.pred_violations || '',
    '{{PRED_DEADLINE}}': d.pred_deadline ? predDeadline.full : '________________',

    '{{PRED_REP_FIO}}': d.pred_rep_fio || '________________',
    '{{PRED_REP_SIGNATURE}}': formatSign(d.pred_rep_signature),

    '{{PRED_OWNER_SIGNATURE}}': formatSign(d.pred_owner_signature),

    '{{PRED_OWNER_REP_FIO}}': d.pred_owner_rep_fio || '________________',
    '{{PRED_OWNER_REP_SIGNATURE}}': formatSign(d.pred_owner_rep_signature),

    // =================================================================
    // actaad (ААД акт проверки)
    // =================================================================
    '{{AAD_HOUR}}': aadTime.hh,
    '{{AAD_MIN}}': aadTime.mm,

    '{{AAD_SUPPLIER_REP_FIO}}': d.aad_supplier_rep_fio || '________________',
    '{{AAD_OWNER_DOC}}': d.aad_owner_doc || '________________',
    '{{AAD_OWNER_REP_FIO}}': d.aad_owner_rep_fio || '________________',
    '{{AAD_OWNER_REP_DOC}}': d.aad_owner_rep_doc || '________________',

    '{{AAD_FOUND}}': d.aad_found || '',

    '{{AAD1_TYPE}}': d.aad1_type || '____',
    '{{AAD1_NUMBER}}': d.aad1_number || '________________',
    '{{AAD1_READING}}': d.aad1_reading || '________________',
    '{{AAD1_SEAL}}': d.aad1_seal || '________________',
    '{{AAD1_SEAL_COLOR}}': d.aad1_seal_color || '________',
    '{{AAD1_EQUIPMENT}}': d.aad1_equipment || '________________',
    '{{AAD1_LIVING_AREA}}': d.aad1_living_area || '_____',
    '{{AAD1_NONLIVING_AREA}}': d.aad1_nonliving_area || '_____',
    '{{AAD1_PEOPLE}}': d.aad1_people || '_____',

    '{{AAD2_TYPE}}': d.aad2_type || '____',
    '{{AAD2_NUMBER}}': d.aad2_number || '________________',
    '{{AAD2_READING}}': d.aad2_reading || '________________',
    '{{AAD2_SEAL}}': d.aad2_seal || '________________',
    '{{AAD2_SEAL_COLOR}}': d.aad2_seal_color || '________',
    '{{AAD2_EQUIPMENT}}': d.aad2_equipment || '________________',
    '{{AAD2_LIVING_AREA}}': d.aad2_living_area || '_____',
    '{{AAD2_NONLIVING_AREA}}': d.aad2_nonliving_area || '_____',
    '{{AAD2_PEOPLE}}': d.aad2_people || '_____',

    '{{AAD_OWNER_OPINION}}': d.aad_owner_opinion || '________________',
    '{{AAD_NOTE}}': d.aad_note || '________________',

    '{{AAD_SUPPLIER_SIGNATURE}}': formatSign(d.aad_supplier_signature),
    '{{AAD_OWNER_SIGNATURE}}': formatSign(d.aad_owner_signature),
    '{{AAD_OWNER_REP_SIGNATURE}}': formatSign(d.aad_owner_rep_signature),

    '{{AAD_WITNESS_FIO}}': d.aad_witness_fio || '________________',
    '{{AAD_WITNESS_DOC}}': d.aad_witness_doc || '________________',
  };

  let result = htmlTemplate;

  Object.entries(replacements).forEach(([key, value]) => {
    result = result.split(key).join(value);
  });

  return result;
};
