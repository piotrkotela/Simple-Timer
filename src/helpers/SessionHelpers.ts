export type Session = {
  times: number[];
};

export function saveSessionsToLocalStorage(sessions: Session[]) {
  const sessionString = JSON.stringify(sessions);
  localStorage.setItem("sessions", sessionString);
}

export function loadSessionsFromLocalStorage(): Session[] {
  const sessionString = localStorage.getItem("sessions");
  if (sessionString) {
    return JSON.parse(sessionString);
  } else {
    return [{times: []}];
  }
}

export const initialSessions: Session[] = Array.from({ length: 10 }, () => {
  return {
    times: [],
  };
});
