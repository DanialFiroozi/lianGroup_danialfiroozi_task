export const replaceCharWithDigit = (input: EventTarget & HTMLInputElement) => {
  input.value = input.value.replace(/[^0-9]/g, "");
};

export const replaceFaChars = (input: EventTarget & HTMLInputElement) => {
  input.value = input.value.replace(/[\u0600-\u06FF]/g, "");
};
