// order list
export const homeOrders = [
    {
        name: "Richard Idana",
        location: "Warri",
        products: [
            {
                product_name: "Maybach Sunglasses",
                quantity: 1,
            },
            {
                product_name: "Accurate Watch",
                quantity: 1,
            },
        ],
        datetime: "2023-03-15 09:30",
        id: "abc123",
        price: 50000,
        status: "Delivered",
        imageUrl: '../assets/images/komitex.png',
        newMessage: true,
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        activityType: "Order",
    },
    {
        products: [
            { product_name: "Shirt", quantity: 12 },
            { product_name: "Jeans", quantity: 4 },
        ],
        datetime: "2023-03-15 09:30",
        id: "abc123",
        inventory_action: "increment",
        status: "Delivered",
        newMessage: true,
        logistics: {
            business_name: "OnTrac",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fontrac.png?alt=media&token=67e52ec4-51e3-4032-a6b7-8f9533e1a7b6"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        activityType: "Waybill",
    },
    {
        name: "Jane Smith",
        location: "London",
        products: [
            { product_name: "Shoes", quantity: 1 },
            { product_name: "Socks", quantity: 3 },
        ],
        datetime: "2023-02-22 14:45",
        id: "def456",
        price: 13000,
        status: "Pending",
        imageUrl: '../assets/images/fedex.png',
        newMessage: false,
        logistics: {
            business_name: "Amazon Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Famazon.png?alt=media&token=7941fa73-daa6-4840-9ed8-96371d4b67a6"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        activityType: "Order",
    },
    {
        name: "Michael Johnson",
        location: "Los Angeles",
        products: [
            { product_name: "Hat", quantity: 1 },
        ],
        datetime: "2023-01-10 12:15",
        id: "ghi789",
        price: 14000,
        status: "Dispatched",
        imageUrl: '../assets/images/komitex.png',
        newMessage: true,
        logistics: {
            business_name: "Lasership",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Flasership.png?alt=media&token=803e763b-63e7-4c57-ab6e-beb2a9c35e54&_gl=1*1hxhx8b*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzNDguNjAuMC4w"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        activityType: "Order",
    },
    {
        name: "Robert Davis",
        location: "Berlin",
        products: [
            { product_name: "Sunglasses", quantity: 1 },
        ],
        datetime: "2023-03-01 11:10",
        id: "mno345",
        price: 16000,
        status: "Cancelled",
        imageUrl: '../assets/images/dhl.png',
        newMessage: true,
        logistics: {
            business_name: "DHL",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        activityType: "Order",
    },
    {
        products: [
            { product_name: "Eyeglasses", quantity: 1 },
            { product_name: "Sneakers", quantity: 2 },
        ],
        datetime: "2023-03-15 09:30",
        id: "abc123",
        inventory_action: "decrement",
        status: "Delivered",
        newMessage: true,
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        activityType: "Waybill",
    },
    // {
    //     id: 1,
    //     origin_warehouse: "Warri",
    //     destination_warehouse: "Asaba",
    //     datetime: "12/12/2022",
    //     products: [
    //         {
    //             product_name: "Shirt",
    //             quantity: 2
    //         },
    //         {
    //             product_name: "Shoe",
    //             quantity: 5
    //         },
    //         {
    //             product_name: "Maybach Sunglasses",
    //             quantity: 3
    //         },
    //     ],
    //     newMessage: false,
    //     status: "Pending",
    //     activityType: "StockTransfer",
    // }
];