type WhyUsPointProps = {
  children: React.ReactNode;
  label: string;
};

function WhyUsPoint({ children, label }: WhyUsPointProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center mb-4">
        <div className="shadow rounded-full p-3 flex items-center justify-center">
            {children}
        </div>
        <p className="text-xs font-bold leading-tight text-primary">{label}</p>
    </div>
  );
}

export default WhyUsPoint;
