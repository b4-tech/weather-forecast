import { useContext, useEffect, useState } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

import Button from "./Button";

interface VisibilityContextType {
	isLastItemVisible: boolean;
	scrollNext: () => void;
	visibleElements: string[];
}

const RightButton = () => {
	const { isLastItemVisible, scrollNext, visibleElements } = useContext<VisibilityContextType>(
		VisibilityContext
	);

	const [disabled, setDisabled] = useState(!visibleElements.length && isLastItemVisible);
	useEffect(() => {
		if (visibleElements.length) {
			setDisabled(isLastItemVisible);
		}
	}, [isLastItemVisible, visibleElements]);

	return (
		<Button disabled={disabled} onClick={() => scrollNext()}>
			{">"}
		</Button>
	);
}

export default RightButton