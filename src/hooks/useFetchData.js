import { useEffect, useState } from "react";
import { API_STATUS } from "../utils/constants";

const useFetchData = (API_LINK, props, ...extraArgs) => {

    const [data, setData] = useState();

    const fetchData = async (API_LINK) => {
        try {
            extraArgs[0](API_STATUS.LOADING);
            const readableStream = await fetch(API_LINK);
            const data = await readableStream.json();
            setData(data);
            extraArgs[0](API_STATUS.SUCCESS);
        } catch (error) {
            console.log(error);
            extraArgs[0](API_STATUS.FAILED);
        }
    }

    useEffect(() => {
        fetchData(API_LINK)
    }, [...props]);

    return data;

};

export default useFetchData;
