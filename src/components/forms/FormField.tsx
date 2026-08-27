type Props = {
    id: string;
    label: string;
    required?: boolean
    error?: string;
    input: React.ReactNode;
    icon: React.ReactNode;
}

function FormField({ id, label, required = false, error, input, icon }: Props) {
    return (
        <div className="form-field-container flex-col">
            <label htmlFor={id} className="mr-16 block text-base font-bold">
                { label } 
                {required && (<span className="text-red-500">*</span>)}
            </label>

            <div className="flex w-full gap-4">
                <span className="icon-buble h-14">
                    { icon }
                </span>

                { input }
            </div>

            {error && (<p className="text-red-500 text-sm mr-16">{error}</p>)}
        </div>
    )
}

export default FormField