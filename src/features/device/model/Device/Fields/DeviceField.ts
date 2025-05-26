import { z } from "zod";

export const deviceInfoFieldsSchema = z.object({

})

export type DeviceInfoFieldsType = z.infer<typeof deviceInfoFieldsSchema>