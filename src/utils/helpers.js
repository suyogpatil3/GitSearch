export const sortDescending = (data, identifier) =>
  data?.slice().sort((a, b) => (b[identifier] - a[identifier] > 0 ? 1 : -1));

export const countFormatter = (count) => {
    if (count < 999) {
      return count
    }
    else if (count >= 1000) {
      const number = (count / 1000).toFixed(1)
      return `${number}k`
    }
  }