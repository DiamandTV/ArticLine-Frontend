import { z } from "zod";

export const entityAddressDefaultFieldsSchema = z.object({
    entity_address:z.coerce.number()
})

export type EntityAddressDefaultFields = z.infer<typeof entityAddressDefaultFieldsSchema>