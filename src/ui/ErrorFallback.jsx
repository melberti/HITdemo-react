import Button from "./Button";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
      <Button size="large" variation="primary" onClick={resetErrorBoundary}>
        Back to Events
      </Button>
    </div>
  );
}

export default ErrorFallback;
