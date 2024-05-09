import { z } from "zod";

const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
});

export { jobFilterSchema };
