type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

type MarkerData = {
    position: { latitude: number; longitude: number };
    title: string;
    color: string;
  }
