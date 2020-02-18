export const isMobile = () => {
  return /(Android|iOS|iPhone|iPod|iPad)/i.test(navigator.userAgent);
};

let tapedTwice = false;

export const doubleTap = () => {
  if (!tapedTwice) {
    tapedTwice = true;
    setTimeout(() => {
      tapedTwice = false;
    }, 300);
    return false;
  }
  return true;
};
