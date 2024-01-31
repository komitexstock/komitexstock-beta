// list of outgoing waybill
export const waybillList = [
    {
        products: [
            { product_name: "Shirt", quantity: 12 },
            { product_name: "Jeans", quantity: 4 },
        ],
        datetime: "2023-03-15 09:30",
        id: "abc123",
        inventory_action: "increment",
        status: "Delivered",
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: true,
    },
    {
        products: [
            { product_name: "Shoes", quantity: 10 },
            { product_name: "Socks", quantity: 5 },
        ],
        datetime: "2023-02-22 14:45",
        id: "def456",
        status: "Pending",
        inventory_action: "increment",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: false,
    },
    {
        products: [
            { product_name: "Hat", quantity: 8 },
        ],
        datetime: "2023-01-10 12:15",
        id: "ghi789",
        inventory_action: "increment",
        status: "Delivered",
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: false,
    },
    {
        products: [
            { product_name: "Sunglasses", quantity: 4 },
        ],
        datetime: "2023-03-01 11:10",
        id: "mno345",
        inventory_action: "increment",
        status: "Pending",
        logistics: {
            business_name: "DHL",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: true,
    },
    {
        products: [
            { product_name: "T-Shirt", quantity: 6 },
        ],
        datetime: "2023-02-14 16:55",
        id: "pqr678",
        status: "Pending",
        inventory_action: "increment",
        logistics: {
            business_name: "Lasership",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Flasership.png?alt=media&token=803e763b-63e7-4c57-ab6e-beb2a9c35e54&_gl=1*1hxhx8b*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzNDguNjAuMC4w"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        newMessage: false,
    },
    {
        products: [
            { product_name: "Dress", quantity: 3 },
            { product_name: "Handbag", quantity: 2 },
        ],
        datetime: "2023-04-05 15:20",
        id: "stu901",
        status: "Pending",
        inventory_action: "increment",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: true,
    },
    {
        products: [
            { product_name: "Sweater", quantity: 7 },
            { product_name: "Beanie", quantity: 3 },
        ],
        datetime: "2023-05-12 09:55",
        id: "vwx234",
        status: "Delivered",
        inventory_action: "increment",
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: false,
    },
    {
        products: [
            { product_name: "Running Shoes", quantity: 2 },
        ],
        datetime: "2023-06-20 17:30",
        id: "yza567",
        status: "Pending",
        inventory_action: "increment",
        logistics: {
            business_name: "DHL",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fdhl.png?alt=media&token=e113f106-0eaf-420e-9fe4-488cb8e6c26d"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: false,
    },
    {
        products: [
            { product_name: "Shorts", quantity: 5 },
        ],
        datetime: "2023-07-15 14:10",
        id: "bcd890",
        status: "Delivered",
        inventory_action: "increment",
        logistics: {
            business_name: "Lasership",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Flasership.png?alt=media&token=803e763b-63e7-4c57-ab6e-beb2a9c35e54&_gl=1*1hxhx8b*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzNDguNjAuMC4w"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        newMessage: true,
    },
    {
        products: [
            { product_name: "Backpack", quantity: 1 },
        ],
        datetime: "2023-08-08 10:45",
        id: "efg123",
        status: "Pending",
        inventory_action: "increment",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: false,
    },
    {
        products: [
            { product_name: "Dress", quantity: 3 },
            { product_name: "Scarf", quantity: 1 },
        ],
        datetime: "2023-05-03 10:20",
        id: "stu961",
        status: "Pending",
        inventory_action: "decrement",
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: false,
    },
    {
        products: [
            { product_name: "Pants", quantity: 2 },
        ],
        datetime: "2023-04-01 09:45",
        id: "vwx224",
        status: "Delivered",
        inventory_action: "decrement",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: false,
    },
    {
        products: [
            { product_name: "Sweater", quantity: 3 },
        ],
        datetime: "2023-05-21 15:30",
        id: "yz0183",
        status: "Pending",
        inventory_action: "decrement",
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },
        newMessage: false,
    },
];