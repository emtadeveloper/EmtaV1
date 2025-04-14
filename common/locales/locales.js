const messages = {
  userNotFound: {
    en: "User not found",
    fa: "کاربر یافت نشد",
  },
  password: {
    en: "Incorrect password. It must be between 6 and 20 characters.",
    fa: "رمز عبور نادرست است. باید بین ۶ تا ۲۰ کاراکتر باشد",
  },
  confirmPassword: {
    en: "Confirmation password does not match or is invalid.",
    fa: "رمز عبور تأیید نادرست است یا مطابقت ندارد",
  }
};

const getErrorMessage = (field) => {
  return messages[field] ? messages[field] : { en: "Unknown error", fa: "خطای ناشناخته" };
};

module.exports = { getErrorMessage };
