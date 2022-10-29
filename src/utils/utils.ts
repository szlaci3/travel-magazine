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
