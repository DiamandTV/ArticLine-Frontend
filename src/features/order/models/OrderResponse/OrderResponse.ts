export enum OrderResponseStatus {
    DELIVERY_TIME_NOT_DECIDED,
    COMPANY_STATS_STEP_RANGE_OUT,
    DELAY_TIME_FREEZED
}

export type OrderResponseType = 'DELIVERY-TIME-NOT-DECIDED' | 'COMPANY-STATUS-STEP-RANGE-OUT' | 'DELAY-TIME-FREEZED'

export const OrderResponseMapStatusType:Record<OrderResponseType,OrderResponseStatus> = {
    'DELIVERY-TIME-NOT-DECIDED':OrderResponseStatus.DELIVERY_TIME_NOT_DECIDED,
    'COMPANY-STATUS-STEP-RANGE-OUT':OrderResponseStatus.COMPANY_STATS_STEP_RANGE_OUT,
    'DELAY-TIME-FREEZED':OrderResponseStatus.DELAY_TIME_FREEZED
}