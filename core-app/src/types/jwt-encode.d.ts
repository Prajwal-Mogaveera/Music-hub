declare module "jwt-encode" {
  function jwtEncode(payload: object, secret: string): string
  export default jwtEncode
}
