const zod = require("zod");

const userSchema = zod.object({
  fullName: zod.string(),
  userName: zod.string().min(3).max(30),
  email: zod.string().email({ message: "Invalid email address" }), // Email validation
  password: zod
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must not exceed 128 characters" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, {
      message:
        "Password must contain at least one special character (@$!%*?&#)",
    }),
});

module.exports = userSchema;
