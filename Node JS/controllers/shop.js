const Product = require("../models/product");
const Order = require("../models/order");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { Description } = require("@headlessui/react");
const stripe = require("stripe")(
  "sk_test_51QWf0fJfSU72mAgmOF3k4kTLi5PLjNR9egrBz82dt1MdX684xjO3Dbx5pmNNSbN1U4lvN1OVrXXoymjMZBkCTDXJ00l8PLO58r"
);

const ITEMS_PER_PAGE = 3;

exports.getProducts = (req, res, next) => {
  const page = +req.query.page || 1;
  let countOfProducts;
  Product.find()
    .countDocuments()
    .then((numOfProducts) => {
      countOfProducts = numOfProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products",
        csrfToken: req.csrfToken(),
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < countOfProducts,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(countOfProducts / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  const page = +req.query.page || 1;
  let countOfProducts;
  Product.find()
    .countDocuments()
    .then((numOfProducts) => {
      countOfProducts = numOfProducts;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        csrfToken: req.csrfToken(),
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < countOfProducts,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(countOfProducts / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  let products;
  let total = 0;
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      products = user.cart.items;
      total = 0;
      products.forEach((product) => {
        total += product.quantity * product.productId.price;
      });
      return stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: products.map((p) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: p.productId.title, // Specify a custom name
                description: p.productId.description,
              },
              unit_amount: p.productId.price * 100, // Amount in cents
            },
            quantity: p.quantity,
          };
        }),
        mode: "payment",
        success_url:
          req.protocol + "://" + req.get("host") + "/checkout/success", //http://localhost:3000
        cancel_url: req.protocol + "://" + req.get("host") + "/checkout/cancel",
      });
    })
    .then((session) => {
      res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
        products: products,
        totalSum: total,
        sessionId: session.id,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckoutSuccess = (req, res, next) => {
  //postOrder to getCheckoutSuccess
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return next(new Error("No orders found"));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error("Unauthorized"));
      }
      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);
      const PDFDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline: filename="' + invoiceName + '"'
      );
      PDFDoc.pipe(fs.createWriteStream(invoicePath));
      PDFDoc.pipe(res);

      PDFDoc.fontSize(26).text("Invoice", {
        underline: true,
      });
      PDFDoc.text("--------------------------------");
      let totalPrice = 0;
      order.products.forEach((prod) => {
        totalPrice += prod.quantity * prod.product.price;
        PDFDoc.fontSize(14).text(
          prod.product.title +
            " - " +
            prod.quantity +
            " x " +
            "$" +
            prod.product.price
        );
      });
      PDFDoc.text("-------------");
      PDFDoc.fontSize(20).text("Total Price: $" + totalPrice);
      PDFDoc.end();
      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     return next(err);
      //   }
      //   res.setHeader("Content-Type", "application/pdf");
      //   res.setHeader(
      //     "Content-Disposition",
      //     'inline: filename="' + invoiceName + '"'
      //   );
      //   res.send(data);
      // });

      // const file = fs.createReadStream(invoicePath);
      // res.setHeader("Content-Type", "application/pdf");
      // res.setHeader(
      //   "Content-Disposition",
      //   'inline: filename="' + invoiceName + '"'
      // );
      // file.pipe(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
