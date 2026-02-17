import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonButton,
  IonIcon,
  IonToast,
} from '@ionic/react';
import { checkmarkDoneOutline } from 'ionicons/icons';

import { useActsStore } from '../../store/actsStore';
import { useAuthStore } from '../../store/authStore';
import { useInvoiceStore } from '../../store/invoiceStore';
import { invoicesApi } from '../../api/invoicesApi';
import { ACT_TEMPLATES } from '../../features/acts/configs/registry';
import { GenericForm } from '../../features/acts/components/GenericForm';
import { normalizeInvoice } from '../../domain/normalizers';

const isPlainObject = (v: any) => v && typeof v === 'object' && !Array.isArray(v);

const toDetailsObject = (details: any): Record<string, any> => {
  if (!details) return {};
  if (Array.isArray(details)) {
    const firstObj = details.find((x) => isPlainObject(x));
    return (firstObj as any) || {};
  }
  if (isPlainObject(details)) {
    // Иногда приходит объект с ключом "0": { 0: {...}, id, type, ... }
    const maybe0 = (details as any)['0'];
    if (isPlainObject(maybe0)) {
      const rest: any = { ...(details as any) };
      delete rest['0'];
      return { ...(maybe0 as any), ...rest };
    }
    return details as any;
  }
  return {};
};

const normalizeDataUrl = (val: any): string => {
  if (!val) return '';
  if (typeof val === 'string') {
    const s = val.trim();
    if (!s) return '';
    if (s.startsWith('data:image')) return s;
    // Иногда приходит как чистый base64
    if (/^[A-Za-z0-9+/=]+$/.test(s) && s.length > 100) {
      return `data:image/png;base64,${s}`;
    }
  }
  return '';
};

export const FinalActPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const token = useAuthStore((s) => s.token);

  const { saveAct, clearCurrentAct, loadActDraft } = useActsStore();
  // id в сторе может быть number, а из URL — string
  const invoiceFromStore = useInvoiceStore((s) => s.list.find((i) => String(i.id) === String(id)));

  const [fetchedInvoice, setFetchedInvoice] = useState<any>(null);
  const [draftAct, setDraftAct] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const template = ACT_TEMPLATES['work_completed'];

  useEffect(() => {
    clearCurrentAct();
  }, [clearCurrentAct]);

  // Подтягиваем заявку (если не было в сторе)
  useEffect(() => {
    const hasData = invoiceFromStore || fetchedInvoice;
    if (!hasData && token && id) {
      setLoading(true);
      invoicesApi
        .fetchAll(token)
        .then((data) => {
          if (Array.isArray(data)) {
            const found = data.find((i: any) => String(i.id) === String(id));
            if (found) setFetchedInvoice(found);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [invoiceFromStore, fetchedInvoice, token, id]);

  // ВАЖНО: для финального акта НЕЛЬЗЯ генерить act_number на фронте.
  // Берём/создаём черновик у бэка: он вернёт уникальный act_number и id.
  useEffect(() => {
    if (!token || !id) return;
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const act = await loadActDraft(token, id, 'work_completed');
        if (!cancelled) setDraftAct(act);
      } catch (e: any) {
        if (!cancelled) setErrorToast(e?.message || 'Не удалось получить черновик акта выполненных работ');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, id, loadActDraft]);

  const cleanInvoice = useMemo(() => {
    const raw = invoiceFromStore || fetchedInvoice;
    return raw ? normalizeInvoice(raw) : null;
  }, [invoiceFromStore, fetchedInvoice]);

  const initialData = useMemo(() => {
    if (!template) return null;

    const inv = cleanInvoice;
    const act = draftAct;
    const d = toDetailsObject(act?.details);

    // act_date может прийти как ISO, приводим к YYYY-MM-DD
    const actDateRaw = act?.act_date || d?.act_date || new Date().toISOString().split('T')[0];
    const actDate = String(actDateRaw).slice(0, 10);

    return {
      // номер акта всегда от бэка
      act_number: act?.act_number || d?.act_number || '',
      act_date: actDate,
      type: 'work_completed',

      lic: d?.lic || act?.lic || inv?.lic || '',
      owner_name: d?.owner_name || act?.owner_name || inv?.owner_name || '',
      owner_phone: d?.owner_phone || act?.owner_phone || inv?.owner_phone || '',
      object_address: d?.object_address || act?.object_address || inv?.object_address || '',

      work_description: d?.work_description || 'Работы выполнены в полном объеме',
      amount: d?.amount ?? 0,
      warranty: d?.warranty || '12',

      technician_name: d?.technician_name || act?.technician_name || 'Слесарь СТГО',
      technician_signature: d?.technician_signature || '',
      owner_signature: d?.owner_signature || '',
      photo_result: d?.photo_result || '',
    };
  }, [template, cleanInvoice, draftAct]);

  const handleSave = async (data: any) => {
    if (!token) return;

    try {
      if (!draftAct?.id || !draftAct?.act_number) {
        throw new Error('Не найден черновик финального акта (нет id/номера). Обнови страницу и попробуй снова.');
      }

      const details = {
        act_number: draftAct.act_number,
        act_date: data.act_date,

        lic: data.lic,
        owner_name: data.owner_name,
        owner_phone: data.owner_phone,
        object_address: data.object_address,

        work_description: data.work_description,
        amount: Number(data.amount) || 0,
        warranty: String(data.warranty || ''),

        photo_result: normalizeDataUrl(data.photo_result) || data.photo_result || '',
        technician_name: data.technician_name,
        technician_signature: normalizeDataUrl(data.technician_signature) || data.technician_signature || '',
        owner_signature: normalizeDataUrl(data.owner_signature) || data.owner_signature || '',
      };

      const payload = {
        // если не отправить id — бэк попытается INSERT и можно словить duplicate key
        id: draftAct.id,
        invoice_id: id,
        type: 'work_completed',
        act_number: draftAct.act_number,
        act_date: details.act_date,
        status: draftAct.status || 'draft',
        title: template?.name || 'Акт выполненных работ',
        document_scan_path: draftAct.document_scan_path || '',
        details,

        // совместимость (как в примере от бэка)
        lic: details.lic,
        owner_name: details.owner_name,
        owner_phone: details.owner_phone,
        object_address: details.object_address,
        technician_name: details.technician_name,
      };

      console.log('🚀 Sending WORK_COMPLETED Payload:', payload);

      const result = await saveAct(token, payload);
      console.log('✅ Saved success:', result);

      setIsSaved(true);
      setShowToast(true);
    } catch (e: any) {
      console.error('❌ Save Exception:', e);
      setErrorToast(e?.message || 'Не удалось сохранить акт');
    }
  };

  const handleCloseInvoice = async () => {
    if (!token) return;
    if (!window.confirm('Вы уверены, что хотите закрыть заявку?')) return;

    try {
      await invoicesApi.closeInvoice(token, id);
      alert('Заявка успешно закрыта!');
      history.replace('/app/invoices');
    } catch (e) {
      console.error(e);
      alert('Не удалось закрыть заявку');
    }
  };

  const showForm = !loading && template && initialData;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/app/invoices/${id}/acts`} text="" color="dark" />
          </IonButtons>
          <IonTitle>Завершение</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen style={{ '--background': '#f7fafc' }}>
        {loading && (
          <div className="ion-padding ion-text-center" style={{ marginTop: '50px' }}>
            <IonSpinner />
            <p style={{ color: '#888' }}>Загрузка...</p>
          </div>
        )}

        {!loading && !template && (
          <div className="ion-padding ion-text-center" style={{ marginTop: '20px', color: 'red' }}>
            Ошибка: Шаблон 'work_completed' не найден.
          </div>
        )}

        {showForm && (
          <div style={{ padding: '16px', paddingBottom: '120px' }}>
            <GenericForm key="final-act-form" template={template} initialData={initialData} onSave={handleSave} />
          </div>
        )}

        {!loading && template && !initialData && (
          <div className="ion-padding ion-text-center" style={{ marginTop: '20px', color: '#666' }}>
            Заявка не найдена. Вернитесь назад и откройте акты заново.
          </div>
        )}

        {isSaved && (
          <div style={{ position: 'fixed', bottom: '30px', left: '16px', right: '16px', zIndex: 1001 }}>
            <IonButton
              expand="block"
              color="success"
              onClick={handleCloseInvoice}
              style={{
                height: '56px',
                fontWeight: 'bold',
                '--border-radius': '14px',
                '--box-shadow': '0 8px 20px rgba(72, 187, 120, 0.4)',
              }}
            >
              <IonIcon slot="start" icon={checkmarkDoneOutline} />
              ЗАКРЫТЬ ЗАЯВКУ
            </IonButton>
          </div>
        )}

        <IonToast
          isOpen={showToast}
          message="Акт сохранен! Теперь закройте заявку."
          duration={3000}
          onDidDismiss={() => setShowToast(false)}
          color="primary"
        />
        <IonToast
          isOpen={!!errorToast}
          message={errorToast || ''}
          duration={3500}
          onDidDismiss={() => setErrorToast(null)}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};
