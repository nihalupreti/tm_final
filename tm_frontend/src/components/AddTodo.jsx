export default function AddTodo({ openModal }) {
  return (
    <>
      <div
        className="bg-gray-100 p-3 rounded-md border-2 border-gray-400 border-dotted flex mx-auto w-3/4 mb-10 mt-4 hover:cursor-pointer"
        onClick={openModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        New Task
      </div>
    </>
  );
}
