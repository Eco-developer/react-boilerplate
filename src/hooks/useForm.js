import { 
    useCallback, 
    useState, 
} from "react"

export const useForm = (inputs, initialState, validators={}) => {
    const [updatedInputs, setInputs] = useState(inputs);
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});

    const validateInputs = useCallback((name, value, values) => {
        if (validators[name]) {
            Object.keys(validators[name]).some((key) => {
                setErrors((prevState) => ({ 
                    ...prevState,
                    [name]: {
                        status: !validators[name][key].validate(value, values),
                        message: validators[name][key].message,
                    }
                }))
                return !validators[name][key].validate(value, values);
            })
        }
    }, [validators, setErrors]);

    const onChange = useCallback((e) => {
        const { target : { name, value } } = e;
        setValues((prevState) => {
            validateInputs(name, value, prevState);
            return {
                ...prevState,
                [name]: value,
            }
        })
    }, [setValues, validateInputs]);

    const resetFormValues = useCallback(() => {
        setValues(initialState);
        setErrors({});
    }, [initialState, setValues, setErrors]);

    const setValue = useCallback((name, value) => {
        setValues((prevState) => {
            validateInputs(name, value, prevState);
            return {
                ...prevState,
                [name]: value,
            }
        })
    }, [setValues, validateInputs]);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);
    
    const modifyInputs = useCallback((inputsProps={}) => {
        setInputs((prevState) => prevState.map((input) => inputsProps[input.id] ? {...input, ...inputsProps[input.id]} : input));
    }, [setInputs]);

    const addInputs = useCallback((newIputs=[]) => {
        setInputs((prevState) => [...prevState, ...newIputs]);
    }, []);

    const getFormErrorStatus = useCallback((values={}) => {
        return Object.keys(validators).some((name) => {
            return Object.keys(validators[name]).some((key) => {
                return !validators[name][key].validate(values[name], values);
            })
        })
    }, [validators]);

    return {
        updatedInputs,
        values,
        validators,
        errors,
        onChange,
        validateInputs,
        resetFormValues,
        clearErrors,
        setValue,
        modifyInputs,
        addInputs,
        getFormErrorStatus,
    }
}