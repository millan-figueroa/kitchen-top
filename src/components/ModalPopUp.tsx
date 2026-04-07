type PopUpProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export default function Popup({ isOpen, onClose, children }: PopUpProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div className=" bg-background rounded-lg shadow-lg p-6 w-100 relative text-headline flex flex-col gap-2">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 hover:text-black mb-2 hover:cursor-pointer pb-3 font-bold">
					✕
				</button>
				<div className="pt-4">{children}</div>
			</div>
		</div>
	);
}
