import { useState, useEffect, useRef, useCallback } from 'react'

export const delay = (ms) => (
  new Promise(resolve => setTimeout(resolve, ms))
)

export const hasVal = val => {
  if (val === null || typeof val === "undefined") {
    return false;
  }
  return true;
};

// returns a function that when called will
// return id if the component is mounted
export const useMountedState = (id) => {
  const mountedRef = useRef(false);
  const mountId = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = mountId;

    return () => {
      mountedRef.current = false;
    }
  }, []);

  return mountId;
}
