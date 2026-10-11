export const replaceCharWithDigit = (input: EventTarget & HTMLInputElement) => {
  input.value = input.value.replace(/[^0-9]/g, "");
};

export const replaceFaChars = (input: EventTarget & HTMLInputElement) => {
  input.value = input.value.replace(/[\u0600-\u06FF]/g, "");
};

export const alphabeticalSorting = (rowA: any, rowB: any, columnId: string) => {
  const a = String(rowA.getValue(columnId) ?? "");
  const b = String(rowB.getValue(columnId) ?? "");

  return a.localeCompare(b, "fa", {
    sensitivity: "base",
    numeric: true,
  });
};
