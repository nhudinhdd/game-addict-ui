interface HeaderBar {
  nameAddButton: string;
  addModal: () => void;
}

export function HeaderBar(props: HeaderBar) {
  const { nameAddButton, addModal } = props;
  return (
    <div className="py-3 flex justify-between">
      <input
        className="placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Seach name"
        type="text"
        name="search"
      />
      <button
        className="rounded-xl	h-10 w-32 bg-blue-500 font-bold text-white"
        onClick={addModal}
      >
        {nameAddButton}
      </button>
    </div>
  );
}
