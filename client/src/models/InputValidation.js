const required = (data) => {
    for (const val of data) {
        if(!val) {
            return false;
        }
    }
    return true;
}

const email = (data) => {
    const email_reg = /\S+@\S+\.\S+/;
    return email_reg.test(data);
}

const equal = (val1, val2) => {
    return val1===val2;
}

export default { required , email , equal};