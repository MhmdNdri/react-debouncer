import { useCallback, useEffect, useRef } from "react";

function useTimeOut(callback, delay) {
  const callBackRef = useRef(callback);
  const timeOutRef = useRef();

  useEffect(() => {
    callBackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeOutRef.current = setTimeout(() => callBackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeOutRef.current && clearTimeout(timeOutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}

export default function useDebounce(callback, delay, dependencies) {
  const { reset, clear } = useTimeOut(callback, delay);
  useEffect(() => reset, [...dependencies, reset]);
  useEffect(() => clear, []);
}
