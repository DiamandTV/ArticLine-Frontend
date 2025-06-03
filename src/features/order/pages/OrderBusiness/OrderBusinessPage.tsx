import { PaddingView } from "@views/PaddingView";
import { OrderBusinessListPage } from "./OrderBusinessListPage";
import { createSearchParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

type OrderBusinessTabEventKeyType = 'NEW' | 'PROGRESS' | 'DELIVERED' | 'CANCELED';

const tabClasses = (active: boolean) =>
  `px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 
   ${active 
      ? 'bg-blue-600 text-white shadow-md' 
      //? 'bg-primary-a40 text-white shadow-md' 
      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'}`;

export function OrderBusinessPage() {
  const navigator = useNavigate();
  const [eventKey, setEventKey] = useState<OrderBusinessTabEventKeyType>('NEW');

  useEffect(() => {
    switch (eventKey) {
      case 'NEW':
        navigator({
          pathname: '',
          search: createSearchParams({
            status: 'NOT ACCEPTED'
          }).toString()
        });
        break;
      case 'PROGRESS':
        navigator({
          pathname: '',
          search: createSearchParams({
            not_status__in: 'NOT ACCEPTED,DELIVERED'
          }).toString()
        });
        break;
      case 'DELIVERED':
        navigator({
          pathname: '',
          search: createSearchParams({
            status: 'DELIVERED'
          }).toString()
        });
        break;
      case 'CANCELED':
        navigator({
          pathname: '',
          search: createSearchParams({
            status: 'CANCELED'
          }).toString()
        });
        break;
    }
  }, [eventKey]);

  return (
    <PaddingView className="block h-full px-0">
      {/* Custom pills nav */}
      <div className="flex flex-row flex-wrap justify-center gap-2 mb-6 ">
        {(['NEW', 'PROGRESS', 'DELIVERED','CANCELED'] as OrderBusinessTabEventKeyType[]).map((key) => (
          <button
            key={key}
            onClick={() => setEventKey(key)}
            className={tabClasses(eventKey === key)}
          >
            {{
              NEW: 'New Orders',
              PROGRESS: 'In Preparation',
              DELIVERED: 'Delivered',
              CANCELED: 'Canceled'
            }[key]}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {eventKey === 'NEW' && <OrderBusinessListPage />}
        {eventKey === 'PROGRESS' && <OrderBusinessListPage />}
        {eventKey === 'DELIVERED' && <OrderBusinessListPage />}
        {eventKey === 'CANCELED' && <OrderBusinessListPage/>}
      </div>
    </PaddingView>
  );
}
