export const formatToday = () => {
  return new Date()
    .toLocaleDateString("ko-KR")
    .replaceAll(". ", "-")
    .slice(0, -1);
};

export const getKSTDate = () => {
  return new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
};
