export const InputErrorBlock = ({ errors, id }: { errors: string[]; id: string }) => {
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {errors.map((error: string) => (
        <ErrorText key={error} error={error} />
      ))}
    </div>
  );
};

const ErrorText = ({ error }: { error: string }) => {
  return <p className="mt-2 text-sm text-red-500">{error}</p>;
};
