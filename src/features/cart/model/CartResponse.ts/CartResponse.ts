export enum CartResponseStatus{
    MAX_CART_LIMIT_REACHED,
    COMPANY_PURCHASE_FORBID
}

export type CartResponseType =
    'MAX-CART-LIMIT-REACHED' | 
    'COMPANY-PURCHASE-FORBID'

export const CartResponseMapStatusType:Record<CartResponseType,CartResponseStatus> = {
    'MAX-CART-LIMIT-REACHED':CartResponseStatus.MAX_CART_LIMIT_REACHED,
    'COMPANY-PURCHASE-FORBID':CartResponseStatus.COMPANY_PURCHASE_FORBID
}