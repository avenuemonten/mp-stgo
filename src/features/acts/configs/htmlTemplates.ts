// src/features/acts/configs/htmlTemplates.ts

// "Легкий" общий стиль (для простых актов)
const COMMON_STYLE = `
  <style>
    @page { size: A4; margin: 1.5cm; }
    body { font-family: Times New Roman, serif; font-size: 14pt; }
    .header { text-align: center; font-weight: bold; }
    .act-title { text-align: center; font-weight: bold; margin-top: 20px; }
    .act-meta { margin-top: 10px; }
    .section { margin-top: 15px; }
    .signature { margin-top: 30px; display: flex; justify-content: space-between; }
    .signature div { width: 45%; }
  </style>
`;

const COMMON_HEADER = `
  <div class="header">
    <img src="{{LOGO_SRC}}" style="height: 60px;" /><br/>
    АО "Сахатранснефтегаз"<br/>
    Структурное подразделение<br/>
    Управление газораспределительных сетей
  </div>
`;

// -------------------- ДЕТАЛЬНЫЙ ШАБЛОН (как старый разработчик) --------------------
export const HTML_BR = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Акт замены аккумуляторной батареи</title>
<style>
  @page { size: A4; margin: 0cm; }
  body { font-family: "Times New Roman", serif; font-size: 14pt; margin: 0; padding: 0; }
  .container { padding: 1.5cm; }
  .logo { text-align: center; margin-bottom: 10px; }
  .company-table { width: 100%; border-collapse: collapse; text-align: center; font-size: 12pt; margin-top: 10px; }
  .company-table td, .company-table th { border: 1px solid black; padding: 4px; }
  .act-number { text-align: center; margin-top: 10px; font-weight: bold; }
  .title { text-align: center; font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-top: 20px; text-decoration: underline; }
  .sub-title { text-align: center; font-weight: bold; margin-top: 10px; }
  .info { margin-top: 20px; font-size: 12pt; }
  .info span { text-decoration: underline; font-weight: bold; }
  .field-block { margin-top: 10px; }
  .field-label { display: inline-block; min-width: 180px; }
  .field-value { display: inline-block; border-bottom: 1px solid black; min-width: 200px; padding: 0 5px; }
  .signatures { margin-top: 50px; display: flex; justify-content: space-between; }
  .signature-block { width: 45%; text-align: center; }
  .signature-line { border-bottom: 1px solid black; height: 50px; margin-top: 20px; position: relative; }
  .signature-line img { position: absolute; left: 0; right: 0; margin: auto; max-height: 55px; max-width: 100%; top: 0; }
</style>
</head>
<body>
<div class="container">
  <div class="logo">
    <img src="{{LOGO_SRC}}" style="height: 60px;" />
  </div>

  <table class="company-table">
    <tr>
      <th colspan="2">Акционерное общество<br/>«Сахатранснефтегаз»</th>
    </tr>
    <tr>
      <td colspan="2">Структурное подразделение<br/>Управление газораспределительных сетей</td>
    </tr>
    <tr>
      <td colspan="2">
        677005 Республика Саха (Якутия), г. Якутск, ул. П.Алексеева, 64, тел/факс 46-09-07<br/>
        (время работы: пн-пт 17:00, сб 12:00-13:00); суббота, воскресенье - выходные дни
      </td>
    </tr>
  </table>

  <div class="act-number">Акт №: {{NUMBER}}/{{ACT_YEAR}}</div>

  <div class="title">Акт замены аккумуляторной батареи<br/>газового счетчика</div>

  <div class="info">
    Слесарем СТГО АО УГРС «Сахатранснефтегаз»: <span>{{TECHNICIAN_NAME}}</span><br/>
    Владельца объекта: <span>{{OWNER_NAME}}</span><br/>
    составлен настоящий акт о том, что в <span>{{OBJECT_TYPE}}</span>, находящегося в <span>{{OBJECT_ADDRESS}}</span>
  </div>

  <div class="field-block">
    <span class="field-label">Снят <span>{{ACT_DATE}}</span> {{ACT_YEAR}} г.:</span>
    Счетчик газа G-<span class="field-value">{{REMOVED_METER_MODEL}}</span> №
    <span class="field-value">{{REMOVED_METER_NUMBER}}</span> с показаниями
    <span class="field-value">{{REMOVED_METER_READING}}</span> м³.
  </div>

  <div class="field-block">
    <span class="field-label">Пломба №</span>
    <span class="field-value">{{REMOVED_SEAL_NUMBER}}</span>
  </div>

  <div class="field-block">
    <span class="field-label">Установлен <span>{{ACT_DATE}}</span> {{ACT_YEAR}} г.:</span>
    Счетчик газа G-<span class="field-value">{{INSTALLED_METER_MODEL}}</span> №
    <span class="field-value">{{INSTALLED_METER_NUMBER}}</span> с показаниями
    <span class="field-value">{{INSTALLED_METER_READING}}</span> м³.
  </div>

  <div class="field-block">
    <span class="field-label">Пломба №</span>
    <span class="field-value">{{INSTALLED_SEAL_NUMBER}}</span>
  </div>

  <div class="signatures">
    <div class="signature-block">
      Слесарь СТГО АО УГРС «Сахатранснефтегаз»
      <div class="signature-line">{{TECHNICIAN_SIGNATURE}}</div>
    </div>
    <div class="signature-block">
      Владелец объекта:
      <div class="signature-line">{{OWNER_SIGNATURE}}</div>
    </div>
  </div>
</div>
</body>
</html>`;

// -------------------- ActPlomb (DOCX -> HTML, стиль "как в BR") --------------------
export const HTML_PLOMB = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Акт пломбирования прибора учета газа</title>
<style>
  @page { size: A4; margin: 0cm; }
  body { font-family: "Times New Roman", serif; font-size: 14pt; margin: 0; padding: 0; }
  .container { padding: 1.5cm; }
  .logo { text-align: center; margin-bottom: 10px; }
  .company-table { width: 100%; border-collapse: collapse; text-align: center; font-size: 12pt; margin-top: 10px; }
  .company-table td, .company-table th { border: 1px solid black; padding: 4px; }

  .act-number { text-align: center; margin-top: 10px; font-weight: bold; }
  .title { text-align: center; font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-top: 16px; text-decoration: underline; }
  .date-line { text-align: center; margin-top: 10px; }

  .info { margin-top: 18px; font-size: 12pt; line-height: 1.35; }
  .u { display: inline-block; border-bottom: 1px solid #000; padding: 0 4px; min-width: 180px; }
  .u.sm { min-width: 90px; }
  .u.md { min-width: 140px; }
  .u.lg { min-width: 260px; }
  .u.xl { min-width: 380px; }

  .line { margin-top: 10px; font-size: 12pt; }
  .indent { margin-left: 22px; }

  .sign-row { margin-top: 26px; font-size: 12pt; display: flex; align-items: flex-end; gap: 10px; flex-wrap: wrap; }
  .sign-label { white-space: nowrap; }
  .sign-box { border-bottom: 1px solid #000; height: 55px; min-width: 220px; position: relative; flex: 1; }
  .sign-box img { position: absolute; left: 0; right: 0; margin: auto; max-height: 55px; max-width: 100%; top: 0; }
  .sign-name { white-space: nowrap; }
</style>
</head>
<body>
<div class="container">
  <div class="logo">
    <img src="{{LOGO_SRC}}" style="height: 60px;" />
  </div>

  <table class="company-table">
    <tr>
      <th colspan="2">Акционерное общество<br/>«Сахатранснефтегаз»</th>
    </tr>
    <tr>
      <td colspan="2">Структурное подразделение<br/>Управление по сбытовой деятельности</td>
    </tr>
    <tr>
      <td colspan="2">
        677005 Республика Саха (Якутия), г. Якутск, ул. П.Алексеева, 64, тел/факс 46-09-07<br/>
        (время работы: пн-пт 17:00, сб 12:00-13:00); суббота, воскресенье - выходные дни
      </td>
    </tr>
  </table>

  <div class="act-number">Акт №: {{NUMBER}}/{{ACT_YEAR}}</div>

  <div class="title">Акт пломбирования прибора учета газа</div>
  <div class="date-line">от «<span class="u md">{{ACT_DATE_FULL}}</span>»</div>

  <div class="info">
    Дан(а) ФИО: <span class="u xl">{{OWNER_NAME}}</span><br/>
    По адресу: <span class="u xl">{{OBJECT_ADDRESS}}</span>
  </div>

  <div class="info" style="margin-top: 16px;">
    Прибор учета расхода газа опломбирован:
  </div>

  <div class="line">
    1. G- <span class="u sm">{{M1_MODEL}}</span> № сч <span class="u md">{{M1_NUMBER}}</span>
    пломба № <span class="u md">{{M1_SEAL_NUMBER}}</span> примечания <span class="u lg">{{M1_NOTE}}</span>
  </div>
  <div class="line indent">
    текущие показания прибора учета газа <span class="u sm">{{M1_READING}}</span> м³
  </div>

  <div class="line">
    2. G- <span class="u sm">{{M2_MODEL}}</span> № сч <span class="u md">{{M2_NUMBER}}</span>
    пломба № <span class="u md">{{M2_SEAL_NUMBER}}</span> примечания <span class="u lg">{{M2_NOTE}}</span>
  </div>
  <div class="line indent">
    текущие показания прибора учета газа <span class="u sm">{{M2_READING}}</span> м³
  </div>

  <div class="line">
    3. G- <span class="u sm">{{M3_MODEL}}</span> № сч <span class="u md">{{M3_NUMBER}}</span>
    пломба № <span class="u md">{{M3_SEAL_NUMBER}}</span> примечания <span class="u lg">{{M3_NOTE}}</span>
  </div>
  <div class="line indent">
    текущие показания прибора учета газа <span class="u sm">{{M3_READING}}</span> м³
  </div>

  <div class="sign-row" style="margin-top: 34px;">
    <div class="sign-label">УСД АО «Сахатранснефтегаз»</div>
    <div class="sign-box">{{TECHNICIAN_SIGNATURE}}</div>
    <div class="sign-name">/ <span class="u md">{{TECHNICIAN_NAME}}</span> /</div>
  </div>

  <div class="sign-row">
    <div class="sign-label">АКТ ПОЛУЧИЛ(А)</div>
    <div class="sign-box">{{OWNER_SIGNATURE}}</div>
    <div class="sign-name">/ <span class="u md">{{OWNER_NAME}}</span> /</div>
    <div class="sign-label">Дата</div>
    <div class="sign-name"><span class="u md">{{RECEIVED_DATE}}</span></div>
  </div>
</div>
</body>
</html>`;

// -------------------- actsf (ОТКЛЮЧЕНИЕ ГАЗА / НЕДОПУСК) DOCX -> HTML --------------------
export const HTML_SF = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Акт о недопуске к проверке/отключению</title>
<style>
  @page { size: A4; margin: 0cm; }
  body { font-family: "Times New Roman", serif; font-size: 14pt; margin: 0; padding: 0; }
  .container { padding: 1.5cm; }
  .header { text-align: center; font-size: 12pt; line-height: 1.25; }
  .header .title { font-weight: bold; margin-top: 6px; }
  .act-no { text-align: center; font-weight: bold; margin-top: 18px; font-size: 14pt; }
  .act-name { text-align: center; font-weight: bold; margin-top: 10px; font-size: 14pt; }
  .row { margin-top: 10px; font-size: 12pt; line-height: 1.35; }
  .u { display: inline-block; border-bottom: 1px solid #000; padding: 0 4px; min-width: 220px; }
  .u.sm { min-width: 120px; }
  .u.md { min-width: 180px; }
  .u.lg { min-width: 320px; }
  .u.xl { min-width: 420px; }
  .two-col { display: flex; justify-content: space-between; gap: 10px; }
  .two-col > div { width: 48%; }

  .block-title { margin-top: 14px; font-weight: bold; font-size: 12pt; }
  .indent { margin-left: 18px; }

  .checkline { margin-top: 8px; }
  .mark { display: inline-block; width: 22px; }

  .sign-row { margin-top: 10px; display: flex; align-items: flex-end; gap: 10px; flex-wrap: wrap; }
  .sign-label { white-space: nowrap; }
  .sign-box { border-bottom: 1px solid #000; height: 55px; min-width: 220px; position: relative; flex: 1; }
  .sign-box img { position: absolute; left: 0; right: 0; margin: auto; max-height: 55px; max-width: 100%; top: 0; }
  .sign-name { white-space: nowrap; }
</style>
</head>
<body>
<div class="container">

  <div class="header">
    <div>Структурное подразделение</div>
    <div class="title">Управление по сбытовой деятельности</div>
    <div>677005, Республика Саха (Якутия), г. Якутск, ул. П.Алексеева, 64Б, т. 509-555</div>
    <div style="margin-top: 10px;">
      <img src="{{LOGO_SRC}}" style="height: 55px;" />
    </div>
  </div>

  <div class="act-no">АКТ № <span class="u md">{{NUMBER}}</span>/<span class="u sm">{{ACT_YEAR}}</span></div>
  <div class="act-name">О недопуске к проведению проверки (отключения) газового оборудования</div>

  <div class="row two-col" style="margin-top: 14px;">
    <div>г. Якутск</div>
    <div style="text-align:right;">«<span class="u sm">{{ACT_DATE_FULL}}</span>»</div>
  </div>

  <div class="row">
    Место составления: <span class="u xl">{{PLACE_OF_COMPILATION}}</span>
  </div>
  <div class="row">
    Дата и время попытки проведения проверки/отключения: <span class="u xl">{{ATTEMPT_DATETIME}}</span>
  </div>
  <div class="row">
    Основание: <span class="u xl">{{BASIS}}</span>
  </div>

  <div class="block-title">Сведения об абоненте:</div>
  <div class="row">
    ФИО, дата рождения: <span class="u lg">{{OWNER_NAME}}</span> <span class="u md">{{OWNER_DOB}}</span>
  </div>
  <div class="row">
    Документ удостоверяющий личность:
    <span class="u sm">{{OWNER_DOC_TYPE}}</span>
    серия <span class="u sm">{{OWNER_DOC_SERIES}}</span>
    № <span class="u md">{{OWNER_DOC_NUMBER}}</span>
  </div>
  <div class="row">
    Договор поставки газа: <span class="u xl">{{GAS_CONTRACT}}</span>
  </div>

  <div class="block-title">При попытке проведения проверки/отключения присутствовали:</div>
  <div class="row" style="margin-top: 8px;">Со стороны поставщика газа:</div>

  <div class="row indent">
    Должность: <span class="u md">{{SUP1_POSITION}}</span>
    Ф.И.О.: <span class="u lg">{{SUP1_FIO}}</span>
  </div>
  <div class="row indent">
    Удостоверение: <span class="u xl">{{SUP1_ID}}</span>
  </div>
  <div class="sign-row indent">
    <div class="sign-label">Подпись:</div>
    <div class="sign-box">{{SUP1_SIGNATURE}}</div>
  </div>

  <div class="row indent" style="margin-top: 14px;">
    Должность: <span class="u md">{{SUP2_POSITION}}</span>
    Ф.И.О.: <span class="u lg">{{SUP2_FIO}}</span>
  </div>
  <div class="row indent">
    Удостоверение: <span class="u xl">{{SUP2_ID}}</span>
  </div>
  <div class="sign-row indent">
    <div class="sign-label">Подпись:</div>
    <div class="sign-box">{{SUP2_SIGNATURE}}</div>
  </div>

  <div class="block-title">Доступ к газовому оборудованию не получили по причине:</div>
  <div class="row checkline">
    <span class="mark">{{REASON_ABSENT_MARK}}</span>
    Отсутствие абонента и совершеннолетних лиц по месту проведения проверки.
  </div>
  <div class="row checkline">
    <span class="mark">{{REASON_REFUSAL_MARK}}</span>
    Отказ абонента (или иных лиц, находящихся в помещении) допустить представителя поставщика газа для проведения проверки/отключения
  </div>
  <div class="row">
    Ф.И.О. отказавшегося лица: <span class="u xl">{{REFUSAL_PERSON_FIO}}</span>
  </div>

  <div class="block-title">Фотофиксация:</div>
  <div class="row">
    Факт недопуска зафиксирован на фото/видео. Прилагаются фотографии (<span class="u sm">{{PHOTO_COUNT}}</span> шт.)
    с геотегами, датой и временем, на которых запечатлены: фасад дома/здания с номером, входная дверь (подъезд),
    представители поставщика газа на фоне адресной таблички, попытка взаимодействия (если была).
  </div>

  <div class="block-title">4. Акт составлен в присутствии свидетелей (не менее 2-х незаинтересованных лиц):</div>

  <div class="row">
    1. ФИО: <span class="u lg">{{W1_FIO}}</span>
    Паспорт: <span class="u md">{{W1_PASSPORT}}</span>
  </div>
  <div class="row indent">
    Адрес регистрации: <span class="u xl">{{W1_ADDRESS}}</span>
  </div>

  <div class="row" style="margin-top: 10px;">
    2. ФИО: <span class="u lg">{{W2_FIO}}</span>
    Паспорт: <span class="u md">{{W2_PASSPORT}}</span>
  </div>
  <div class="row indent">
    Адрес регистрации: <span class="u xl">{{W2_ADDRESS}}</span>
  </div>

  <div class="block-title">5. Акт составлен в <span class="u sm">{{COPIES_COUNT}}</span> экземплярах.</div>
  <div class="row">
    Один экземпляр будет направлен абоненту по почте заказным письмом с уведомлением о вручении и описью вложения
    (п.60 Постановления №549).
  </div>

  <div class="block-title">Подписи представителей поставщика:</div>
  <div class="sign-row">
    <div class="sign-box">{{SUP1_SIGNATURE}}</div>
    <div class="sign-name">/ <span class="u md">{{SUP1_FIO}}</span> /</div>
  </div>
  <div class="sign-row">
    <div class="sign-box">{{SUP2_SIGNATURE}}</div>
    <div class="sign-name">/ <span class="u md">{{SUP2_FIO}}</span> /</div>
  </div>

  <div class="block-title">Подписи свидетелей:</div>
  <div class="sign-row">
    <div class="sign-box">{{W1_SIGNATURE}}</div>
    <div class="sign-name">/ <span class="u md">{{W1_FIO}}</span> /</div>
  </div>
  <div class="sign-row">
    <div class="sign-box">{{W2_SIGNATURE}}</div>
    <div class="sign-name">/ <span class="u md">{{W2_FIO}}</span> /</div>
  </div>

</div>
</body>
</html>`;

// -------------------- АКТ СНЯТИЯ ПОКАЗАНИЙ ПРИБОРА УЧЕТА ГАЗА --------------------
export const HTML_MR = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Акт снятия показаний ПУГ</title>
<style>
  @page { size: A4; margin: 0cm; }
  body { font-family: "Times New Roman", serif; font-size: 14pt; margin: 0; padding: 0; }
  .page { padding: 1.5cm; }
  .center { text-align: center; }
  .act-no { font-weight: bold; margin-top: 10px; }
  .act-title { font-weight: bold; margin-top: 6px; }
  .u { display:inline-block; border-bottom: 1px solid #000; padding: 0 6px; min-width: 220px; }
  .u.sm { min-width: 120px; }
  .u.md { min-width: 180px; }
  .u.lg { min-width: 320px; }
  .row { margin-top: 10px; font-size: 12pt; line-height: 1.35; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12pt; }
  td, th { border: 1px solid #000; padding: 6px; vertical-align: top; }
  .muted { font-size: 10pt; }
  .sign-row { margin-top: 16px; font-size: 12pt; display:flex; align-items:flex-end; gap: 10px; flex-wrap: wrap; }
  .sign-box { border-bottom: 1px solid #000; height: 55px; min-width: 240px; position: relative; flex: 1; }
  .sign-box img { position: absolute; left: 0; right: 0; margin: auto; max-height: 55px; max-width: 100%; top: 0; }
  .cut { margin: 14px 0; border-top: 2px dashed #000; }
  .pb { page-break-after: always; }
</style>
</head>
<body>

<!-- Экземпляр 1 -->
<div class="page pb">
  <div class="center">
    <img src="{{LOGO_SRC}}" style="height: 55px;" />
    <div class="act-no">АКТ № <span class="u sm">{{NUMBER}}</span></div>
    <div class="act-title">снятия показаний прибора учета газа</div>
  </div>

  <div class="row center" style="margin-top: 14px;">
    «<span class="u sm">{{ACT_DATE_FULL}}</span>» <span class="u sm">{{ACT_YEAR}}</span> г.
  </div>

  <div class="row">
    Настоящий акт составлен представителем «Поставщика» – УСД АО «Сахатранснефтегаз», в лице
    <span class="u lg">{{TECHNICIAN_NAME}}</span>
    и «Абонентом», в лице
    <span class="u lg">{{OWNER_NAME}}</span>
    о том, что представитель «Поставщика»: произвел проверку показаний прибора учета газа
  </div>

  <div class="row">
    на объекте: <span class="u md">{{MR_OBJECT}}</span>
    по адресу: <span class="u lg">{{OBJECT_ADDRESS}}</span>
  </div>

  <div class="row"><strong>Прибор учета газа:</strong></div>

  <table>
    <thead>
      <tr>
        <th style="width: 6%;">№</th>
        <th style="width: 30%;">Марка, тип</th>
        <th style="width: 26%;">Заводской №</th>
        <th style="width: 20%;">Пломба (№, цвет)</th>
        <th style="width: 18%;">Повер. от (дата)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="center">1</td>
        <td>{{MR1_MODEL}}</td>
        <td>{{MR1_NUMBER}}</td>
        <td>{{MR1_SEAL}}</td>
        <td>{{MR1_VERIFY_DATE}}</td>
      </tr>
      <tr>
        <td colspan="5">
          текущие показания прибора учета составляют <span class="u sm">{{MR1_READING}}</span> м³.
          Направление хода газа: <span class="u md">{{MR1_FLOW}}</span>
        </td>
      </tr>

      <tr>
        <td class="center">2</td>
        <td>{{MR2_MODEL}}</td>
        <td>{{MR2_NUMBER}}</td>
        <td>{{MR2_SEAL}}</td>
        <td>{{MR2_VERIFY_DATE}}</td>
      </tr>
      <tr>
        <td colspan="5">
          текущие показания прибора учета составляют <span class="u sm">{{MR2_READING}}</span> м³.
          Направление хода газа: <span class="u md">{{MR2_FLOW}}</span>
        </td>
      </tr>

      <tr>
        <td class="center">3</td>
        <td>{{MR3_MODEL}}</td>
        <td>{{MR3_NUMBER}}</td>
        <td>{{MR3_SEAL}}</td>
        <td>{{MR3_VERIFY_DATE}}</td>
      </tr>
      <tr>
        <td colspan="5">
          текущие показания прибора учета составляют <span class="u sm">{{MR3_READING}}</span> м³.
          Направление хода газа: <span class="u md">{{MR3_FLOW}}</span>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="row">
    Заключение: <span class="u lg">{{MR_CONCLUSION}}</span>
  </div>

  <div class="sign-row" style="margin-top: 22px;">
    <div>Представитель «Поставщика»</div>
    <div class="sign-box">{{TECHNICIAN_SIGNATURE}}</div>
    <div>/ <span class="u md">{{TECHNICIAN_NAME}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>«Абонент»</div>
    <div class="sign-box">{{OWNER_SIGNATURE}}</div>
    <div>/ <span class="u md">{{OWNER_NAME}}</span> /</div>
  </div>
</div>

<!-- Экземпляр 2 (как в doc повтор) -->
<div class="page">
  <div class="center">
    <img src="{{LOGO_SRC}}" style="height: 55px;" />
    <div class="act-no">АКТ № <span class="u sm">{{NUMBER}}</span></div>
    <div class="act-title">снятия показаний прибора учета газа</div>
  </div>

  <div class="row center" style="margin-top: 14px;">
    «<span class="u sm">{{ACT_DATE_FULL}}</span>» <span class="u sm">{{ACT_YEAR}}</span> г.
  </div>

  <div class="row">
    Настоящий акт составлен представителем «Поставщика» – УСД АО «Сахатранснефтегаз», в лице
    <span class="u lg">{{TECHNICIAN_NAME}}</span>
    и «Абонентом», в лице
    <span class="u lg">{{OWNER_NAME}}</span>
    о том, что представитель «Поставщика»: произвел проверку показаний прибора учета газа
  </div>

  <div class="row">
    на объекте: <span class="u md">{{MR_OBJECT}}</span>
    по адресу: <span class="u lg">{{OBJECT_ADDRESS}}</span>
  </div>

  <div class="row"><strong>Прибор учета газа:</strong></div>

  <table>
    <thead>
      <tr>
        <th style="width: 6%;">№</th>
        <th style="width: 30%;">Марка, тип</th>
        <th style="width: 26%;">Заводской №</th>
        <th style="width: 20%;">Пломба (№, цвет)</th>
        <th style="width: 18%;">Повер. от (дата)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="center">1</td>
        <td>{{MR1_MODEL}}</td>
        <td>{{MR1_NUMBER}}</td>
        <td>{{MR1_SEAL}}</td>
        <td>{{MR1_VERIFY_DATE}}</td>
      </tr>
      <tr>
        <td colspan="5">
          текущие показания прибора учета составляют <span class="u sm">{{MR1_READING}}</span> м³.
          Направление хода газа: <span class="u md">{{MR1_FLOW}}</span>
        </td>
      </tr>

      <tr>
        <td class="center">2</td>
        <td>{{MR2_MODEL}}</td>
        <td>{{MR2_NUMBER}}</td>
        <td>{{MR2_SEAL}}</td>
        <td>{{MR2_VERIFY_DATE}}</td>
      </tr>
      <tr>
        <td colspan="5">
          текущие показания прибора учета составляют <span class="u sm">{{MR2_READING}}</span> м³.
          Направление хода газа: <span class="u md">{{MR2_FLOW}}</span>
        </td>
      </tr>

      <tr>
        <td class="center">3</td>
        <td>{{MR3_MODEL}}</td>
        <td>{{MR3_NUMBER}}</td>
        <td>{{MR3_SEAL}}</td>
        <td>{{MR3_VERIFY_DATE}}</td>
      </tr>
      <tr>
        <td colspan="5">
          текущие показания прибора учета составляют <span class="u sm">{{MR3_READING}}</span> м³.
          Направление хода газа: <span class="u md">{{MR3_FLOW}}</span>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="row">
    Заключение: <span class="u lg">{{MR_CONCLUSION}}</span>
  </div>

  <div class="sign-row" style="margin-top: 22px;">
    <div>Представитель «Поставщика»</div>
    <div class="sign-box">{{TECHNICIAN_SIGNATURE}}</div>
    <div>/ <span class="u md">{{TECHNICIAN_NAME}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>«Абонент»</div>
    <div class="sign-box">{{OWNER_SIGNATURE}}</div>
    <div>/ <span class="u md">{{OWNER_NAME}}</span> /</div>
  </div>
</div>

</body>
</html>`;

// -------------------- ОСТАЛЬНЫЕ АКТЫ (пока простые HTML) --------------------
export const HTML_MI = `<!DOCTYPE html><html><head><meta charset="UTF-8">${COMMON_STYLE}</head><body>
${COMMON_HEADER}
<div class="act-title">АКТ УСТАНОВКИ ПРИБОРА</div>
<div class="act-meta">г. Якутск {{ACT_DATE_FULL}} г.</div>

<div class="section">ФИО абонента: {{OWNER_NAME}}</div>
<div class="section">Адрес: {{OBJECT_ADDRESS}}</div>
<div class="section">Модель прибора: {{METER_MODEL}}</div>
<div class="section">Номер прибора: {{METER_NUMBER}}</div>
<div class="section">Место установки пломбы: {{SEAL_PLACE}}</div>

<div class="signature">
  <div>Исполнитель: ___________________</div>
  <div>Абонент: ___________________</div>
</div>
</body></html>`;

// -------------------- АКТ-наряд на отключение газоиспольующего оборудования --------------------
export const HTML_SGE = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Акт-наряд на отключение газоиспользующего оборудования</title>
<style>
  @page { size: A4; margin: 0cm; }
  body { font-family: "Times New Roman", serif; font-size: 14pt; margin: 0; padding: 0; }
  .page { padding: 1.5cm; }
  .center { text-align: center; }
  .row { margin-top: 10px; font-size: 12pt; line-height: 1.35; }
  .u { display:inline-block; border-bottom: 1px solid #000; padding: 0 6px; min-width: 220px; }
  .u.sm { min-width: 120px; }
  .u.md { min-width: 180px; }
  .u.lg { min-width: 320px; }
  .title { font-weight: bold; margin-top: 10px; }
  .sign-row { margin-top: 14px; font-size: 12pt; display:flex; align-items:flex-end; gap: 10px; flex-wrap: wrap; }
  .sign-box { border-bottom: 1px solid #000; height: 55px; min-width: 240px; position: relative; flex: 1; }
  .sign-box img { position: absolute; left: 0; right: 0; margin: auto; max-height: 55px; max-width: 100%; top: 0; }
  .muted { font-size: 10pt; }
  .pb { page-break-after: always; }
</style>
</head>
<body>

<!-- Экземпляр 1 -->
<div class="page pb">
  <div class="row muted">Форма 29-э</div>

  <div class="center" style="margin-top: 8px;">
    <img src="{{LOGO_SRC}}" style="height: 55px;" />
  </div>

  <div class="center">
    <div class="title">АКТ-НАРЯД № <span class="u sm">{{NUMBER}}</span></div>
    <div class="title">НА ОТКЛЮЧЕНИЕ ГАЗОИСПОЛЬЗУЮЩЕГО<br/>ОБОРУДОВАНИЯ ЖИЛЫХ ЗДАНИЙ</div>
    <div class="row">«<span class="u sm">{{ACT_DATE_FULL}}</span>»</div>
  </div>

  <div class="row">
    Представителю эксплуатационной организации
    <span class="u lg">{{SGE_EXP_FIO}}</span>
    <span class="u md">{{SGE_EXP_POSITION}}</span>
  </div>

  <div class="row">ввиду <span class="u lg">{{SGE_REASON}}</span></div>

  <div class="row">
    поручается отключить <span class="u lg">{{SGE_APPLIANCES}}</span>
  </div>

  <div class="row">
    в квартире № <span class="u sm">{{SGE_APT}}</span>
    дома <span class="u sm">{{SGE_HOUSE}}</span>
    по ул. <span class="u lg">{{SGE_STREET}}</span>
  </div>

  <div class="row">
    у абонента <span class="u lg">{{OWNER_NAME}}</span>
  </div>

  <div class="sign-row" style="margin-top: 16px;">
    <div>Наряд выдал</div>
    <div class="sign-box">{{SGE_ISSUED_SIGNATURE}}</div>
    <div><span class="u md">{{SGE_ISSUED_BY}}</span></div>
  </div>

  <div class="sign-row">
    <div>Наряд получил</div>
    <div class="sign-box">{{SGE_RECEIVED_SIGNATURE}}</div>
    <div><span class="u md">{{SGE_RECEIVED_BY}}</span></div>
  </div>

  <div class="row" style="margin-top: 18px;">
    Мною <span class="u lg">{{SGE_EXECUTOR}}</span>
  </div>

  <div class="row">
    «<span class="u sm">{{SGE_OFF_DATETIME}}</span>»
    произведено отключение газоиспользующего оборудования
    <span class="u lg">{{SGE_OFF_DETAILS}}</span>
  </div>

  <div class="row">
    в квартире № <span class="u sm">{{SGE_APT}}</span>
    дома <span class="u sm">{{SGE_HOUSE}}</span>
    по ул. <span class="u lg">{{SGE_STREET}}</span>
  </div>

  <div class="sign-row" style="margin-top: 16px;">
    <div>Подписи: Представитель эксплуатационной организации</div>
    <div class="sign-box">{{SGE_OFF_EXP_SIGNATURE}}</div>
  </div>

  <div class="sign-row">
    <div>Ответственный квартиросъёмщик (абонент)</div>
    <div class="sign-box">{{SGE_OFF_OWNER_SIGNATURE}}</div>
  </div>

  <div class="row" style="margin-top: 16px;">
    Газоиспользующее оборудование подключено «<span class="u sm">{{SGE_ON_DATE}}</span>»
    представителем эксплуатационной организации <span class="u lg">{{SGE_ON_EXP}}</span>
  </div>

  <div class="row">
    по указанию <span class="u lg">{{SGE_ON_BY}}</span>
  </div>

  <div class="row">
    в квартире № <span class="u sm">{{SGE_APT}}</span>
    дома <span class="u sm">{{SGE_HOUSE}}</span>
    по ул. <span class="u lg">{{SGE_STREET}}</span>
  </div>

  <div class="row">
    у абонента <span class="u lg">{{OWNER_NAME}}</span>
  </div>

  <div class="sign-row" style="margin-top: 16px;">
    <div>Подписи: Представитель эксплуатационной организации</div>
    <div class="sign-box">{{SGE_ON_EXP_SIGNATURE}}</div>
  </div>

  <div class="sign-row">
    <div>Ответственный квартиросъёмщик (абонент)</div>
    <div class="sign-box">{{SGE_ON_OWNER_SIGNATURE}}</div>
  </div>

  <div class="row muted" style="margin-top: 14px;">
    Примечание: Акт-наряд составляется в двух экземплярах, один выдаётся абоненту, другой хранится в эксплуатационной организации.
  </div>
</div>

<!-- Экземпляр 2 -->
<div class="page">
  <div class="row muted">Форма 29-э</div>

  <div class="center" style="margin-top: 8px;">
    <img src="{{LOGO_SRC}}" style="height: 55px;" />
  </div>

  <div class="center">
    <div class="title">АКТ-НАРЯД № <span class="u sm">{{NUMBER}}</span></div>
    <div class="title">НА ОТКЛЮЧЕНИЕ ГАЗОИСПОЛЬЗУЮЩЕГО<br/>ОБОРУДОВАНИЯ ЖИЛЫХ ЗДАНИЙ</div>
    <div class="row">«<span class="u sm">{{ACT_DATE_FULL}}</span>»</div>
  </div>

  <div class="row">
    Представителю эксплуатационной организации
    <span class="u lg">{{SGE_EXP_FIO}}</span>
    <span class="u md">{{SGE_EXP_POSITION}}</span>
  </div>

  <div class="row">ввиду <span class="u lg">{{SGE_REASON}}</span></div>

  <div class="row">
    поручается отключить <span class="u lg">{{SGE_APPLIANCES}}</span>
  </div>

  <div class="row">
    в квартире № <span class="u sm">{{SGE_APT}}</span>
    дома <span class="u sm">{{SGE_HOUSE}}</span>
    по ул. <span class="u lg">{{SGE_STREET}}</span>
  </div>

  <div class="row">
    у абонента <span class="u lg">{{OWNER_NAME}}</span>
  </div>

  <div class="sign-row" style="margin-top: 16px;">
    <div>Наряд выдал</div>
    <div class="sign-box">{{SGE_ISSUED_SIGNATURE}}</div>
    <div><span class="u md">{{SGE_ISSUED_BY}}</span></div>
  </div>

  <div class="sign-row">
    <div>Наряд получил</div>
    <div class="sign-box">{{SGE_RECEIVED_SIGNATURE}}</div>
    <div><span class="u md">{{SGE_RECEIVED_BY}}</span></div>
  </div>

  <div class="row" style="margin-top: 18px;">
    Мною <span class="u lg">{{SGE_EXECUTOR}}</span>
  </div>

  <div class="row">
    «<span class="u sm">{{SGE_OFF_DATETIME}}</span>»
    произведено отключение газоиспользующего оборудования
    <span class="u lg">{{SGE_OFF_DETAILS}}</span>
  </div>

  <div class="row">
    в квартире № <span class="u sm">{{SGE_APT}}</span>
    дома <span class="u sm">{{SGE_HOUSE}}</span>
    по ул. <span class="u lg">{{SGE_STREET}}</span>
  </div>

  <div class="sign-row" style="margin-top: 16px;">
    <div>Подписи: Представитель эксплуатационной организации</div>
    <div class="sign-box">{{SGE_OFF_EXP_SIGNATURE}}</div>
  </div>

  <div class="sign-row">
    <div>Ответственный квартиросъёмщик (абонент)</div>
    <div class="sign-box">{{SGE_OFF_OWNER_SIGNATURE}}</div>
  </div>

  <div class="row" style="margin-top: 16px;">
    Газоиспользующее оборудование подключено «<span class="u sm">{{SGE_ON_DATE}}</span>»
    представителем эксплуатационной организации <span class="u lg">{{SGE_ON_EXP}}</span>
  </div>

  <div class="row">
    по указанию <span class="u lg">{{SGE_ON_BY}}</span>
  </div>

  <div class="row">
    в квартире № <span class="u sm">{{SGE_APT}}</span>
    дома <span class="u sm">{{SGE_HOUSE}}</span>
    по ул. <span class="u lg">{{SGE_STREET}}</span>
  </div>

  <div class="row">
    у абонента <span class="u lg">{{OWNER_NAME}}</span>
  </div>

  <div class="sign-row" style="margin-top: 16px;">
    <div>Подписи: Представитель эксплуатационной организации</div>
    <div class="sign-box">{{SGE_ON_EXP_SIGNATURE}}</div>
  </div>

  <div class="sign-row">
    <div>Ответственный квартиросъёмщик (абонент)</div>
    <div class="sign-box">{{SGE_ON_OWNER_SIGNATURE}}</div>
  </div>

  <div class="row muted" style="margin-top: 14px;">
    Примечание: Акт-наряд составляется в двух экземплярах, один выдаётся абоненту, другой хранится в эксплуатационной организации.
  </div>
</div>

</body>
</html>`;

// ---- Предписание ------------
export const HTML_SGE_PREDPISANIE = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Предписание</title>
<style>
  @page { size: A4; margin: 0cm; }
  body { font-family: "Times New Roman", serif; font-size: 14pt; margin: 0; padding: 0; }
  .page { padding: 1.5cm; }
  .center { text-align: center; }
  .row { margin-top: 10px; font-size: 12pt; line-height: 1.35; }
  .u { display:inline-block; border-bottom: 1px solid #000; padding: 0 6px; min-width: 220px; }
  .u.sm { min-width: 120px; }
  .u.md { min-width: 180px; }
  .u.lg { min-width: 320px; }
  .box { border: 1px solid #000; min-height: 220px; padding: 8px; margin-top: 10px; white-space: pre-wrap; }
  .title { font-weight: bold; margin-top: 10px; }
  .sign-row { margin-top: 14px; font-size: 12pt; display:flex; align-items:flex-end; gap: 10px; flex-wrap: wrap; }
  .sign-box { border-bottom: 1px solid #000; height: 55px; min-width: 240px; position: relative; flex: 1; }
  .sign-box img { position: absolute; left: 0; right: 0; margin: auto; max-height: 55px; max-width: 100%; top: 0; }
  .muted { font-size: 10pt; }
  .pb { page-break-after: always; }
</style>
</head>
<body>

<!-- Экземпляр 1 -->
<div class="page pb">
  <div class="row muted">Структурное подразделение</div>
  <div class="row muted">Управление по сбытовой деятельности</div>
  <div class="row muted">677005, Республика Саха (Якутия), г. Якутск, ул. П. Алексеева, 64 Б</div>

  <div class="center">
    <div class="title">ПРЕДПИСАНИЕ</div>
    <div class="title">за нарушение правил пользования газом в быту</div>
    <div class="row">«<span class="u sm">{{ACT_DATE_FULL}}</span>»</div>
  </div>

  <div class="row">
    по Вашему адресу при проведении проверки по адресу:
    <span class="u lg">{{OBJECT_ADDRESS}}</span>,
    Л/С <span class="u sm">{{PERSONAL_ACCOUNT}}</span>,
    <span class="u lg">{{OWNER_NAME}}</span>,
    <span class="u.md"></span>
    № телефона <span class="u sm">{{OWNER_PHONE}}</span>
  </div>

  <div class="row">
    Выявлены нарушения СП 62.13330.2011, не соответствующие нормативно-технической документации при эксплуатации газоиспользующего оборудования:
  </div>

  <div class="box">{{PRED_VIOLATIONS}}</div>

  <div class="row">
    В соответствии с подписанным договором Поставки газа, при выявлении Поставщиком газа нарушений ВДГО, предусмотрены штрафные санкции.
  </div>

  <div class="row">
    Предлагаем Вам в срок до «<span class="u sm">{{PRED_DEADLINE}}</span>» устранить выявленные нарушения (внести изменения в договор поставки газа),
    в противном случае будем вынуждены в соответствии с Правилами поставки газа №549 от 21.07.08г. приостановить/прекратить поставку газа.
  </div>

  <div class="row">
    По вопросам устранения нарушений обращаться в Вашу обслуживающую организацию или по адресу:
    г. Якутск ул. П. Алексеева, 64, тел 509-555
  </div>

  <div class="sign-row" style="margin-top: 18px;">
    <div>Предписание вручил: представитель организации</div>
    <div class="sign-box">{{PRED_REP_SIGNATURE}}</div>
    <div>/ <span class="u md">{{PRED_REP_FIO}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>абонент</div>
    <div class="sign-box">{{PRED_OWNER_SIGNATURE}}</div>
    <div>/ <span class="u md">{{OWNER_NAME}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>представитель абонента</div>
    <div class="sign-box">{{PRED_OWNER_REP_SIGNATURE}}</div>
    <div>/ <span class="u md">{{PRED_OWNER_REP_FIO}}</span> /</div>
  </div>

  <div class="row muted" style="margin-top: 14px;">
    Примечание: АКТ составляется в двух экземплярах, один выдаётся абоненту, другой хранится у поставщика газа.
  </div>
</div>

<!-- Экземпляр 2 -->
<div class="page">
  <div class="row muted">Структурное подразделение</div>
  <div class="row muted">Управление по сбытовой деятельности</div>
  <div class="row muted">677005, Республика Саха (Якутия), г. Якутск, ул. П. Алексеева, 64 Б</div>

  <div class="center">
    <div class="title">ПРЕДПИСАНИЕ</div>
    <div class="title">за нарушение правил пользования газом в быту</div>
    <div class="row">«<span class="u sm">{{ACT_DATE_FULL}}</span>»</div>
  </div>

  <div class="row">
    по Вашему адресу при проведении проверки по адресу:
    <span class="u lg">{{OBJECT_ADDRESS}}</span>,
    Л/С <span class="u sm">{{PERSONAL_ACCOUNT}}</span>,
    <span class="u lg">{{OWNER_NAME}}</span>,
    № телефона <span class="u sm">{{OWNER_PHONE}}</span>
  </div>

  <div class="row">
    Выявлены нарушения СП 62.13330.2011, не соответствующие нормативно-технической документации при эксплуатации газоиспользующего оборудования:
  </div>

  <div class="box">{{PRED_VIOLATIONS}}</div>

  <div class="row">
    В соответствии с подписанным договором Поставки газа, при выявлении Поставщиком газа нарушений ВДГО, предусмотрены штрафные санкции.
  </div>

  <div class="row">
    Предлагаем Вам в срок до «<span class="u sm">{{PRED_DEADLINE}}</span>» устранить выявленные нарушения (внести изменения в договор поставки газа),
    в противном случае будем вынуждены в соответствии с Правилами поставки газа №549 от 21.07.08г. приостановить/прекратить поставку газа.
  </div>

  <div class="row">
    По вопросам устранения нарушений обращаться в Вашу обслуживающую организацию или по адресу:
    г. Якутск ул. П. Алексеева, 64, тел 509-555
  </div>

  <div class="sign-row" style="margin-top: 18px;">
    <div>Предписание вручил: представитель организации</div>
    <div class="sign-box">{{PRED_REP_SIGNATURE}}</div>
    <div>/ <span class="u md">{{PRED_REP_FIO}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>абонент</div>
    <div class="sign-box">{{PRED_OWNER_SIGNATURE}}</div>
    <div>/ <span class="u md">{{OWNER_NAME}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>представитель абонента</div>
    <div class="sign-box">{{PRED_OWNER_REP_SIGNATURE}}</div>
    <div>/ <span class="u md">{{PRED_OWNER_REP_FIO}}</span> /</div>
  </div>

  <div class="row muted" style="margin-top: 14px;">
    Примечание: АКТ составляется в двух экземплярах, один выдаётся абоненту, другой хранится у поставщика газа.
  </div>
</div>

</body>
</html>`;

// -------- АКТ ААД проверки газицифированного обьекта -------
export const HTML_AAD = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Акт ААД проверки газифицированного объекта</title>
<style>
  @page { size: A4; margin: 0cm; }
  body { font-family: "Times New Roman", serif; font-size: 14pt; margin: 0; padding: 0; }
  .page { padding: 1.5cm; }
  .center { text-align: center; }
  .muted { font-size: 10pt; }
  .row { margin-top: 10px; font-size: 12pt; line-height: 1.35; }
  .u { display:inline-block; border-bottom: 1px solid #000; padding: 0 6px; min-width: 220px; }
  .u.sm { min-width: 120px; }
  .u.md { min-width: 180px; }
  .u.lg { min-width: 320px; }
  .title { font-weight: bold; margin-top: 8px; }
  .box { border: 1px solid #000; min-height: 120px; padding: 8px; white-space: pre-wrap; }
  .sign-row { margin-top: 14px; font-size: 12pt; display:flex; align-items:flex-end; gap: 10px; flex-wrap: wrap; }
  .sign-box { border-bottom: 1px solid #000; height: 55px; min-width: 240px; position: relative; flex: 1; }
  .sign-box img { position: absolute; left: 0; right: 0; margin: auto; max-height: 55px; max-width: 100%; top: 0; }
  table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12pt; }
  td, th { border: 1px solid #000; padding: 6px; vertical-align: top; }
  .pb { page-break-after: always; }
</style>
</head>
<body>

<!-- Экземпляр 1 -->
<div class="page pb">
  <div class="row muted">Форма 29-э</div>

  <div class="row muted">Структурное подразделение</div>
  <div class="row muted"><b>Управление по сбытовой деятельности</b></div>
  <div class="row muted">677005, Республика Саха (Якутия), г. Якутск, ул. П. Алексеева, 64 Б</div>

  <div class="center" style="margin-top: 8px;">
    <img src="{{LOGO_SRC}}" style="height: 55px;" />
  </div>

  <div class="center">
    <div class="title">АКТ</div>
    <div class="row">
      <b>ААД</b>
      &nbsp;&nbsp;л/с <span class="u sm">{{PERSONAL_ACCOUNT}}</span>
    </div>
    <div class="row">
      проверки газифицированного объекта по адресу:
      <div style="margin-top:6px;"><span class="u lg">{{OBJECT_ADDRESS}}</span></div>
    </div>
  </div>

  <div class="row">
    Согласно Постановлению Правительства РФ от 21 июля 2008г. №549 «О порядке поставки газа для обеспечения коммунально-бытовых нужд граждан»
  </div>

  <div class="row">
    Мной, представителем организации УСД АО «Сахатранснефтегаз»
    <span class="u lg">{{AAD_SUPPLIER_REP_FIO}}</span>
  </div>

  <div class="row">
    в присутствии абонента: Ф.И.О (полн).:
    <span class="u lg">{{OWNER_NAME}}</span>
  </div>
  <div class="row">
    реквизиты документа, удостоверяющего личность
    <span class="u lg">{{AAD_OWNER_DOC}}</span>
  </div>

  <div class="row">
    представителя абонента: Ф.И.О.(полн)
    <span class="u lg">{{AAD_OWNER_REP_FIO}}</span>
  </div>
  <div class="row">
    реквизиты документа, удостоверяющего личность
    <span class="u lg">{{AAD_OWNER_REP_DOC}}</span>
  </div>

  <div class="row">
    составлен настоящий акт о том, что «<span class="u sm">{{ACT_DATE_FULL}}</span>»,
    <span class="u sm">{{AAD_HOUR}}</span> час.
    <span class="u sm">{{AAD_MIN}}</span> мин.
  </div>

  <div class="row"><b>выявлено:</b></div>
  <div class="box">{{AAD_FOUND}}</div>

  <div class="row"><b>показания счетчиков:</b></div>

  <table>
    <thead>
      <tr>
        <th style="width:6%;">№</th>
        <th style="width:22%;">Тип (G)</th>
        <th style="width:22%;">Заводской №</th>
        <th style="width:20%;">Показания (м³)</th>
        <th style="width:30%;">Пломба № / цвет</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="center">1</td>
        <td>G {{AAD1_TYPE}}</td>
        <td>{{AAD1_NUMBER}}</td>
        <td>{{AAD1_READING}}</td>
        <td>{{AAD1_SEAL}} / {{AAD1_SEAL_COLOR}}</td>
      </tr>
      <tr>
        <td colspan="5">газовое оборудование: {{AAD1_EQUIPMENT}}</td>
      </tr>
      <tr>
        <td colspan="5">
          Произведен контрольный замер отапливаемых площадей:
          жилая площадь {{AAD1_LIVING_AREA}} м²,
          нежилая площадь {{AAD1_NONLIVING_AREA}} м²,
          количество {{AAD1_PEOPLE}} чел.
        </td>
      </tr>

      <tr>
        <td class="center">2</td>
        <td>G {{AAD2_TYPE}}</td>
        <td>{{AAD2_NUMBER}}</td>
        <td>{{AAD2_READING}}</td>
        <td>{{AAD2_SEAL}} / {{AAD2_SEAL_COLOR}}</td>
      </tr>
      <tr>
        <td colspan="5">газовое оборудование: {{AAD2_EQUIPMENT}}</td>
      </tr>
      <tr>
        <td colspan="5">
          Произведен контрольный замер отапливаемых площадей:
          жилая площадь {{AAD2_LIVING_AREA}} м²,
          нежилая площадь {{AAD2_NONLIVING_AREA}} м²,
          количество {{AAD2_PEOPLE}} чел.
        </td>
      </tr>
    </tbody>
  </table>

  <div class="row">
    Особое мнение абонента:
    <span class="u lg">{{AAD_OWNER_OPINION}}</span>
  </div>

  <div class="row">
    Примечание:
    <span class="u lg">{{AAD_NOTE}}</span>
  </div>

  <div class="row" style="margin-top: 16px;"><b>Подписи сторон:</b></div>

  <div class="sign-row">
    <div>представитель организации</div>
    <div class="sign-box">{{AAD_SUPPLIER_SIGNATURE}}</div>
    <div>/ <span class="u md">{{AAD_SUPPLIER_REP_FIO}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>абонент</div>
    <div class="sign-box">{{AAD_OWNER_SIGNATURE}}</div>
    <div>/ <span class="u md">{{OWNER_NAME}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>представитель абонента</div>
    <div class="sign-box">{{AAD_OWNER_REP_SIGNATURE}}</div>
    <div>/ <span class="u md">{{AAD_OWNER_REP_FIO}}</span> /</div>
  </div>

  <div class="row" style="margin-top: 14px;">
    При проведении проверки и составлении акта присутствовал: Ф.И.О.:
    <span class="u lg">{{AAD_WITNESS_FIO}}</span>
  </div>
  <div class="row">
    реквизиты документа, удостоверяющего личность
    <span class="u lg">{{AAD_WITNESS_DOC}}</span>
  </div>

  <div class="row muted" style="margin-top: 14px;">
    Примечание: АКТ составляется в двух экземплярах, один из которых выдаётся на руки абонента, другой хранится у поставщика газа.
  </div>
</div>

<!-- Экземпляр 2 -->
<div class="page">
  <div class="row muted">Форма 29-э</div>

  <div class="row muted">Структурное подразделение</div>
  <div class="row muted"><b>Управление по сбытовой деятельности</b></div>
  <div class="row muted">677005, Республика Саха (Якутия), г. Якутск, ул. П. Алексеева, 64 Б</div>

  <div class="center" style="margin-top: 8px;">
    <img src="{{LOGO_SRC}}" style="height: 55px;" />
  </div>

  <div class="center">
    <div class="title">АКТ</div>
    <div class="row">
      <b>ААД</b>
      &nbsp;&nbsp;л/с <span class="u sm">{{PERSONAL_ACCOUNT}}</span>
    </div>
    <div class="row">
      проверки газифицированного объекта по адресу созданию:
      <div style="margin-top:6px;"><span class="u lg">{{OBJECT_ADDRESS}}</span></div>
    </div>
  </div>

  <div class="row">
    Согласно Постановлению Правительства РФ от 21 июля 2008г. №549 «О порядке поставки газа для обеспечения коммунально-бытовых нужд граждан»
  </div>

  <div class="row">
    Мной, представителем организации УСД АО «Сахатранснефтегаз»
    <span class="u lg">{{AAD_SUPPLIER_REP_FIO}}</span>
  </div>

  <div class="row">
    в присутствии абонента: Ф.И.О (полн).:
    <span class="u lg">{{OWNER_NAME}}</span>
  </div>
  <div class="row">
    реквизиты документа, удостоверяющего личность
    <span class="u lg">{{AAD_OWNER_DOC}}</span>
  </div>

  <div class="row">
    представителя абонента: Ф.И.О.(полн)
    <span class="u lg">{{AAD_OWNER_REP_FIO}}</span>
  </div>
  <div class="row">
    реквизиты документа, удостоверяющего личность
    <span class="u lg">{{AAD_OWNER_REP_DOC}}</span>
  </div>

  <div class="row">
    составлен настоящий акт о том, что «<span class="u sm">{{ACT_DATE_FULL}}</span>»,
    <span class="u sm">{{AAD_HOUR}}</span> час.
    <span class="u sm">{{AAD_MIN}}</span> мин.
  </div>

  <div class="row"><b>выявлено:</b></div>
  <div class="box">{{AAD_FOUND}}</div>

  <div class="row"><b>показания счетчиков:</b></div>

  <table>
    <thead>
      <tr>
        <th style="width:6%;">№</th>
        <th style="width:22%;">Тип (G)</th>
        <th style="width:22%;">Заводской №</th>
        <th style="width:20%;">Показания (м³)</th>
        <th style="width:30%;">Пломба № / цвет</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="center">1</td>
        <td>G {{AAD1_TYPE}}</td>
        <td>{{AAD1_NUMBER}}</td>
        <td>{{AAD1_READING}}</td>
        <td>{{AAD1_SEAL}} / {{AAD1_SEAL_COLOR}}</td>
      </tr>
      <tr>
        <td colspan="5">газовое оборудование: {{AAD1_EQUIPMENT}}</td>
      </tr>
      <tr>
        <td colspan="5">
          Произведен контрольный замер отапливаемых площадей:
          жилая площадь {{AAD1_LIVING_AREA}} м²,
          нежилая площадь {{AAD1_NONLIVING_AREA}} м²,
          количество {{AAD1_PEOPLE}} чел.
        </td>
      </tr>

      <tr>
        <td class="center">2</td>
        <td>G {{AAD2_TYPE}}</td>
        <td>{{AAD2_NUMBER}}</td>
        <td>{{AAD2_READING}}</td>
        <td>{{AAD2_SEAL}} / {{AAD2_SEAL_COLOR}}</td>
      </tr>
      <tr>
        <td colspan="5">газовое оборудование: {{AAD2_EQUIPMENT}}</td>
      </tr>
      <tr>
        <td colspan="5">
          Произведен контрольный замер отапливаемых площадей:
          жилая площадь {{AAD2_LIVING_AREA}} м²,
          нежилая площадь {{AAD2_NONLIVING_AREA}} м²,
          количество {{AAD2_PEOPLE}} чел.
        </td>
      </tr>
    </tbody>
  </table>

  <div class="row">
    Особое мнение абонента:
    <span class="u lg">{{AAD_OWNER_OPINION}}</span>
  </div>

  <div class="row">
    Примечание:
    <span class="u lg">{{AAD_NOTE}}</span>
  </div>

  <div class="row" style="margin-top: 16px;"><b>Подписи сторон:</b></div>

  <div class="sign-row">
    <div>представитель организации</div>
    <div class="sign-box">{{AAD_SUPPLIER_SIGNATURE}}</div>
    <div>/ <span class="u md">{{AAD_SUPPLIER_REP_FIO}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>абонент</div>
    <div class="sign-box">{{AAD_OWNER_SIGNATURE}}</div>
    <div>/ <span class="u md">{{OWNER_NAME}}</span> /</div>
  </div>

  <div class="sign-row">
    <div>представитель абонента</div>
    <div class="sign-box">{{AAD_OWNER_REP_SIGNATURE}}</div>
    <div>/ <span class="u md">{{AAD_OWNER_REP_FIO}}</span> /</div>
  </div>

  <div class="row" style="margin-top: 14px;">
    При проведении проверки и составлении акта присутствовал: Ф.И.О.:
    <span class="u lg">{{AAD_WITNESS_FIO}}</span>
  </div>
  <div class="row">
    реквизиты документа, удостоверяющего личность
    <span class="u lg">{{AAD_WITNESS_DOC}}</span>
  </div>

  <div class="row muted" style="margin-top: 14px;">
    Примечание: АКТ составляется в двух экземплярах, один из которых выдаётся на руки абонента, другой хранится у поставщика газа.
  </div>
</div>

</body>
</html>`;
