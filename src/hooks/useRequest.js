import axios from "axios";
import { useCallback, useState } from "react";

export const useRequest = () => {
    const [alert, setAlert] = useState({
        open: false,
    });
    const [processing, setProcessing] = useState(false);

    const handleCloseAlert = useCallback(() => {
        setAlert((prevState) => ({
            ...prevState,
            open: false,
        }))
    }, [setAlert])

    const handleRequest = useCallback(async ({
        method="GET",
        data={},
        endpoint,
        params={},
        succesAlert=false,
        subresource="",
        headers={},
    }) => {
        setProcessing(true);
        try {
            const options = {
                method,
                url: `${subresource}${endpoint}`,
                data,
                params,
                headers,
            };
            const response = await axios(options);
            if (succesAlert) {
                setAlert({
                    severity: "success",
                    open: true,
                    message: response?.data?.message,
                })
            }
            setProcessing(false);
            return response.data.data;
        } catch (err) {
            setAlert({
                severity:"error",
                open: true,
                message: err.response?.data?.message ? (
                   typeof err.response.data.message === "string" ? 
                   err.response.data.message
                   : err.response.data.message.join("\n")
                ) : "Server Error",
            })
            setProcessing(false);
            return null;
        }
    }, [setAlert, setProcessing])

    return {
        alert,
        processing, 
        handleRequest,
        handleCloseAlert,
    }
}