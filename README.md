# Products tax calculator app - coding challenge

To run the application on your local machine:

1. Clone the repository
2. Run `npm install` to install all the dependencies
3. Run `npm start` to start the application
4. Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

## Challenge description

Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical
products that are exempt. Import duty is an additional sales tax
applicable on all imported goods at a rate of 5%, with no exemptions. When I purchase items
I receive a receipt which lists the name of all the items and their price (including tax),
finishing with the total cost of the items,
and the total amounts of sales taxes paid. The rounding rules for sales tax are that for a tax
rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of
sales tax.
Write an application that prints out the receipt details for these shopping baskets…

### INPUT:

Input 1:

> 1 book at 12.49
> 1 music CD at 14.99
> 1 chocolate bar at 0.85

Input 2:

> 1 imported box of chocolates at 10.00
> 1 imported bottle of perfume at 47.50

Input 3:

> 1 imported bottle of perfume at 27.99
> 1 bottle of perfume at 18.99
> 1 packet of headache pills at 9.75
> 1 box of imported chocolates at 11.25

### OUTPUT

Output 1:

> 1 book: 12.49
> 1 music CD: 16.49
> 1 chocolate bar: 0.85
> Sales Taxes: 1.50
> Total: 29.83

Output 2:

> 1 imported box of chocolates: 10.50
> 1 imported bottle of perfume: 54.65
> Sales Taxes: 7.65
> Total: 65.15

Output 3:

> 1 imported bottle of perfume: 32.19
> 1 bottle of perfume: 20.89
> 1 packet of headache pills: 9.75
> 1 imported box of chocolates: 11.85
> Sales Taxes: 6.70
> Total: 74.68

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />

### `npm test`

Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**<br />

## Assumptions

1. The application is built using ReactJS, Typescript and vite.
2. The application is responsive and can be viewed on mobile devices.
3. The application is tested using Jest and React Testing Library.
4. The application is built using TDD approach.
5. The application is built using functional components and hooks.
