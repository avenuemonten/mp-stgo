import { HTML_BR, HTML_MI, HTML_MR, HTML_PLOMB, HTML_SF, HTML_SGE, HTML_SGE_PREDPISANIE, HTML_AAD, HTML_WORK_COMPLETED } from './htmlTemplates';
import type { ActTemplateConfig } from '../types';

const COMMON_FIELDS_TOP = [
  { section: 'Данные акта', key: 'act_number', label: 'Номер акта', type: 'string', required: true },
  { section: 'Данные акта', key: 'act_date', label: 'Дата акта', type: 'date', required: true },

  { section: 'Абонент', key: 'owner_name', label: 'ФИО абонента', type: 'string', required: true },
  { section: 'Абонент', key: 'owner_phone', label: 'Телефон абонента', type: 'string' },

  { section: 'Объект', key: 'object_type', label: 'Тип объекта', type: 'string' },
  { section: 'Объект', key: 'object_address', label: 'Адрес объекта', type: 'address', required: true },
] as const;

export const ACT_TEMPLATES_REGISTRY: Record<string, ActTemplateConfig> = {
  actbr: {
    type: 'actbr',
    name: 'Акт замены аккумуляторной батареи',
    htmlTemplate: HTML_BR,
    fields: [
      ...COMMON_FIELDS_TOP,
      { section: 'Снятый счетчик', key: 'removed_meter_model', label: 'Модель', type: 'string', required: true },
      { section: 'Снятый счетчик', key: 'removed_meter_number', label: 'Номер', type: 'string', required: true },
      { section: 'Снятый счетчик', key: 'removed_meter_reading', label: 'Показания', type: 'string' },
      { section: 'Снятый счетчик', key: 'removed_seal_number', label: 'Номер пломбы', type: 'string' },

      { section: 'Установленный счетчик', key: 'installed_meter_model', label: 'Модель', type: 'string', required: true },
      { section: 'Установленный счетчик', key: 'installed_meter_number', label: 'Номер', type: 'string', required: true },
      { section: 'Установленный счетчик', key: 'installed_meter_reading', label: 'Показания', type: 'string' },
      { section: 'Установленный счетчик', key: 'installed_seal_number', label: 'Номер пломбы', type: 'string' },

      { section: 'Подписи', key: 'technician_name', label: 'ФИО слесаря', type: 'string' },
      { section: 'Подписи', key: 'technician_signature', label: 'Подпись слесаря', type: 'signature' },
      { section: 'Подписи', key: 'owner_signature', label: 'Подпись абонента', type: 'signature' },
    ],
  },

  actplomb: {
    type: 'actplomb',
    name: 'Акт пломбирования',
    htmlTemplate: HTML_PLOMB,
    fields: [
      ...COMMON_FIELDS_TOP,

      { section: 'Прибор учета (1)', key: 'meter_model', label: 'Модель (после G-)', type: 'string', required: true },
      { section: 'Прибор учета (1)', key: 'meter_number', label: 'Номер счётчика', type: 'string', required: true },
      { section: 'Прибор учета (1)', key: 'meter_reading', label: 'Текущие показания (м³)', type: 'string' },
      { section: 'Прибор учета (1)', key: 'seal_number', label: 'Номер пломбы', type: 'string' },
      { section: 'Прибор учета (1)', key: 'note', label: 'Примечания', type: 'textarea' },

      { section: 'Прибор учета (2)', key: 'meter2_model', label: 'Модель (после G-)', type: 'string' },
      { section: 'Прибор учета (2)', key: 'meter2_number', label: 'Номер счётчика', type: 'string' },
      { section: 'Прибор учета (2)', key: 'meter2_reading', label: 'Текущие показания (м³)', type: 'string' },
      { section: 'Прибор учета (2)', key: 'meter2_seal_number', label: 'Номер пломбы', type: 'string' },
      { section: 'Прибор учета (2)', key: 'meter2_note', label: 'Примечания', type: 'textarea' },

      { section: 'Прибор учета (3)', key: 'meter3_model', label: 'Модель (после G-)', type: 'string' },
      { section: 'Прибор учета (3)', key: 'meter3_number', label: 'Номер счётчика', type: 'string' },
      { section: 'Прибор учета (3)', key: 'meter3_reading', label: 'Текущие показания (м³)', type: 'string' },
      { section: 'Прибор учета (3)', key: 'meter3_seal_number', label: 'Номер пломбы', type: 'string' },
      { section: 'Прибор учета (3)', key: 'meter3_note', label: 'Примечания', type: 'textarea' },

      { section: 'Подписи', key: 'technician_name', label: 'ФИО сотрудника', type: 'string' },
      { section: 'Подписи', key: 'technician_signature', label: 'Подпись сотрудника', type: 'signature' },
      { section: 'Подписи', key: 'owner_signature', label: 'Подпись абонента', type: 'signature' },
      { section: 'Подписи', key: 'received_date', label: 'Дата получения акта (опционально)', type: 'date' },
    ],
  },

  // ✅ actsf = "Отключение газа / недопуск" (как в DOCX)
  actsf: {
    type: 'actsf',
    name: 'Акт недопуска для проведения проверки (отключения)',
    htmlTemplate: HTML_SF,
    fields: [
      ...COMMON_FIELDS_TOP,

      { section: 'Составление', key: 'place_of_compilation', label: 'Место составления', type: 'address', required: true },
      { section: 'Составление', key: 'attempt_datetime', label: 'Дата и время попытки (текстом)', type: 'string', required: true },
      { section: 'Составление', key: 'basis', label: 'Основание', type: 'textarea', required: true },

      { section: 'Абонент (доп.)', key: 'owner_dob', label: 'Дата рождения абонента', type: 'date', required: true },
      { section: 'Абонент (доп.)', key: 'owner_doc_type', label: 'Документ (тип)', type: 'string', required: true },
      { section: 'Абонент (доп.)', key: 'owner_doc_series', label: 'Серия', type: 'string', required: true },
      { section: 'Абонент (доп.)', key: 'owner_doc_number', label: 'Номер', type: 'string', required: true },
      { section: 'Абонент (доп.)', key: 'gas_contract', label: 'Договор поставки газа', type: 'string', required: true },

      { section: 'Поставщик газа (1)', key: 'sup1_position', label: 'Должность', type: 'string', required: true },
      { section: 'Поставщик газа (1)', key: 'sup1_fio', label: 'Ф.И.О.', type: 'string', required: true },
      { section: 'Поставщик газа (1)', key: 'sup1_id', label: 'Удостоверение', type: 'string', required: true },
      { section: 'Поставщик газа (1)', key: 'sup1_signature', label: 'Подпись', type: 'signature', required: true },

      { section: 'Поставщик газа (2)', key: 'sup2_position', label: 'Должность', type: 'string' },
      { section: 'Поставщик газа (2)', key: 'sup2_fio', label: 'Ф.И.О.', type: 'string' },
      { section: 'Поставщик газа (2)', key: 'sup2_id', label: 'Удостоверение', type: 'string' },
      { section: 'Поставщик газа (2)', key: 'sup2_signature', label: 'Подпись', type: 'signature' },

      {
        section: 'Причина недопуска',
        key: 'no_access_reason',
        label: 'Причина',
        type: 'select',
        required: true,
        options: [
          'Отсутствие абонента и совершеннолетних лиц по месту проведения проверки.',
          'Отказ абонента (или иных лиц) допустить представителя поставщика газа для проведения проверки/отключения',
        ],
      },
      { section: 'Причина недопуска', key: 'refusal_person_fio', label: 'Ф.И.О. отказавшегося лица (если отказ)', type: 'string' },

      { section: 'Фотофиксация', key: 'photo_count', label: 'Количество фото (шт.)', type: 'number', required: true },
      { section: 'Фотофиксация', key: 'photo_data', label: 'Одно фото (опционально, для вложения)', type: 'image' },

      { section: 'Свидетель 1', key: 'w1_fio', label: 'ФИО', type: 'string', required: true },
      { section: 'Свидетель 1', key: 'w1_passport', label: 'Паспорт (серия/номер)', type: 'string', required: true },
      { section: 'Свидетель 1', key: 'w1_address', label: 'Адрес регистрации', type: 'address', required: true },
      { section: 'Свидетель 1', key: 'w1_signature', label: 'Подпись', type: 'signature', required: true },

      { section: 'Свидетель 2', key: 'w2_fio', label: 'ФИО', type: 'string', required: true },
      { section: 'Свидетель 2', key: 'w2_passport', label: 'Паспорт (серия/номер)', type: 'string', required: true },
      { section: 'Свидетель 2', key: 'w2_address', label: 'Адрес регистрации', type: 'address', required: true },
      { section: 'Свидетель 2', key: 'w2_signature', label: 'Подпись', type: 'signature', required: true },

      { section: 'Экземпляры', key: 'copies_count', label: 'Количество экземпляров', type: 'number', required: true },
    ],
  },

  actmr: {
    type: 'actmr',
    name: 'Акт снятия показаний',
    htmlTemplate: HTML_MR,
    fields: [
  ...COMMON_FIELDS_TOP,

  { section: 'Объект', key: 'mr_object', label: 'На объекте (название/тип)', type: 'string', required: true },

  { section: 'Прибор 1', key: 'mr1_model', label: 'Марка/тип', type: 'string', required: true },
  { section: 'Прибор 1', key: 'mr1_number', label: 'Заводской №', type: 'string', required: true },
  { section: 'Прибор 1', key: 'mr1_seal', label: 'Пломба (№, цвет)', type: 'string' },
  { section: 'Прибор 1', key: 'mr1_verify_date', label: 'Поверка от (дата)', type: 'date' },
  { section: 'Прибор 1', key: 'mr1_reading', label: 'Текущие показания (м³)', type: 'string' },
  { section: 'Прибор 1', key: 'mr1_flow', label: 'Направление хода газа', type: 'string' },

  { section: 'Прибор 2', key: 'mr2_model', label: 'Марка/тип', type: 'string' },
  { section: 'Прибор 2', key: 'mr2_number', label: 'Заводской №', type: 'string' },
  { section: 'Прибор 2', key: 'mr2_seal', label: 'Пломба (№, цвет)', type: 'string' },
  { section: 'Прибор 2', key: 'mr2_verify_date', label: 'Поверка от (дата)', type: 'date' },
  { section: 'Прибор 2', key: 'mr2_reading', label: 'Текущие показания (м³)', type: 'string' },
  { section: 'Прибор 2', key: 'mr2_flow', label: 'Направление хода газа', type: 'string' },

  { section: 'Прибор 3', key: 'mr3_model', label: 'Марка/тип', type: 'string' },
  { section: 'Прибор 3', key: 'mr3_number', label: 'Заводской №', type: 'string' },
  { section: 'Прибор 3', key: 'mr3_seal', label: 'Пломба (№, цвет)', type: 'string' },
  { section: 'Прибор 3', key: 'mr3_verify_date', label: 'Поверка от (дата)', type: 'date' },
  { section: 'Прибор 3', key: 'mr3_reading', label: 'Текущие показания (м³)', type: 'string' },
  { section: 'Прибор 3', key: 'mr3_flow', label: 'Направление хода газа', type: 'string' },

  { section: 'Заключение', key: 'mr_conclusion', label: 'Заключение', type: 'textarea' },

  { section: 'Подписи', key: 'technician_name', label: 'ФИО представителя поставщика', type: 'string', required: true },
  { section: 'Подписи', key: 'technician_signature', label: 'Подпись поставщика', type: 'signature' },
  { section: 'Подписи', key: 'owner_signature', label: 'Подпись абонента', type: 'signature' },
]
,
  },

  actmi: {
    type: 'actmi',
    name: 'Акт установки прибора',
    htmlTemplate: HTML_MI,
    fields: [
      ...COMMON_FIELDS_TOP,
      { section: 'Прибор учета', key: 'meter_model', label: 'Модель', type: 'string' },
      { section: 'Прибор учета', key: 'meter_number', label: 'Номер', type: 'string' },
      { section: 'Пломба', key: 'seal_place', label: 'Место установки пломбы', type: 'string' },
    ],
  },

  actsge: {
    type: 'actsge',
    name: 'Акт наряд на отключение (Ф29Э)',
    htmlTemplate: HTML_SGE,
    fields: [
  ...COMMON_FIELDS_TOP,

  { section: 'Кому выдан наряд', key: 'sge_exp_fio', label: 'ФИО (эксплуатационная орг.)', type: 'string', required: true },
  { section: 'Кому выдан наряд', key: 'sge_exp_position', label: 'Должность (эксплуатационная орг.)', type: 'string', required: true },

  { section: 'Основание', key: 'sge_reason', label: 'Причина (ввиду)', type: 'textarea', required: true },
  { section: 'Отключить', key: 'sge_appliances', label: 'Наименование приборов', type: 'textarea', required: true },

  { section: 'Адрес (как в бланке)', key: 'sge_apt', label: 'Квартира №', type: 'string', required: true },
  { section: 'Адрес (как в бланке)', key: 'sge_house', label: 'Дом №', type: 'string', required: true },
  { section: 'Адрес (как в бланке)', key: 'sge_street', label: 'Улица', type: 'string', required: true },

  { section: 'Наряд', key: 'sge_issued_by', label: 'Наряд выдал (должность, ФИО)', type: 'string', required: true },
  { section: 'Наряд', key: 'sge_issued_signature', label: 'Подпись (наряд выдал)', type: 'signature' },

  { section: 'Наряд', key: 'sge_received_by', label: 'Наряд получил (должность, ФИО)', type: 'string', required: true },
  { section: 'Наряд', key: 'sge_received_signature', label: 'Подпись (наряд получил)', type: 'signature' },

  { section: 'Исполнитель', key: 'sge_executor', label: 'Мною (должность, ФИО)', type: 'string', required: true },
  { section: 'Отключение', key: 'sge_off_datetime', label: 'Дата/время отключения (текстом)', type: 'string', required: true },
  { section: 'Отключение', key: 'sge_off_details', label: 'Что отключено (кол-во, способ)', type: 'textarea', required: true },

  { section: 'Подписи (отключение)', key: 'sge_off_exp_signature', label: 'Эксплуатационная орг. (подпись)', type: 'signature' },
  { section: 'Подписи (отключение)', key: 'sge_off_owner_signature', label: 'Абонент (подпись)', type: 'signature' },

  { section: 'Подключение', key: 'sge_on_date', label: 'Дата подключения (текстом)', type: 'string' },
  { section: 'Подключение', key: 'sge_on_exp', label: 'Подключил (должность, ФИО)', type: 'string' },
  { section: 'Подключение', key: 'sge_on_by', label: 'По указанию (должность, ФИО)', type: 'string' },

  { section: 'Подписи (подключение)', key: 'sge_on_exp_signature', label: 'Эксплуатационная орг. (подпись)', type: 'signature' },
  { section: 'Подписи (подключение)', key: 'sge_on_owner_signature', label: 'Абонент (подпись)', type: 'signature' },
],
  },

  actsge_predpisanie: {
  type: 'actsge_predpisanie',
  name: 'Предписание',
  htmlTemplate: HTML_SGE_PREDPISANIE,
  fields: [
    ...COMMON_FIELDS_TOP,

    { section: 'Данные проверки', key: 'personal_account', label: 'Л/С', type: 'string', required: true },

    { section: 'Нарушения', key: 'pred_violations', label: 'Выявленные нарушения', type: 'textarea', required: true },
    { section: 'Срок', key: 'pred_deadline', label: 'Устранить до (дата)', type: 'date', required: true },

    { section: 'Подписи', key: 'pred_rep_fio', label: 'Представитель организации (ФИО)', type: 'string', required: true },
    { section: 'Подписи', key: 'pred_rep_signature', label: 'Подпись представителя', type: 'signature' },

    { section: 'Подписи', key: 'pred_owner_signature', label: 'Подпись абонента', type: 'signature' },

    { section: 'Подписи', key: 'pred_owner_rep_fio', label: 'Представитель абонента (ФИО)', type: 'string' },
    { section: 'Подписи', key: 'pred_owner_rep_signature', label: 'Подпись представителя абонента', type: 'signature' },
  ],
},

actaad: {
  type: 'actaad',
  name: 'Акт проверки газифицированного объекта (ААД)',
  htmlTemplate: HTML_AAD,
  fields: [
    ...COMMON_FIELDS_TOP,

    { section: 'Данные', key: 'personal_account', label: 'Л/С', type: 'string', required: true },
    { section: 'Время', key: 'aad_time', label: 'Время (HH:MM)', type: 'string', required: true },

    { section: 'Представитель поставщика', key: 'aad_supplier_rep_fio', label: 'ФИО представителя УСД', type: 'string', required: true },
    { section: 'Абонент', key: 'aad_owner_doc', label: 'Документ абонента (реквизиты)', type: 'textarea', required: true },

    { section: 'Представитель абонента', key: 'aad_owner_rep_fio', label: 'ФИО представителя абонента', type: 'string' },
    { section: 'Представитель абонента', key: 'aad_owner_rep_doc', label: 'Документ представителя (реквизиты)', type: 'textarea' },

    { section: 'Выявлено', key: 'aad_found', label: 'Выявлено', type: 'textarea', required: true },

    { section: 'Счетчик 1', key: 'aad1_type', label: 'Тип (после G)', type: 'string' },
    { section: 'Счетчик 1', key: 'aad1_number', label: 'Заводской №', type: 'string' },
    { section: 'Счетчик 1', key: 'aad1_reading', label: 'Показания (м³)', type: 'string' },
    { section: 'Счетчик 1', key: 'aad1_seal', label: 'Пломба №', type: 'string' },
    { section: 'Счетчик 1', key: 'aad1_seal_color', label: 'Цвет пломбы', type: 'string' },
    { section: 'Счетчик 1', key: 'aad1_equipment', label: 'Газовое оборудование', type: 'textarea' },
    { section: 'Счетчик 1', key: 'aad1_living_area', label: 'Жилая площадь (м²)', type: 'string' },
    { section: 'Счетчик 1', key: 'aad1_nonliving_area', label: 'Нежилая площадь (м²)', type: 'string' },
    { section: 'Счетчик 1', key: 'aad1_people', label: 'Количество чел.', type: 'string' },

    { section: 'Счетчик 2', key: 'aad2_type', label: 'Тип (после G)', type: 'string' },
    { section: 'Счетчик 2', key: 'aad2_number', label: 'Заводской №', type: 'string' },
    { section: 'Счетчик 2', key: 'aad2_reading', label: 'Показания (м³)', type: 'string' },
    { section: 'Счетчик 2', key: 'aad2_seal', label: 'Пломба №', type: 'string' },
    { section: 'Счетчик 2', key: 'aad2_seal_color', label: 'Цвет пломбы', type: 'string' },
    { section: 'Счетчик 2', key: 'aad2_equipment', label: 'Газовое оборудование', type: 'textarea' },
    { section: 'Счетчик 2', key: 'aad2_living_area', label: 'Жилая площадь (м²)', type: 'string' },
    { section: 'Счетчик 2', key: 'aad2_nonliving_area', label: 'Нежилая площадь (м²)', type: 'string' },
    { section: 'Счетчик 2', key: 'aad2_people', label: 'Количество чел.', type: 'string' },

    { section: 'Комментарий', key: 'aad_owner_opinion', label: 'Особое мнение абонента', type: 'textarea' },
    { section: 'Комментарий', key: 'aad_note', label: 'Примечание', type: 'textarea' },

    { section: 'Подписи', key: 'aad_supplier_signature', label: 'Подпись представителя организации', type: 'signature' },
    { section: 'Подписи', key: 'aad_owner_signature', label: 'Подпись абонента', type: 'signature' },
    { section: 'Подписи', key: 'aad_owner_rep_signature', label: 'Подпись представителя абонента', type: 'signature' },

    { section: 'Присутствовал', key: 'aad_witness_fio', label: 'ФИО присутствующего', type: 'string' },
    { section: 'Присутствовал', key: 'aad_witness_doc', label: 'Документ присутствующего (реквизиты)', type: 'textarea' },
  ],
},


  work_completed: {
    type: 'work_completed',
    name: 'Акт выполненных работ',
    htmlTemplate: HTML_WORK_COMPLETED,
    fields: [
      { section: 'Реквизиты', key: 'act_number', label: 'Номер акта', type: 'text', required: true },
      { section: 'Реквизиты', key: 'act_date', label: 'Дата', type: 'date', required: true },

      { section: 'Данные', key: 'owner_name', label: 'Владелец объекта', type: 'text', required: true },
      { section: 'Данные', key: 'owner_phone', label: 'Телефон владельца', type: 'text', required: false },
      { section: 'Данные', key: 'object_address', label: 'Адрес объекта', type: 'address', required: true },
      { section: 'Данные', key: 'lic', label: 'Лицевой счёт', type: 'text', required: false },

      { section: 'Работы', key: 'work_description', label: 'Перечень выполненных работ', type: 'textarea', required: true },
      { section: 'Работы', key: 'amount', label: 'Стоимость (руб.)', type: 'number', required: false },
      { section: 'Работы', key: 'warranty', label: 'Гарантия / примечание', type: 'text', required: false },
      { section: 'Работы', key: 'photo_result', label: 'Фото результата', type: 'image', required: false },

      { section: 'Подписи', key: 'technician_name', label: 'ФИО слесаря', type: 'text', required: true },
      { section: 'Подписи', key: 'technician_signature', label: 'Подпись слесаря', type: 'signature', required: false },
      { section: 'Подписи', key: 'owner_signature', label: 'Подпись владельца', type: 'signature', required: false },
    ],
  },
};

export const ACT_TEMPLATES = ACT_TEMPLATES_REGISTRY;
