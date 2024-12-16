import emailjs from "emailjs-com";

const sendResetPassword = (user) => {
  emailjs;
  emailjs
    .send(
      "service_4rd9i6a",
      "template_q8jg38o",
      {
        user_email: user.email,
        password: user.password,
      },
      "VzDHW4nhDvN4au0ZL"
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
};

export default sendResetPassword;
