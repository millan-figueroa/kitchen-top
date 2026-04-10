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

export default function SharePopUp() {
	//check to see if the code is running in the browser (client side) before accessing window
	const url = typeof window !== "undefined" ? window.location.href : "";

	return (
		<div className="flex gap-3">
			<FacebookShareButton url={url} aria-label="Share this page on Facebook">
				<FacebookIcon size={40} round />
			</FacebookShareButton>
			<XShareButton
				title="Take a look at this recipe I found!"
				via="reactshare"
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
	);
}
