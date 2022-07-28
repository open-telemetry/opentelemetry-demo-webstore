// Node
const { promisify } = require('util')

// Npm
const test = require('ava')
const dotenv = require('dotenv')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')
const fetch = require('node-fetch')

// Local
const data = require('./data.json')

// Functions
const deepCopy = obj => JSON.parse(JSON.stringify(obj))
const arrayIntersection = (a, b) => a.filter(x => b.indexOf(x) !== -1)
const isEmpty = obj => Object.keys(obj).length === 0

// Main
let adsGet = null
let cartAdd = null, cartGet = null, cartEmpty = null
let checkoutOrder = null
let currencySupported = null, currencyConvert = null
let charge = null
let recommend = null
let productList = null, productGet = null, productSearch = null
let shippingQuote = null, shippingOrder = null

test.before(() => {
  dotenv.config({ path: '../.env' })

  const hipstershop = grpc.loadPackageDefinition(protoLoader.loadSync('../pb/demo.proto')).hipstershop

  const adClient = new hipstershop.AdService(`0.0.0.0:${process.env.AD_SERVICE_PORT}`, grpc.credentials.createInsecure())
  adsGet = promisify(adClient.getAds).bind(adClient)

  const cartClient = new hipstershop.CartService(`0.0.0.0:${process.env.CART_SERVICE_PORT}`, grpc.credentials.createInsecure())
  cartAdd = promisify(cartClient.addItem).bind(cartClient)
  cartGet = promisify(cartClient.getCart).bind(cartClient)
  cartEmpty = promisify(cartClient.emptyCart).bind(cartClient)

  const checkoutClient = new hipstershop.CheckoutService(`0.0.0.0:${process.env.CHECKOUT_SERVICE_PORT}`, grpc.credentials.createInsecure())
  checkoutOrder = promisify(checkoutClient.placeOrder).bind(checkoutClient)

  const currencyClient = new hipstershop.CurrencyService(`0.0.0.0:${process.env.CURRENCY_SERVICE_PORT}`, grpc.credentials.createInsecure())
  currencySupported = promisify(currencyClient.getSupportedCurrencies).bind(currencyClient)
  currencyConvert = promisify(currencyClient.convert).bind(currencyClient)

  const paymentClient = new hipstershop.PaymentService(`0.0.0.0:${process.env.PAYMENT_SERVICE_PORT}`, grpc.credentials.createInsecure())
  charge = promisify(paymentClient.charge).bind(paymentClient)

  const productCatalogClient = new hipstershop.ProductCatalogService(`0.0.0.0:${process.env.PRODUCT_CATALOG_SERVICE_PORT}`, grpc.credentials.createInsecure())
  productList = promisify(productCatalogClient.listProducts).bind(productCatalogClient)
  productGet = promisify(productCatalogClient.getProduct).bind(productCatalogClient)
  productSearch = promisify(productCatalogClient.searchProducts).bind(productCatalogClient)

  const recommendationClient = new hipstershop.RecommendationService(`0.0.0.0:${process.env.RECOMMENDATION_SERVICE_PORT}`, grpc.credentials.createInsecure())
  recommend = promisify(recommendationClient.listRecommendations).bind(recommendationClient)

  const shippingClient = new hipstershop.ShippingService(`0.0.0.0:${process.env.SHIPPING_SERVICE_PORT}`, grpc.credentials.createInsecure())
  shippingQuote = promisify(shippingClient.getQuote).bind(shippingClient)
  shippingOrder = promisify(shippingClient.shipOrder).bind(shippingClient)
})

// --------------- Ad Service ---------------

test('ad: get', async t => {
  const req = data.ad
  const res = await adsGet(req)

  t.is(res.ads.length, 2)
  t.truthy(res.ads[0].redirectUrl)
  t.truthy(res.ads[1].redirectUrl)
  t.truthy(res.ads[0].text)
  t.truthy(res.ads[1].text)
})

// --------------- Cart Service ---------------

test('cart: all', async t => {
  const req = data.cart
  const userIdReq = { userId: req.userId }

  // Empty Cart
  let res = await cartEmpty(userIdReq)
  t.truthy(isEmpty(res))

  // Add to Cart
  res = await cartAdd(req)
  t.truthy(isEmpty(res))

  // Check Cart Content
  res = await cartGet(userIdReq)
  t.is(res.items.length, 1)
  t.is(res.items[0].productId, req.item.productId)
  t.is(res.items[0].quantity, req.item.quantity)

  // Empty Cart
  res = await cartEmpty(userIdReq)
  t.truthy(isEmpty(res))

  // Check Cart Content
  res = await cartGet(userIdReq)
  t.truthy(isEmpty(res))
})

// --------------- Currency Service ---------------

test('currency: supported', async t => {
  const res = await currencySupported({})
  t.is(res.currencyCodes.length, 33)
})

test('currency: convert', async t => {
  const req = data.currency

  const res = await currencyConvert(req)
  t.is(res.currencyCode, "CAD")
  t.is(res.units, 442)
  t.is(res.nanos, 599380805)
})

// --------------- Checkout Service ---------------

test('checkout: place order', async t => {
  const req = data.checkout
  const res = await checkoutOrder(req)

  t.truthy(res.order.orderId)
  t.truthy(res.order.shippingTrackingId)
  t.truthy(res.order.shippingAddress)
  t.is(res.order.shippingCost.currencyCode, 'USD')
})

// --------------- Email Service ---------------

// TODO
test('email: confirmation', async t => {
  const req = data.email

  const res = await fetch(
    `http://0.0.0.0:${process.env.EMAIL_SERVICE_PORT}/send_order_confirmation`,
    { method: 'POST', body: JSON.stringify(req), headers: { 'Contenty-Type': 'application/json' } }
  )

  t.truthy(true)
})

// --------------- Payment Service ---------------

test('payment: valid credit card', t => {
  const req = data.charge

  return charge(req).then(res => {
    t.truthy(res.transactionId)
  })
})

test('payment: invalid credit card', t => {
  const req = deepCopy(data.charge)
  req.creditCard.creditCardNumber = '0000-0000-0000-0000'

  return charge(req).catch(err => {
    t.is(err.details, 'Credit card info is invalid.')
  })
})

test('payment: amex credit card not allowed', t => {
  const req = deepCopy(data.charge)
  req.creditCard.creditCardNumber = '3714 496353 98431'

  return charge(req).catch(err => {
    t.is(err.details, 'Sorry, we cannot process amex credit cards. Only VISA or MasterCard is accepted.')
  })
})

test('payment: expired credit card', t => {
  const req = deepCopy(data.charge)
  req.creditCard.creditCardExpirationYear = 2021

  return charge(req).catch(err => {
    t.is(err.details, 'The credit card (ending 0454) expired on 1/2021.')
  })
})

// --------------- Product Catalog Service ---------------

test('product: list', async t => {
  const res = await productList({})
  t.is(res.products.length, 9)
})

test('product: get', async t => {
  const res = await productGet({ id: 'OLJCESPC7Z' })
  t.is(res.name, 'Sunglasses')
  t.truthy(res.description)
  t.truthy(res.picture)
  t.truthy(res.priceUsd)
  t.truthy(res.categories)
})

test('product: search', async t => {
  const res = await productSearch({ query: 'hold' })
  t.is(res.results.length, 2)
  t.is(res.results[0].name, 'Candle Holder')
  t.is(res.results[1].name, 'Bamboo Glass Jar')
})

// --------------- Recommendation Service ---------------

test('recommendation: list products', async t => {
  const req = deepCopy(data.recommend)

  const res = await recommend(req)
  t.is(res.productIds.length, 4)
  t.is(arrayIntersection(res.productIds, req.productIds).length, 0)
})

// --------------- Shipping Service ---------------

test('shipping: quote', async t => {
  const req = data.shipping

  const res = await shippingQuote(req)
  t.is(res.costUsd.units, 17)
  t.is(res.costUsd.nanos, 980000000)
})

test('shipping: empty quote', async t => {
  const req = deepCopy(data.shipping)
  req.items = []

  const res = await shippingQuote(req)
  t.falsy(res.costUsd.units)
  t.falsy(res.costUsd.nanos)
})

test('shipping: order', async t => {
  const req = data.shipping

  const res = await shippingOrder(req)
  t.truthy(res.trackingId)
})
