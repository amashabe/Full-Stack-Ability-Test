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
    if (string.trim() === "") return true;
    else return false;
};

exports.validateUserData = (data) => {
    let errors = {};

    if (isEmpty(data.email_address)) {
        errors.Email = "Must not be empty";
    } else if (!isEmail(data.email_address)) {
        errors.Email = "Must be a valid email address";
    }

    if (isEmpty(data.phone_numbers))
        errors.Phone = "Must not be empty";
    else if (!isPhone(data.phone_numbers)) {
        errors.Phone = "Must be a valid phone number";
    }

    if (isEmpty(data.full_names)) errors.Name = "Must not be empty";
    if (isEmpty(data.start_date)) errors.Start_Date = "Must not be empty";
    if (isEmpty(data.end_date)) errors.End_Date = "Must not be empty";

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };

}

