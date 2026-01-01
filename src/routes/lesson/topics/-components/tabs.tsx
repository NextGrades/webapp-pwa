export function LessonTabs({ activeTab, onChange }) {
  const tabs = ["learn", "examples", "exercises"] as const;

  return (
    <nav className="flex justify-center p-4 border-b bg-gray-50/50">
      <div className="flex p-1 bg-gray-200/50 rounded-xl gap-1">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-6 py-2 rounded-lg text-xs font-bold uppercase transition-all
              ${activeTab === tab
                ? "bg-white text-black shadow-sm"
                : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}
