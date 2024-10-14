const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const Mailgen = require("mailgen");

let config = {
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};

let transporter = nodemailer.createTransport(config);
let MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "PayGifty",
    link: "https://google.com",
  },
});

//********************************************************************************************************************************** */

const sendConfirmationMail = ({ email: userEmail, name, token }, res) => {
  let response = {
    body: {
      name: name,
      intro: "Welcome to PayGifty! We're very excited to have you on board.",
      action: {
        instructions: "To get started with PayGifty, please click here:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Confirm your account",
          link: `http://localhost:5173/verify-access/${token}`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let mail = MailGenerator.generate(response);
  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `${name}, Welcome to PayGify!`,
    html: mail,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).send({
        msg: "You should receive an email from us soon. If not, check your spam folder. Click on confirmation link to activate account",
      });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .send({ error: "An error occured while sending activation email." });
    });
};

//******************************************************************************************** */

const sendClientInvitationMail = (
  { inviterEmail, inviterName, clientEmail },
  res
) => {
  let response = {
    body: {
      intro: `${inviterName} with email address (${inviterEmail})  has invited you to Quickbill to enjoy seamless payroll and invoicing system`,
      action: {
        instructions:
          "To get started with Quickbill, please click on the button below to register in less than 3 minutes:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Accept Invitation",
          link: `https://quickbillpay.onrender.com/auth/`,
        },
      },
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: clientEmail,
    subject: `${inviterName} invited you to Quickbill`,
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).send({
        message: "Invitation mail sent",
      });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .send({ error: "An error occured while sending the email." });
    });
};

//************************************************************************************** */

const sendGiftcardMail = (newGiftCard, owner, res) => {
  const tableData = newGiftCard.items.map((item) => ({
    Item: item.itemName,
    Qty: item.qty,

    Amount: `${newGiftCard.amount} `,
  }));

  let response = {
    body: {
      name: newGiftCard.client.name,
      intro: [
        `${owner.name} just sent you a GiftCard. Here is a brief overview of the Giftcard generated.`,
      ],
      table: {
        data: tableData,
      },
      action: [
        {
          instructions: `You are expected to redeem a sum of ${newGiftCard.amount}${newGiftCard.totalAmount}  kindly login to see more details about the Giftcard.`,
          button: {
            color: "#0175dd",
            text: "Take me to my account",
            link: "https://quickbillpay.onrender.com/auth/",
            fallback: true,
          },
        },
      ],
      outro: [
        "If you have any problem, just reply to this email, we'd love to help.",
      ],
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: newInvoice.client.email,
    subject: `${owner.name} sent you a Giftcard`,
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).send({
        message: "Client notified successfully",
        newInvoice,
      });
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .send({ error: "An error occured while sending the email." });
    });
};

module.exports = {
  sendConfirmationMail,
  sendClientInvitationMail,
  sendGiftcardMail,
};
