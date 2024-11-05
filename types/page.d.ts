declare module 'next/types' {
  export type PageProps = {
    params: { locale: string };
    searchParams?: { [key: string]: string | string[] | undefined };
  };
} 