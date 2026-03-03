export default {
  name: "KH - kosmetické studio",
  email: "hromadkova.krista@seznam.cz",
  ico: "19538685",
  phoneForTel: "+420737748385",
  phoneFormatted: "+420 737 748 385",
  address: {
    lineOne: "Veselí 144",
    city: "Přelouč",
    zip: "53501",
  },
  socials: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    tiktok: "https://www.tiktok.com/",
    whatsapp: "https://wa.me/"
  },
  //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
  domain: "https://www.kh-kosmetika.cz",
  // Passing the isProduction variable for use in HTML templates
  isProduction: process.env.ELEVENTY_ENV === "PROD",
};