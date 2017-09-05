const checkEmpty = (value, name) => {
  return !value || value.length === 0 ?  name + ' is required\n' : '';
};

export const validateTeacher = ({
  code, name, topica_email, personal_email, 
  phone_number, status, location, account, 
  date_of_birth, note, supporter,
}) => {
  let mess = checkEmpty(code, 'Code');
  mess += checkEmpty(name, 'Name');
  mess += checkEmpty(topica_email, 'Topica email');
  mess += checkEmpty(personal_email, 'Personal email');
  mess += checkEmpty(phone_number, 'Phone number');
  mess += checkEmpty(status, 'Status');
  mess += checkEmpty(location, 'Location');
  mess += checkEmpty(account, 'Account');
  mess += checkEmpty(date_of_birth, 'Date of birth');
  mess += checkEmpty(supporter, 'Supporter');
  if (mess.length === 0) return {success: true};
  return {success: false, mess};
};

export const validateSupporter = ({
  name, account, email
}) => {
  let mess = checkEmpty(name, 'Name');
  mess += checkEmpty(account, 'Account');
  mess += checkEmpty(email, 'Email');
  if (mess.length === 0) return {success: true};
  return {success: false, mess};
};

export const validateMailtemplate = ({
  name, title, context
}) => {
  let mess = checkEmpty(name, 'Name');
  mess += checkEmpty(title, 'Title');
  mess += checkEmpty(context, 'Context');
  if (mess.length === 0) return {success: true};
  return {success: false, mess};
};
