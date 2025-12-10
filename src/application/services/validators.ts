import { ApiError } from "@/src/entities/errors/auth_errors";

export function validateInputString(
  input: string | undefined | null,
  name: string
) {
  if (!input || input.trim().length === 0) {
    throw new ApiError(400, `${name} is required`);
  }
}
