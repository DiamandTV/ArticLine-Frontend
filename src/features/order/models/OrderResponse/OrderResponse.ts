export enum OrderResponseStatus {
    DELIVERY_TIME_NOT_DECIDED,
    COMPANY_STATS_STEP_RANGE_OU
}

export type OrderResponseType = 'DELIVERY-TIME-NOT-DECIDED' | 'COMPANY-STATUS-STEP-RANGE-OUT'

export const OrderResponseMapStatusType:Record<OrderResponseType,OrderResponseStatus> = {
    'DELIVERY-TIME-NOT-DECIDED':OrderResponseStatus.DELIVERY_TIME_NOT_DECIDED,
    'COMPANY-STATUS-STEP-RANGE-OUT':OrderResponseStatus.COMPANY_STATS_STEP_RANGE_OU
}