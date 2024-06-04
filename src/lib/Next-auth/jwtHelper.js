import { SignJWT, jwtVerify } from "jose";

export async function CreateToken(req) {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  let token = await new SignJWT({ email: req["email"], id: req["id"] })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.JWT_ISSUER)
    .setExpirationTime(process.env.JWT_EXPIRATION)
    .sign(secret);
  return token;
}

export async function VerifyToken(token) {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  let VerifyToken = await jwtVerify(token, secret);
   
  return VerifyToken["payload"];
}

