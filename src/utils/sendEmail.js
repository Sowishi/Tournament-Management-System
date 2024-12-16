import emailjs from "emailjs-com";

const sendEmail = (forms) => {
  emailjs;
  emailjs
    .send(
      "service_sagjt39",
      "template_1welm0q",
      {
        user_email: forms.email,
        password: forms.password,
      },
      "mtUY6IFoQSil0kN-Q"
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

export default sendEmail;
