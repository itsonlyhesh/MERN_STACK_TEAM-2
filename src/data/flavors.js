// Flavor image assets live under src/assets/images and are imported here by filename.
// Keep these imports in sync with the asset filenames in the images folder.
import butterscotchBliss from '../assets/images/butterscotch-bliss.png'
import beanVanilla from '../assets/images/bean-vanilla.png'
import belgianChocoholic from '../assets/images/belgian-chocoholic.png'
import mangoKingdom from '../assets/images/mango-kingdom.png'
import fruitBonanza from '../assets/images/fruit-bonanza.png'
import electricBlackcurrant from '../assets/images/electric-blackcurrant.png'
import freshStrawberry from '../assets/images/fresh-strawberry.png'
import tropicalJackfruit from '../assets/images/tropical-jackfruit.png'
import mahaRajaBhog from '../assets/images/maha-raja-bhog.png'
import coffeeCaramel from '../assets/images/coffee-caramel.png'
import cottonCandy from '../assets/images/cotton-candy.png'

export const FLAVORS = [
  {
    name: 'Butterscotch Bliss',
    note: 'Butterscotch flavoured ice cream with cashew praline and walnut praline',
    price: '₹180',
    image: butterscotchBliss,
    from: '#d29b5c',
    to: '#8d5e35',
  },
  {
    name: 'Bean Vanilla',
    note: 'Natural vanilla flavoured ice cream with vanilla bean powder',
    price: '₹160',
    image: beanVanilla,
    from: '#f3e3b8',
    to: '#d9be84',
  },
  {
    name: 'Belgian Chocoholic',
    note: 'Belgian cocoa powder based ice cream',
    price: '₹190',
    image: belgianChocoholic,
    from: '#5a3520',
    to: '#2e1a10',
  },
  {
    name: 'Mango Kingdom',
    note: 'Mango flavoured ice cream with chunks of mango',
    price: '₹170',
    image: mangoKingdom,
    from: '#f5a623',
    to: '#b36f14',
  },
  {
    name: 'Fruit Bonanza',
    note: 'Vanilla flavoured ice cream with fig, blackcurrant, pineapple, raisin, cashew, karonda & tutti frutti',
    price: '₹185',
    image: fruitBonanza,
    from: '#efe0d6',
    to: '#d1a18a',
  },
  {
    name: 'Electric Blackcurrant',
    note: 'Blackcurrant flavoured ice cream with dry blackcurrant fruit',
    price: '₹175',
    image: electricBlackcurrant,
    from: '#532d51',
    to: '#2d1326',
  },
  {
    name: 'Fresh Strawberry',
    note: 'Strawberry flavoured ice cream with strawberry fruit crush',
    price: '₹170',
    image: freshStrawberry,
    from: '#e8a0a4',
    to: '#7f4552',
  },
  {
    name: 'Coffee Caramel',
    note: 'Creamy coffee ice cream with caramel ribbons and espresso notes',
    price: '₹185',
    image: coffeeCaramel,
    from: '#7a4b28',
    to: '#d4a35c',
  },
  {
    name: 'Cotton Candy',
    note: 'Light cotton candy ice cream with berry swirls and sugary sparkle',
    price: '₹175',
    image: cottonCandy,
    from: '#eb9cd8',
    to: '#f7d7fb',
  },
  {
    name: 'Tropical Jackfruit',
    note: 'Jackfruit flavoured ice cream with jackfruit pulp',
    price: '₹175',
    image: tropicalJackfruit,
    from: '#f9e8c5',
    to: '#c37f23',
  },
  {
    name: 'Maha Raja Bhog',
    note: 'Saffron flavoured ice cream with basundi, milkmaid, saffron, cardamom, pistachio, almond & cashew nuts',
    price: '₹210',
    image: mahaRajaBhog,
    from: '#f4e0c9',
    to: '#c38b55',
  },
]
