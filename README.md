Cart It E-Commerce Application
-------------------------------
Primary Details
----------------
a) This is a React Application scaffolded using Create React Application CLI.
b) The State is managed with React's Context API.

Major Dependencies
------------------
a) Material-UI: is the Component library used for this project.
b) Commerce.js: will act as the CMS to store, retrieve and update the products using the API's provided by Commerce.js
Please refer https://commercejs.com/ for more details.
c) Stripe: is the payment gateway integrated to handle the Checkout process.

Navigating the UI
------------------
URL - https://cartit-80c88.web.app
a) First is the Login page. Kindly use the below login credentials to sign-in.
Email - bijoy@cartit.com
Password - adminadmin
b) After successful login, user is navigated to the Products page. User can add an item to the cart by clicking on the Add-To-Cart icon in the product card.
c) User can navigate to the Shopping Cart page by clicking the Cart icon in the right side of the page header.
d) In the Shopping Cart page, User can see the products in the cart. User can update the quantity and also remove the product(s).
e) User can click on the Checkout button to initiate the Checkout process(navigated to the Checkout page)
f) Checkout is a 2 step process.
    a) User fills in the Shipping address.
    b) Next, User fills in the payment details. Since we are using Stripe, please use below dummy data for payment
    Card number - 4242 4242 4242 4242
    Exp Date - 04/24
    CVV - 424
    Zipcode - 24242
g) After successful payment, user is navigated to the Confirmation page. Here he sees the itemized list of products he purchased.
h) While user is on the Confirmation page, after 5 seconds, a modal window pops up, which gives User the option to either go back to Products page or Log out of the application.

Note - 
1) The products that are added/updated/removed in the Cart is persistent, which means even if the User logs out and re logs-in, the products previously present in the Cart is still present.

To Run the Application locally
-------------------------------
Please follow below steps:
1) Open terminal in the system or editor.
2) Clone the cart-it repository, Run the command git clone https://github.com/loluny85/cart-it.git
3) Go inside the cart-it folder, Run the command cd cart-it
4) Install dependencies, Run the command yarn or npm install
5) Launch the application, Run the command yarn start or npm run start
