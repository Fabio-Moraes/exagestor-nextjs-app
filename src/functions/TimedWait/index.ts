export async function TimedWait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
