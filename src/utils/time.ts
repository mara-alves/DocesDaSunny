export const secondsToHHmm = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  return (
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0")
  );
};

export const secondsToPrettyString = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  return (
    (hours > 0 ? hours.toString() + " h " : "") +
    (minutes > 0 ? minutes.toString() + " min" : "")
  );
};
