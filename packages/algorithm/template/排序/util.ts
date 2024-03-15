export function arraysEqual(ax: any[], ay: any[]): boolean {
  if (ax.length !== ay.length) {
    return false;
  }

  for (let i = 0; i < ax.length; i++) {
    if (ax[i] !== ay[i]) {
      return false;
    }
  }

  return true;
}