import { useState } from "react";
import {
	FacebookShareButton,
	FacebookIcon,
	XShareButton,
	XIcon,
	LinkedinShareButton,
	EmailIcon,
	EmailShareButton,
	LinkedinIcon,
	BlueskyShareButton,
	BlueskyIcon,
} from "react-share";
import { BsFillClipboard2PlusFill } from "react-icons/bs";

type SharePopUpProps = {
	selectedRecipeId: string | null;
};

export default function SharePopUp({ selectedRecipeId }: SharePopUpProps) {
	let url = "";

	if (selectedRecipeId) {
		// If a recipe is selected, build the URL using the host + recipe path
		url = `${window.location.origin}/recipe/${selectedRecipeId}`;
	} else {
		// If no recipe is selected, safely get the current page URL (client-side only)
		if (typeof window !== "undefined") {
			url = window.location.href;
		} else {
			url = "";
		}
	}

	const [copied, setCopied] = useState(false);

	//copy to clipboard
	const copyToClipboard = async () => {
		try {
			//copy the usr to clipboard
			await navigator.clipboard.writeText(url);
			//set boolean to true to display the message
			setCopied(true);
			setTimeout(() => setCopied(false), 5000); // reset after 2 seconds
		} catch (error) {
			console.error("Failed to copy: ", error);
			setCopied(false);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex gap-3">
				<button onClick={copyToClipboard}>
					<BsFillClipboard2PlusFill size={40} />
				</button>
				<FacebookShareButton url={url} aria-label="Share this page on Facebook">
					<FacebookIcon size={40} round />
				</FacebookShareButton>
				<XShareButton
					title="Take a look at this recipe I found!"
					hashtags={["react", "share"]}
					url={url}
					aria-label="Share on X">
					<XIcon size={40} round />
				</XShareButton>
				<EmailShareButton
					subject="Take a look at this recipe I found!"
					body="Thought you might like this:"
					url={url}
					aria-label="Share by email">
					<EmailIcon size={40} round />
				</EmailShareButton>
				<LinkedinShareButton url={url} aria-label="Share this page on LinkedIn">
					<LinkedinIcon size={40} round />
				</LinkedinShareButton>
				<BlueskyShareButton
					title="Take a look at this recipe I found!"
					url={url}
					aria-label="Share on Bluesky">
					<BlueskyIcon size={40} round />
				</BlueskyShareButton>
			</div>
			{copied && (
				<div className="block text-center text-green-700">
					URL copied to clipboard!
				</div>
			)}
		</div>
	);
}
