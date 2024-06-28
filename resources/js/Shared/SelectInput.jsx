export default ({
	label,
	name,
	className,
	children,
	multiple = false,
	...props
}) => {
	return (
		<div className='flex-col gap-1'>
			<p className="mb-2">{label}</p>
			<select
				id={name}
				name={name}
				multiple={multiple ? "multiple" : undefined}
				{...props}
				className={
					`form-select w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded 
					`
				}
			>
				{children}
			</select>
		</div >
	);
};