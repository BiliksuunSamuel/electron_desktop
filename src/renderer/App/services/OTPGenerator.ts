export function GenerateOTP() {
  return Math.floor(Math.random() * Math.pow(10, 8)).toString();
}
