const testitems = [
    {
        "name": "Coffee Mug",
        "category": "Kitchenware",
        "description": "A classic ceramic coffee mug",
        "orders_needed": 20,
        "orders_now": 5,
        "price": 10,
        "URL": "http://coffeemug.com",
        "end_date": "2023-11-30"
    },
    {
        "name": "Desk Lamp",
        "category": "Home Office",
        "description": "Adjustable LED desk lamp",
        "orders_needed": 15,
        "orders_now": 2,
        "price": 30,
        "URL": "http://desklamp.com",
        "end_date": "2023-12-15"
    },
    {
        "name": "Running Shoes",
        "category": "Footwear",
        "description": "Comfortable athletic shoes for running",
        "orders_needed": 30,
        "orders_now": 8,
        "price": 60,
        "URL": "http://runningshoes.com",
        "end_date": "2023-12-10"
    },
    {
        "name": "Notebook",
        "category": "Stationery",
        "description": "Lined paper notebook with a sturdy cover",
        "orders_needed": 25,
        "orders_now": 3,
        "price": 5,
        "URL": "http://notebook.com",
        "end_date": "2023-12-20"
    },
    {
        "name": "Bicycle",
        "category": "Sports",
        "description": "A versatile two-wheeled vehicle for commuting",
        "orders_needed": 12,
        "orders_now": 1,
        "price": 200,
        "URL": "http://bicycle.com",
        "end_date": "2023-11-25"
    },
    {
        "name": "Vintage Vinyl Record",
        "category": "Music",
        "description": "Rare collectible vinyl record",
        "orders_needed": 30,
        "orders_now": 8,
        "price": 50,
        "URL": "http://vintagerecord.com",
        "start_date": "2023-10-01",
        "end_date": "2023-10-31"
    },
    {
        "name": "Gourmet Chocolate Box",
        "category": "Food",
        "description": "Assorted premium chocolates",
        "orders_needed": 40,
        "orders_now": 12,
        "price": 20,
        "URL": "http://chocolatebox.com",
        "start_date": "2023-10-05",
        "end_date": "2023-11-05"
    },
    {
        "name": "Artisanal Cheese Set",
        "category": "Food",
        "description": "Selection of handcrafted cheeses",
        "orders_needed": 25,
        "orders_now": 5,
        "price": 30,
        "URL": "http://cheeseset.com",
        "start_date": "2023-10-08",
        "end_date": "2023-11-08"
    },
    {
        "name": "Designer Sunglasses",
        "category": "Fashion",
        "description": "Trendy and stylish sunglasses",
        "orders_needed": 50,
        "orders_now": 10,
        "price": 100,
        "URL": "http://sunglasses.com",
        "start_date": "2023-10-10",
        "end_date": "2023-11-10"
    },
    {
        "name": "Handcrafted Wooden Table",
        "category": "Furniture",
        "description": "Custom-made wooden table",
        "orders_needed": 15,
        "orders_now": 2,
        "price": 150,
        "URL": "http://woodentable.com",
        "start_date": "2023-10-12",
        "end_date": "2023-11-12"
    },
    {
        "name": "Portable Bluetooth Speaker",
        "category": "Electronics",
        "description": "Wireless speaker with rich sound",
        "orders_needed": 35,
        "orders_now": 6,
        "price": 60,
        "URL": "http://bluetoothspeaker.com",
        "start_date": "2023-10-15",
        "end_date": "2023-11-15"
    },
    {
        "name": "Linen Throw Pillows",
        "category": "Home Decor",
        "description": "Elegant linen throw pillows",
        "orders_needed": 20,
        "orders_now": 4,
        "price": 25,
        "URL": "http://linenthrowpillows.com",
        "start_date": "2023-10-18",
        "end_date": "2023-11-18"
    },
    {
        "name": "Digital Drawing Tablet",
        "category": "Technology",
        "description": "High-quality digital art tablet",
        "orders_needed": 45,
        "orders_now": 7,
        "price": 80,
        "URL": "http://drawingtablet.com",
        "start_date": "2023-10-20",
        "end_date": "2023-11-20"
    },
    {
        "name": "Organic Herbal Tea Set",
        "category": "Food",
        "description": "Variety of organic herbal teas",
        "orders_needed": 18,
        "orders_now": 3,
        "price": 15,
        "URL": "http://herbalteaset.com",
        "start_date": "2023-10-22",
        "end_date": "2023-11-22"
    },
    {
        "name": "Stainless Steel Water Bottle",
        "category": "Outdoor",
        "description": "Durable and eco-friendly water bottle",
        "orders_needed": 25,
        "orders_now": 5,
        "price": 12,
        "URL": "http://waterbottle.com",
        "start_date": "2023-10-25",
        "end_date": "2023-11-25"
    },
    {
        "name": "Classic Leather Wallet",
        "category": "Accessories",
        "description": "Timeless leather wallet with multiple compartments",
        "orders_needed": 40,
        "orders_now": 10,
        "price": 50,
        "URL": "http://leatherwallet.com",
        "start_date": "2023-10-02",
        "end_date": "2023-11-02"
    },
    {
        "name": "Gourmet Coffee Beans",
        "category": "Food",
        "description": "Single-origin specialty coffee beans",
        "orders_needed": 30,
        "orders_now": 5,
        "price": 18,
        "URL": "http://coffeebeans.com",
        "start_date": "2023-10-04",
        "end_date": "2023-11-04"
    },
    {
        "name": "Modern Wall Clock",
        "category": "Home Decor",
        "description": "Sleek and minimalist wall clock",
        "orders_needed": 25,
        "orders_now": 4,
        "price": 35,
        "URL": "http://wallclock.com",
        "start_date": "2023-10-07",
        "end_date": "2023-11-07"
    },
    {
        "name": "Fitness Tracker Watch",
        "category": "Fitness",
        "description": "Smartwatch with advanced fitness tracking features",
        "orders_needed": 50,
        "orders_now": 8,
        "price": 120,
        "URL": "http://fitnesstracker.com",
        "start_date": "2023-10-09",
        "end_date": "2023-11-09"
    },
    {
        "name": "Cotton Bath Towel Set",
        "category": "Home",
        "description": "Soft and absorbent cotton towel set",
        "orders_needed": 20,
        "orders_now": 3,
        "price": 28,
        "URL": "http://bathtowels.com",
        "start_date": "2023-10-11",
        "end_date": "2023-11-11"
    },
    {
        "name": "Bluetooth Earbuds",
        "category": "Electronics",
        "description": "Wireless earbuds with noise cancellation",
        "orders_needed": 35,
        "orders_now": 6,
        "price": 70,
        "URL": "http://bluetoothearbuds.com",
        "start_date": "2023-10-13",
        "end_date": "2023-11-13"
    },
    {
        "name": "Indoor Potted Plant",
        "category": "Home Decor",
        "description": "Low-maintenance indoor plant in decorative pot",
        "orders_needed": 15,
        "orders_now": 2,
        "price": 20,
        "URL": "http://pottedplant.com",
        "start_date": "2023-10-16",
        "end_date": "2023-11-16"
    },
    {
        "name": "HD Action Camera",
        "category": "Electronics",
        "description": "High-definition action camera for outdoor adventures",
        "orders_needed": 45,
        "orders_now": 7,
        "price": 90,
        "URL": "http://actioncamera.com",
        "start_date": "2023-10-19",
        "end_date": "2023-11-19"
    },
    {
        "name": "Gourmet Pasta Sampler",
        "category": "Food",
        "description": "Assortment of artisanal pasta varieties",
        "orders_needed": 18,
        "orders_now": 3,
        "price": 25,
        "URL": "http://pastasampler.com",
        "start_date": "2023-10-21",
        "end_date": "2023-11-21"
    },
    {
        "name": "Stylish Sunglasses",
        "category": "Fashion",
        "description": "Fashionable sunglasses with UV protection",
        "orders_needed": 25,
        "orders_now": 5,
        "price": 40,
        "URL": "http://stylishsunglasses.com",
        "start_date": "2023-10-24",
        "end_date": "2023-11-24"
    }
]

module.exports = testitems