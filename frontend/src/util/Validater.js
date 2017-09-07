const checkEmpty = (value, name) => {
  return !value || value.length === 0 ?  name + ' is required\n' : '';
};

export const validateClassroom = ({
  school, subject, subject_code, 
  class_name, class_subject, estimated_students,
  start_date, finish_date, examination_date,
  teacher, assistant, change_note, supporter
}) => {
  let mess = checkEmpty(school, 'School');
  mess += checkEmpty(subject, 'subject');
  mess += checkEmpty(subject_code, 'Subject code');
  mess += checkEmpty(class_name, 'Class name');
  mess += checkEmpty(class_subject, 'Class subject');
  mess += checkEmpty(estimated_students, 'Estimated students');
  mess += checkEmpty(start_date, 'Start date');
  mess += checkEmpty(finish_date, 'Finish date');
  mess += checkEmpty(examination_date, 'Examination date');
  mess += checkEmpty(teacher, 'Teacher');
  mess += checkEmpty(assistant, 'Assistant');
  mess += checkEmpty(supporter, 'Supporter');
  if (mess.length === 0) return {success: true};
  return {success: false, mess};
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

export const validateMailSender = ({
  template_id
}) => {
  let mess = checkEmpty(template_id, 'Template');
  if (mess.length === 0) return {success: true};
  return {success: false, mess};
};

export const validateMailCustom = ({
  template_id, template_content
}) => {
  let mess = checkEmpty(template_id, 'Template');
  mess += checkEmpty(template_content, 'Content');
  if (mess.length === 0) return {success: true};
  return {success: false, mess};
};
