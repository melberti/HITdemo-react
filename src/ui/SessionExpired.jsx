function SessionExpired() {
  return (
    <div className="border-primary-orange bg-primary-orange/50 mx-auto mb-10 flex w-fit max-w-full flex-col border px-4 py-2 text-center text-neutral-700">
      <h3>
        Your session has expired.
        <br />
        Please sign in again.
      </h3>
    </div>
  );
}

export default SessionExpired;
