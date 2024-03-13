import instance from "./axiosInstance";

export const configJSON = () => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
};

export const configFormData = () => {
    return {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
    };
};

export const apiPost = (url, body, isJson = true) => {
    let headers
    if (isJson == true) headers = configJSON()
    if (isJson == false) headers = configFormData()

    const response = instance
        .post(url, body, {
            headers: headers,
        })
        .then((response) => response)
        .catch((err) => {
            console.log(err);
            return err.response;
        });
    return response;
};

export const apiPut = (url, data, isJson = true) => {
    let headers
    if (isJson == true) headers = configJSON()
    if (isJson == false) headers = configFormData()

    const response = instance
        .put(url, data, {
            headers: headers,
        })
        .then((response) => response)
        .catch((err) => {
            console.log(err);
            return err.response;
        });

    return response;
};

export const apiGet = (url, data, isJson = true) => {
    let headers
    if (isJson == true) headers = configJSON()
    if (isJson == false) headers = configFormData()

    const response = instance
        .get(url, {
            params: data,
            headers: headers
        })
        .then((response) => response)
        .catch((err) => {
            console.log(err);
            return err.response;
        });

    return response;
};

export const apiDeletes = (url, isJson = true) => {
    let headers
    if (isJson == true) headers = configJSON()
    if (isJson == false) headers = configFormData()

    const response = instance
        .delete(url, {
            headers: headers,
        })
        .then((response) => response)
        .catch((err) => {
            return err;
        });
    return response;
};
