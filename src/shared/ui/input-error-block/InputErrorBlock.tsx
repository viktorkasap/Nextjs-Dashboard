export const InputErrorBlock = ({ errors, id, label }: { errors: string[]; id: string; label?: string }) => {
  return (
    <div id={id} aria-live="polite" aria-atomic="true" className="mt-2">
      {errors.map((error: string) => (
        <ErrorText key={error} error={error} label={label} />
      ))}
    </div>
  );
};

const ErrorText = ({ error, label }: { error: string; label?: string }) => {
  const errorLabel = label ? `${label}: ` : '';

  return (
    <p className="leading-4 text-sm text-red-500">
      {errorLabel}
      {error}
    </p>
  );
};
