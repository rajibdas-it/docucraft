/* eslint-disable react-hooks/exhaustive-deps */
const { useRef, useEffect } = require("react")

const useDebounce = (callback, delay) => {
    /**
     * 1st step holo useRef use kore ekta timeoutidref create kora. jate oita amra ekta time por clear korte pari.
     * 2nd useEffect e likhte hobe jetay shudhu timeoutref tare clear korar jonno return function likhte hobe.
     * 3rd step e main function likhte hobe jeta return hobe ei hook theke. settime out use kore tar moddhe callback er moodhe args tare dite hobe
     */

    const timeoutIdRef = useRef(null)

    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
            }
        }
    }, [])

    const debouncedCallback = (...args) => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current)
        }

        timeoutIdRef.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }

    return debouncedCallback

}

export default useDebounce