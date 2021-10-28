import React from "react";
import App from "../App";

/**
 * A setInterval hook for React components.
 * @param callback The function to call for the interval.
 * @param delay The delay between each call.
 * @param callInstantly Whether or not the callback will call instantly upon registering the hook.
 * @param deps The dependencies array for the hook.
 */
export function useInterval(callback, delay, callInstantly = false, deps = []) {
	// Create side effect
	React.useEffect(() => {
		// Create interval based on delay
		const interval = setInterval(callback, delay);
		// If call instantly is truthy, run the callback
		callInstantly && callback();

		// On unmount, clear the interval
		return () => clearInterval(interval);
	}, deps);
}

export function useDependentState(factory, deps = []) {
	const [state, setState] = React.useState(factory());

	React.useMemo(() => {
		const newState = factory(state);

		if (newState !== state) {
			setState(newState);
		}
	}, [state, ...deps]);

	return [state, setState];
}

export function useMounted() {
	const state = React.useRef(false);

	React.useEffect(() => {
		state.current = true;

		return () => void (state.current = false);
	}, []);

	return state;
}

const promiseCache = {};
export function usePromise(promise, useCache = true, deps = []) {
	const [value, setValue] = useDependentState(
		() => useCache ? promiseCache[promise] : null,
		[promise, ...deps]
	);
	const isMounted = useMounted();

	React.useEffect(() => {
		!value && promise().then(v => (
			isMounted.current && setValue(v),
			promiseCache[promise] = v
		));
	}, deps);

	return value;
}

export function useEventListener(eventType, callback, options = {}) {
	const {
		target = document,
		dependencies = [],
		init = false
	} = options;

	React.useEffect(() => {
		target.addEventListener(eventType, callback);
		init && callback();

		return () => target.removeEventListener(eventType, callback);
	}, dependencies);
}

export function useOnMount(callback) {
	React.useEffect(() => {
		callback();
	}, []);
}

export function useOnUnmount(callback) {
	React.useEffect(() => {
		return callback;
	}, []);
}

export function useMediaQuery(type, size) {
	const query = React.useMemo(() => window.matchMedia(`(${type}: ${size}px)`), [type, size]);
	const [state, setState] = React.useState(query.matches);

	React.useEffect(() => {
		const listener = e => setState(e.matches);

		query.addEventListener("change", listener);
		return () => query.removeEventListener("change", listener);
	}, [type, size]);

	return state;
}