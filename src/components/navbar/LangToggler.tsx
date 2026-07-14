const LangToggler = () => {
  return (
    <div className="flex items-center gap-3 text-slate-700 dark:text-offWhite">
        <span className="text-sm">English</span>
        <div className="w-6 h-6 rounded-full bg-slate-700 dark:bg-offWhite"></div>
        <span className="text-sm">العربية</span>
    </div>
  )
}

export default LangToggler;