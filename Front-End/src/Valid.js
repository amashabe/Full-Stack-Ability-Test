const isEmail = email_address => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email_address.match(emailRegEx)) return true;
    else return false;
};

const isPhone = phone_numbers => {
    const phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (phone_numbers.match(phoneRegEx)) return true;
    else return false;
}

const isEmpty = string => {
    if (string == null) return true;
    else return false;
};

exports.validateUserData = (data, days) => {
    if (isEmpty(data.full_names)) return "Name must not be empty";
    if (isEmpty(data.email_address)) {
        return "Email must not be empty";
    } else if (!isEmail(data.email_address)) {
        return "Email must be a valid email address";
    }

    if (isEmpty(data.phone_numbers))
        return "Phone number must not be empty";
    else if (!isPhone(data.phone_numbers)) {
        return "Phone number must be a valid 10 digits number";
    }

    if (isEmpty(data.start_date)) return "Start date must not be empty";
    if (isEmpty(data.end_date)) return "End date must not be empty";

    if(days <= 0){
        return "Start date can't be less or equals to end date"
    }
}