
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


module.exports = { required , email };