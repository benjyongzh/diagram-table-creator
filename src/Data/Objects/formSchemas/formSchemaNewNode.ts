import { z } from "zod";

const formSchemaNewNode = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

export default formSchemaNewNode;
