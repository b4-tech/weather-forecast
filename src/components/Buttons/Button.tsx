interface ButtonProps {
	children: React.ReactNode;
	disabled: boolean;
	onClick: VoidFunction;
}

const Button: React.FC<ButtonProps> = ({ children, disabled, onClick }) => {
	const buttonStyles: React.CSSProperties = {
		backgroundColor: "white",
		border: "0.5px solid lightgrey",
		cursor: "pointer",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		opacity: disabled ? "0" : "1",
		right: "1%",
		userSelect: "none"
	};

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			style={buttonStyles}
		>
			{children}
		</button>
	);
}

export default Button