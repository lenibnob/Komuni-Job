export function isAlpha(str) {
    return /^[A-Za-z ]+$/.test(str);
  }

export  function isNumber(str) {
    return /^[0-9]+$/.test(str);
  }

export  function isEmail(str) {
    return /^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|live\.com|msn\.com|icloud\.com|me\.com|mac\.com|protonmail\.com|pm\.me|zoho\.com|mail\.com|aol\.com)$/i.test(str);
  }
