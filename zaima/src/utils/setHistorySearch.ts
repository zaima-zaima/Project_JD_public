export function setHistory(keywords: string) {
  let history = localStorage.getItem("history") as string | string[];
  if (!history) {
    history = JSON.stringify([]);
  }

  history = JSON.parse(history as string) as Array<string>;

  history.unshift(keywords);

  history = Array.from(new Set(history));

  if (history.length > 20) {
    history = history.slice(0, 20);
  }

  const historyStr = JSON.stringify(history);

  localStorage.setItem("history", historyStr);
}

export function getHistory(): string[] {
  let history = localStorage.getItem("history") as unknown as string;

  if (!history) {
    history = JSON.stringify([]);
  }

  return JSON.parse(history);
}
