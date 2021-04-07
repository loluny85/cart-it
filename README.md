Cart It E-Commerce Application
-------------------------------
Primary Details
----------------
a) This is a React Application scafolded using Create React Application (CRA).
b) The State is managed with React's Context API.

Major Dependencies
------------------
a) Material-UI: is the Component library used for this project.
b) Commerce.js: will act as the CMS to store, retrieve and update the products using the API's provided by Commerce.js
Please refer https://commercejs.com/ for more details.
c) Stripe is used to handle the Checkout process.

Navigating the UI
------------------
URL - https://cartit-80c88.web.app
a) First is the Login page. Kindly use the below login credentials to sign-in.
Email - bijoy@cartit.com
Password - adminadmin
b) After successful login, user is navigated to the Products page. User can add an item to the cart by clicking on the cart icon in the product card.
c) User can view the Cart(Navigated to the Cart page) by clicking the cart icon in the right side of the header.
d) In the Cart page, user can see the products in the cart. User can update the quantity and also remove the product(s).
e) User can click on the Checkout button to initiate the Checkout process(navigated to the Checkout page)
f) Checkout is a 2 step process.
    a) User fills in the Shipping address.
    b) Next, user fills in the payment details.
g) After successful payment, user is navigated to the Confirmation page. Here he sees the itemized list oof products he purchased.
h) While user is on the Confirmation page, after 5 seconds, a popup window pops up which gives user the option to either go back to Products page or Log out of the application.