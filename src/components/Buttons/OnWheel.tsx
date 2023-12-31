interface PartialVisibilityContextType {
	scrollNext: () => void;
	scrollPrev: () => void;
}

const OnWheel = (apiObj: PartialVisibilityContextType, ev: React.WheelEvent): void => {
	const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

	if (isThouchpad) {
		ev.stopPropagation();
		return;
	}

	if (ev.deltaY < 0) {
		apiObj.scrollNext();
	} else if (ev.deltaY > 0) {
		apiObj.scrollPrev();
	}
}

export default OnWheel