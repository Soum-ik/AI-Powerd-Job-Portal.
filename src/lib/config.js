let apiUrl;

if (process.env.NODE_ENV === "production") {
  apiUrl = process.env.NEXT_PUBLIC_PROURL;
} else {
  apiUrl = process.env.NEXT_PUBLIC_DEVURL;
}
export { apiUrl };
