export default function TitleBar() {
  return (
    <header className="relative h-8 shrink-0 select-none border-b border-vscode-border bg-vscode-activityBar px-3">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center">
        <div
          aria-hidden="true"
          className="flex items-center gap-1.5"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#b85e47]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#b8a36c]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#738b70]" />
        </div>
        <p className="truncate px-4 font-mono text-[0.63rem] tracking-[0.03em] text-vscode-textMuted sm:text-[0.68rem]">
          minhpham.dev / portfolio.code-workspace
        </p>
        <div className="hidden items-center justify-self-end gap-2 sm:flex">
          <span className="h-1.5 w-1.5 bg-[#789678]" />
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-vscode-textMuted">
            available · 2027
          </span>
        </div>
      </div>
    </header>
  );
}
