import { ChangeEvent, useState } from 'react';

const useInputValidation = (initialValue: string) => {

    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue: string = e.target.value;
        setValue(inputValue);
        let isValid: boolean = /^(?!\s)[a-zA-Z0-9\s]+$/.test(inputValue);
        setError(isValid ? null : `1-27 chars, no leading space, English letters/digits.`)

    }

    return { value, error, handleChange };
};

export default useInputValidation;