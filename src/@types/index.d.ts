declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.json' {
  const content: string;
  export default content;
}

interface CustomError extends Error {
  response?: {
    status: number;
  };
}

declare module '*.ttf';
