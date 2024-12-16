const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const router = require("./routes/auth/auth-routes.js");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopFeedbackRouter = require("./routes/shop/feedback-routes");
const shopOrderRouter = require("./routes/shop/order-routes.js");
const adminOrderRouter = require("./routes/admin/order-routes");
const searchRouter = require("./routes/shop/search-routes.js")

mongoose.connect('mongodb+srv://singhjyoti242002:l7MfG22FZ1Wjpiic@cluster0.v7r9p.mongodb.net/').then(() => {
    console.log("MongoDB connected");
}).catch((error) => {
    console.log(error);
})

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        'Expires',
        'Pragma'
    ],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", router)
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/feedback", shopFeedbackRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/search", searchRouter);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`)
})