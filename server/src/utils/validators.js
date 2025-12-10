export function isStrongPassword(pw) {
  // min 8, letters+numbers
  return typeof pw === 'string' && pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
}

export function isUsernameValid(name) {
  return typeof name === 'string' && /^[a-zA-Z0-9_]{3,20}$/.test(name);
}