import { CreateToken } from "./jwtHelper";

export async function TokenCookie(email) {
  let token = await CreateToken(email);

  return {
    "Set-Cookie": `token=${token}; Max-age = 2400; Secure; HttpOnly; path=/; SameSite=Strict`,
  };
}
