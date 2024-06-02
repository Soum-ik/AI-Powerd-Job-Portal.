import { z } from "zod";

const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
});

const userAuthSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // specify the path where the error should be reported
  });

const loginCheckerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export { jobFilterSchema, userAuthSchema, loginCheckerSchema, validateEmail };
