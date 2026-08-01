const catalog = [
    ["Men's Casual Shirt", "Men's Wear", "shirt.jpg", 999], ["Men's Formal Shirt", "Formal Wear", "formalshirt.jpg", 1499],
    ["Cotton T-Shirt", "Summer Wear", "tshirt.jpg", 699], ["Slim Fit Denim Jeans", "Denim Collection", "jeans.jpg", 1899],
    ["Linen Shirt", "Men's Wear", "shirt.jpg", 1599], ["Printed Resort Shirt", "Casual Wear", "shirt.jpg", 1199],
    ["Men's Cargo Pants", "College Wear", "jeans.jpg", 1799], ["Everyday Joggers", "Lounge Wear", "sweatshirt.jpg", 1299],
    ["Winter Hoodie", "Winter Wear", "hoodie.jpg", 2299], ["Classic Sweatshirt", "Casual Wear", "sweatshirt.jpg", 2199],
    ["Formal Blazer", "Office Wear", "blazer.jpg", 4999], ["Denim Jacket", "Denim Collection", "jacket.jpg", 3299],
    ["Oversized Graphic Tee", "Oversized Collection", "tshirt.jpg", 1099], ["Men's Kurta", "Ethnic Wear", "traditional.jpg", 1899],
    ["Wedding Bandhgala", "Wedding Collection", "blazer.jpg", 6999], ["Premium Polo T-Shirt", "Premium Collection", "tshirt.jpg", 1499],
    ["Cotton Shirt", "Cotton Collection", "cottonshirt.jpg", 899], ["Men's Night Suit", "Night Wear", "sweatshirt.jpg", 1599],
    ["Women's Kurti", "Women's Wear", "kurti.jpg", 1299], ["Printed Kurti", "Daily Wear", "printedkurti.jpg", 1099],
    ["Anarkali Dress", "Ethnic Wear", "anarkali.jpg", 3999], ["Cotton Saree", "Traditional Wear", "saree.jpg", 2499],
    ["Wedding Saree", "Wedding Collection", "weddingsaree.jpg", 4999], ["Designer Lehenga", "Designer Collection", "lehenga.jpg", 6999],
    ["Party Wear Dress", "Party Wear", "dress.jpg", 3499], ["Women's Top", "Western Wear", "top.jpg", 899],
    ["Maxi Evening Gown", "Party Wear", "dress.jpg", 4299], ["Palazzo Set", "Ethnic Wear", "kurti.jpg", 1899],
    ["Flared Skirt", "Western Wear", "top.jpg", 1599], ["Office Co-ord Set", "Office Wear", "blazer.jpg", 3899],
    ["Festive Silk Saree", "Festive Collection", "saree.jpg", 4599], ["Plus Size Kurti Set", "Plus Size Collection", "kurti.jpg", 1999],
    ["Women's Lounge Set", "Lounge Wear", "sweatshirt.jpg", 1799], ["Floral Summer Dress", "Summer Wear", "dress.jpg", 2299],
    ["Designer Kaftan", "Premium Collection", "anarkali.jpg", 3799], ["Women's Denim Jacket", "Denim Collection", "jacket.jpg", 3499],
    ["Bridal Lehenga", "Wedding Collection", "lehenga.jpg", 12999], ["Cotton Night Suit", "Night Wear", "printedkurti.jpg", 1499],
    ["Kids Party Dress", "Kids Wear", "kidsdress.jpg", 1799], ["Girls Festive Frock", "Festive Collection", "kidsdress.jpg", 2199],
    ["Kids Cotton T-Shirt", "Kids Wear", "tshirt.jpg", 599], ["Boys Denim Jeans", "Denim Collection", "jeans.jpg", 1199],
    ["Kids Kurta Pyjama", "Traditional Wear", "traditional.jpg", 1599], ["Girls Anarkali", "Ethnic Wear", "anarkali.jpg", 2399],
    ["Kids Hoodie", "Winter Wear", "hoodie.jpg", 1399], ["Boys Casual Shirt", "Daily Wear", "shirt.jpg", 799],
    ["Girls Printed Top", "College Wear", "top.jpg", 699], ["Kids Wedding Set", "Wedding Collection", "party.jpg", 2999],
    ["Kids Sweatshirt", "Lounge Wear", "sweatshirt.jpg", 999], ["Kids Summer Shorts Set", "Summer Wear", "tshirt.jpg", 899],
    ["Family Festive Combo", "Family Collection", "festive.jpg", 5999], ["Couple Celebration Set", "Couple Collection", "party.jpg", 4999],
    ["Street Style Jacket", "College Wear", "jacket.jpg", 2899], ["Luxury Velvet Gown", "Premium Collection", "luxury.jpg", 7999],
    ["Festive Fashion Set", "Festive Collection", "festive.jpg", 2999], ["Wedding Collection Kurta", "Wedding Collection", "wedding.jpg", 3999],
    ["Casual Co-ord Set", "Casual Wear", "casual.jpg", 2499], ["Traditional Silk Kurta", "Traditional Wear", "traditional.jpg", 2699],
    ["Party Sequin Top", "Party Wear", "top.jpg", 1899], ["Western Midi Dress", "Western Wear", "dress.jpg", 2799],
    ["Office Formal Trousers", "Office Wear", "formal.jpg", 1999], ["Oversized Hoodie", "Oversized Collection", "hoodie.jpg", 2499],
    ["Premium Linen Saree", "Premium Collection", "saree.jpg", 6299], ["Daily Wear Salwar Set", "Daily Wear", "kurti.jpg", 1699],
    ["Designer Party Lehenga", "Designer Collection", "lehenga.jpg", 8999], ["Cotton Printed Dress", "Cotton Collection", "dress.jpg", 1899],
    ["Plus Size Maxi Dress", "Plus Size Collection", "dress.jpg", 2999], ["College Denim Shirt", "College Wear", "jacket.jpg", 1699],
    ["Family Celebration Kurta", "Family Collection", "traditional.jpg", 2299], ["Couple Casual Tees", "Couple Collection", "tshirt.jpg", 1899]
];

const brands = ["Fashion Hub", "Urban Thread", "Aurelia", "House of Style", "Mini Mode"];
const womenTerms = ["Kurti", "Saree", "Lehenga", "Dress", "Gown", "Top", "Skirt", "Kaftan", "Palazzo", "Anarkali"];

const products = catalog.map(([name, category, image, price], index) => {
    const isWomen = womenTerms.some((term) => name.includes(term));
    const isKids = name.includes("Kids") || name.includes("Boys") || name.includes("Girls");
    const originalPrice = Math.round(price / (1 - (index % 4 + 1) * 0.05));

    return {
        name,
        category,
        image,
        price,
        rating: 4 + (index % 2),
        featured: index < 20 || index % 11 === 0,
        trending: index % 6 === 0,
        newArrival: index >= 18 && index % 4 === 0,
        description: `A versatile ${name.toLowerCase()} made for comfort, confident styling and everyday celebrations.`,
        brand: brands[index % brands.length],
        availableSizes: isKids ? ["2-3Y", "4-5Y", "6-7Y", "8-9Y"] : isWomen ? ["S", "M", "L", "XL", "XXL"] : ["S", "M", "L", "XL"],
        availableColors: index % 2 ? ["Black", "Maroon", "Beige"] : ["Blue", "White", "Olive"],
        stock: 8 + (index % 30),
        discount: (index % 4 + 1) * 5,
        originalPrice
    };
});

export default products;
