const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox",
    client_id: "AcsPqky4nelxmWo2SwlY9UcJFjPt4dW8JjktZL0whWf5GGIjShYE-6BSn224dD58gvUgjz9R3ifUHEVL",
    client_secret: "EI01_E_VcfuEtkqZWDMbKsYYkWlVRFCjzs4sA8J2Dx7R-pZEvSkqHV337kU6eNYzRk4jCTDKxurXJQTV",
});

module.exports = paypal;