export function Button({ children, handleAdd }) {
  return (
    <>
      <button onClick={handleAdd} className="button">
        {children}
      </button>
    </>
  );
}
