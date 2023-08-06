import { useContext, useEffect, useState } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

import Button from "./Button";

interface VisibilityContextType {
	initComplete: boolean;
	isFirstItemVisible: boolean;
	scrollPrev: () => void;
	visibleElements: string[];
}

const LeftButton = () => {
	const { initComplete, isFirstItemVisible, scrollPrev, visibleElements } = useContext<VisibilityContextType>(VisibilityContext);

	const [disabled, setDisabled] = useState(!initComplete || (initComplete && isFirstItemVisible));
	useEffect(() => {
		if (visibleElements.length) {
			setDisabled(isFirstItemVisible);
		}
	}, [isFirstItemVisible, visibleElements]);

	return (
		<Button disabled={disabled} onClick={() => scrollPrev()}>
			{"<"}
		</Button>
	);
}
export default LeftButton