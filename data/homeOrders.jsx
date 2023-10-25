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
        }
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
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        }
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
        }
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
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        }
    },
    {
        name: "Sophia Brown",
        location: "Tokyo",
        products: [
            { product_name: "T-Shirt", quantity: 3 },
        ],
        datetime: "2023-02-14 16:55",
        id: "pqr678",
        price: 12000,
        status: "Rescheduled",
        imageUrl: '../assets/images/ups.png',
        newMessage: false,
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Luxe Living",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fluxe_living_finds.png?alt=media&token=91aa3e09-658b-4900-8558-d10a12590513&_gl=1*1s90vkk*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjY0MjkuNjAuMC4w"
        }
    }
];