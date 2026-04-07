type DeletePopUpProps = {
	selectedRecipeId: string | null;
	deleteSavedRecipe: (id: string) => void;
	setIsModalOpen: (isOpen: boolean) => void;
};

export default function DeletePopUp({
	selectedRecipeId,
	deleteSavedRecipe,
	setIsModalOpen,
}: DeletePopUpProps) {
	return (
		<>
			<p>Are you sure you want to delete this recipe?</p>
			<div className="flex justify-end mt-4 gap-2">
				<button
					onClick={() => setIsModalOpen(false)}
					className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
					Cancel
				</button>
				<button
					onClick={() => {
						// Perform delete action here
						if (selectedRecipeId) {
							deleteSavedRecipe(selectedRecipeId);
						}
						setIsModalOpen(false);
					}}
					className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
					Delete
				</button>
			</div>
		</>
	);
}
