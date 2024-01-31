// orders full list
export const orderList = [
    {
        name: "John Doe",
        location: "New York",
        products: [
            { product_name: "Shirt", quantity: 2 },
            { product_name: "Jeans", quantity: 1 },
        ],
        phone_number: ["080186289374", "080967751200"],
        datetime: "2023-03-15 09:30",
        id: "abc123",
        price: 15000,
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },        status: "Delivered",
        newMessage: true,
    },
    {
        name: "Jane Smith",
        location: "London",
        products: [
            { product_name: "Shoes", quantity: 1 },
            { product_name: "Socks", quantity: 3 },
        ],
        phone_number: ["080860404347"],
        datetime: "2023-02-22 14:45",
        id: "def456",
        price: 13000,
        status: "Pending",
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
        name: "Michael Johnson",
        location: "Los Angeles",
        products: [
            { product_name: "Hat", quantity: 1 },
        ],
        phone_number: ["080462257637", "080751031530"],
        datetime: "2023-01-10 12:15",
        id: "ghi789",
        price: 14000,
        status: "Dispatched",
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
        name: "Robert Davis",
        location: "Berlin",
        products: [
            { product_name: "Sunglasses", quantity: 1 },
        ],
        phone_number: ["080396596050"],
        datetime: "2023-03-01 11:10",
        id: "mno345",
        price: 16000,
        status: "Delivered",
        logistics: {
            business_name: "Amazon Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Famazon.png?alt=media&token=7941fa73-daa6-4840-9ed8-96371d4b67a6"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: true,
    },
    {
        name: "Sophia Brown",
        location: "Tokyo",
        products: [
            { product_name: "T-Shirt", quantity: 3 },
        ],
        phone_number: ["080378780801", "080918807202"],
        datetime: "2023-02-14 16:55",
        id: "pqr678",
        price: 12000,
        logistics: "UPS",
        logistics: {
            business_name: "Amazon Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Famazon.png?alt=media&token=7941fa73-daa6-4840-9ed8-96371d4b67a6"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: false,
    },
    {
        name: "Emily Wilson",
        location: "Paris",
        products: [
            { product_name: "Dress", quantity: 1 },
            { product_name: "Scarf", quantity: 2 },
        ],
        phone_number: ["080945349876"],
        datetime: "2023-05-03 10:20",
        id: "stu901",
        price: 25000,
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
        name: "David Johnson",
        location: "New York",
        products: [
            { product_name: "Pants", quantity: 2 },
        ],
        phone_number: ["080858451915", "080413137765"],
        datetime: "2023-04-01 09:45",
        id: "vwx234",
        price: 18000,
        status: "Pending",
        logistics: {
            business_name: "OnTrac",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fontrac.png?alt=media&token=67e52ec4-51e3-4032-a6b7-8f9533e1a7b6"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        newMessage: false,
    },
    {
        name: "Olivia Taylor",
        location: "London",
        products: [
            { product_name: "Sweater", quantity: 1 },
        ],
        phone_number: ["080845837259"],
        datetime: "2023-05-21 15:30",
        id: "yz0123",
        price: 19000,
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },        status: "Dispatched",
        newMessage: false,
    },
    {
        name: "Ethan Wilson",
        location: "Los Angeles",
        products: [
            { product_name: "Jacket", quantity: 1 },
        ],
        phone_number: ["080121868652"],
        datetime: "2023-04-11 13:20",
        id: "bcd345",
        price: 22000,
        status: "Cancelled",
        logistics: {
            business_name: "OnTrac",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fontrac.png?alt=media&token=67e52ec4-51e3-4032-a6b7-8f9533e1a7b6"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        newMessage: false,
    },
    {
        name: "Emma Davis",
        location: "Berlin",
        products: [
            { product_name: "Watch", quantity: 1 },
        ],
        phone_number: ["080357205693"],
        datetime: "2023-05-07 10:50",
        id: "efg567",
        price: 28000,
        status: "Delivered",
        logistics: {
            business_name: "OnTrac",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fontrac.png?alt=media&token=67e52ec4-51e3-4032-a6b7-8f9533e1a7b6"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        newMessage: false,
    },
    {
        name: "William Smith",
        location: "Tokyo",
        products: [
            { product_name: "Trousers", quantity: 2 },
        ],
        phone_number: ["080266879509"],
        datetime: "2023-04-25 16:15",
        id: "ghi678",
        price: 20000,
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },        status: "Rescheduled",
        newMessage: true,
    },
    {
        name: "Isabella Johnson",
        location: "Paris",
        products: [
            { product_name: "Blouse", quantity: 1 },
            { product_name: "Skirt", quantity: 1 },
        ],
        phone_number: ["080228206684", "080304276185"],
        datetime: "2023-06-01 11:30",
        id: "jkl901",
        price: 30000,
        logistics: {
            business_name: "OnTrac",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fontrac.png?alt=media&token=67e52ec4-51e3-4032-a6b7-8f9533e1a7b6"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        status: "Pending",
        newMessage: true,
    },
    {
        name: "Mia Taylor",
        location: "London",
        products: [
            { product_name: "Coat", quantity: 1 },
        ],
        phone_number: ["080719383444"],
        datetime: "2023-05-17 14:50",
        id: "mno234",
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },        price: 26000,
        status: "Dispatched",
        newMessage: false,
    },
    {
        name: "James Brown",
        location: "Los Angeles",
        products: [
            { product_name: "Gloves", quantity: 1 },
        ],
        phone_number: ["080690847443"],
        datetime: "2023-04-05 12:05",
        id: "pqr345",
        price: 23000,
        status: "Dispatched",
        logistics: {
            business_name: "OnTrac",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fontrac.png?alt=media&token=67e52ec4-51e3-4032-a6b7-8f9533e1a7b6"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        newMessage: false,
    },
    {
        name: "Alexander Davis",
        location: "Berlin",
        products: [
            { product_name: "Belt", quantity: 1 },
        ],
        phone_number: ["080122962992"],
        datetime: "2023-06-03 09:40",
        id: "stu567",
        price: 32000,
        logistics: "UPS",
        logistics: {
            business_name: "Amazon Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Famazon.png?alt=media&token=7941fa73-daa6-4840-9ed8-96371d4b67a6"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: true,
    },
    {
        name: "Charlotte Wilson",
        location: "Tokyo",
        products: [
            { product_name: "Sweatshirt", quantity: 1 },
        ],
        phone_number: ["080979884374", "080711181621"],
        datetime: "2023-05-11 15:55",
        id: "vwx678",
        price: 24000,
        logistics: {
            business_name: "Komitex Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fkomitex.png?alt=media&token=a8039272-66b6-4e24-8ab1-a4dfd40503f8&_gl=1*xpkuw*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYwMTguNjAuMC4w"
        },
        merchant: {
            business_name: "Style Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fstyle_bazaar.png?alt=media&token=b5be5c42-901a-4d49-bb15-a401b630f8a1&_gl=1*l5029i*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYxNDkuMjkuMC4w"
        },        status: "Rescheduled",
        newMessage: true,
    },
    {
        name: "Henry Johnson",
        location: "Paris",
        products: [
            { product_name: "Jeans", quantity: 1 },
            { product_name: "T-Shirt", quantity: 2 },
        ],
        phone_number: ["080608173820", "080539108385"],
        datetime: "2023-06-09 11:15",
        id: "yz0124",
        price: 35000,
        status: "Delivered",
        logistics: {
            business_name: "OnTrac",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fontrac.png?alt=media&token=67e52ec4-51e3-4032-a6b7-8f9533e1a7b6"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        newMessage: false,
    },
    {
        name: "Amelia Taylor",
        location: "London",
        products: [
            { product_name: "Shirt", quantity: 1 },
        ],
        phone_number: ["080782045192"],
        datetime: "2023-05-26 16:40",
        id: "bcd456",
        price: 27000,
        status: "Dispatched",
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
        name: "Benjamin Davis",
        location: "Los Angeles",
        products: [
            { product_name: "Socks", quantity: 2 },
        ],
        phone_number: ["080378482469"],
        datetime: "2023-04-15 11:55",
        id: "efg789",
        price: 30000,
        status: "Pending",
        logistics: {
            business_name: "OnTrac",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Fontrac.png?alt=media&token=67e52ec4-51e3-4032-a6b7-8f9533e1a7b6"
        },
        merchant: {
            business_name: "Eco Savvy Emporium Bazaar",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Feco_savvy_emporium.png?alt=media&token=c4985c1d-c6f0-48f7-b744-4b030851d53a&_gl=1*j2ttmz*_ga*MTQzMDMxNDAxMS4xNjg0NjU0ODky*_ga_CW55HF8NVT*MTY5ODI2NjAxOC43MC4xLjE2OTgyNjYzODAuMjguMC4w"
        },
        newMessage: true,
    },
    {
        name: "Victoria Smith",
        location: "Berlin",
        products: [
            { product_name: "Sunglasses", quantity: 1 },
        ],
        phone_number: ["080537402885", "080518403617"],
        datetime: "2023-06-13 10:25",
        id: "ghi901",
        price: 38000,
        status: "Cancelled",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: false,
    },
    {
        name: "Liam Williams",
        location: "San Francisco",
        products: [
          { product_name: "Shoes", quantity: 1 },
        ],
        phone_number: ["080361204464"],
        datetime: "2023-09-01 09:15",
        id: "fedex101",
        price: 22000,
        status: "Dispatched",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: true,
    },
    {
        name: "Liam Thomas",
        location: "Seattle",
        products: [
          { product_name: "Gloves", quantity: 1 },
        ],
        phone_number: ["080410728759"],
        datetime: "2023-08-01 09:15",
        id: "ups001",
        price: 22000,
        status: "Dispatched",
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
        name: "Olivia Anderson",
        location: "Seattle",
        products: [
          { product_name: "Jacket", quantity: 1 },
          { product_name: "Socks", quantity: 3 },
        ],
        phone_number: ["080412854570"],
        datetime: "2023-08-28 14:30",
        id: "fedex102",
        price: 18000,
        status: "Delivered",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: false,
    },
    {
        name: "Olivia Brown",
        location: "Phoenix",
        products: [
          { product_name: "Belt", quantity: 1 },
        ],
        phone_number: ["080308855123"],
        datetime: "2023-08-05 14:30",
        id: "ups002",
        price: 18000,
        status: "Delivered",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: false,
    },
    {
        name: "Ella Wilson",
        location: "Denver",
        products: [
          { product_name: "Sweatshirt", quantity: 1 },
        ],
        phone_number: ["080292741676", "080569485305"],
        datetime: "2023-08-10 16:45",
        id: "ups003",
        price: 15000,
        status: "Cancelled",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: true,
    },
    {
        name: "Sophia Martinez",
        location: "Denver",
        products: [
          { product_name: "T-Shirt", quantity: 2 },
        ],
        phone_number: ["080685843121", "080652042584"],
        datetime: "2023-08-25 16:45",
        id: "fedex103",
        price: 15000,
        status: "Cancelled",
        logistics: {
            business_name: "Fedex",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Ffedex.png?alt=media&token=d943aea6-37ec-4f61-a589-01ad7bdd1299"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: true,
    },
    {
        name: "James Davis",
        location: "Miami",
        products: [
          { product_name: "Dress", quantity: 1 },
        ],
        phone_number: ["080692702150", "080613163067"],
        datetime: "2023-08-22 10:20",
        id: "fedex104",
        price: 26000,
        status: "Pending",
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
        name: "William Taylor",
        location: "Phoenix",
        products: [
          { product_name: "Sweater", quantity: 1 },
        ],
        phone_number: ["080790382784"],
        datetime: "2023-08-19 15:30",
        id: "fedex105",
        price: 28000,
        status: "Rescheduled",
        logistics: {
            business_name: "Amazon Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Famazon.png?alt=media&token=7941fa73-daa6-4840-9ed8-96371d4b67a6"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: true,
    },
    {
        name: "Ella Harris",
        location: "Las Vegas",
        products: [
          { product_name: "Coat", quantity: 1 },
        ],
        phone_number: ["080106644976", "080823118857"],
        datetime: "2023-08-16 13:20",
        id: "fedex106",
        price: 25000,
        status: "Delivered",
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
        name: "James Martin",
        location: "Dallas",
        products: [
          { product_name: "Coat", quantity: 1 },
        ],
        phone_number: ["080493257998"],
        datetime: "2023-08-15 10:20",
        id: "ups004",
        price: 26000,
        status: "Pending",
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
        name: "Aiden Smith",
        location: "Atlanta",
        products: [
          { product_name: "Dress", quantity: 1 },
        ],
        phone_number: ["080238134144", "080502441770"],
        datetime: "2023-08-20 13:20",
        id: "ups005",
        price: 25000,
        status: "Delivered",
        logistics: {
            business_name: "Amazon Logistics",
            banner_image: "https://firebasestorage.googleapis.com/v0/b/komitex-e7659.appspot.com/o/banners%2Famazon.png?alt=media&token=7941fa73-daa6-4840-9ed8-96371d4b67a6"
        },
        merchant: {
            business_name: "Mega Enterpise",
            banner_image: null,
        },
        newMessage: true,
    },
    {
        name: "Liam Davis",
        location: "Chicago",
        products: [
          { product_name: "Shoes", quantity: 1 },
        ],
        phone_number: ["080129015749", "080224189804"],
        datetime: "2023-08-01 09:15",
        id: "dhl001",
        price: 22000,
        status: "Dispatched",
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
        name: "William Johnson",
        location: "Miami",
        products: [
          { product_name: "Jeans", quantity: 1 },
          { product_name: "T-Shirt", quantity: 2 },
        ],
        phone_number: ["080286015885"],
        datetime: "2023-08-05 14:30",
        id: "dhl002",
        price: 18000,
        status: "Delivered",
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
        name: "Sophia Smith",
        location: "Los Angeles",
        products: [
          { product_name: "Dress", quantity: 1 },
        ],
        phone_number: ["080119914260", "080572474789"],
        datetime: "2023-08-10 16:45",
        id: "dhl003",
        price: 15000,
        status: "Cancelled",
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
        name: "James Brown",
        location: "San Francisco",
        products: [
          { product_name: "Sweater", quantity: 1 },
        ],
        phone_number: ["080659461378", "080305024060"],
        datetime: "2023-08-15 10:20",
        id: "dhl004",
        price: 26000,
        status: "Pending",
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
        name: "Aiden Wilson",
        location: "New York",
        products: [
          { product_name: "Coat", quantity: 1 },
        ],
        phone_number: ["080339794570", "080744050079"],
        datetime: "2023-08-20 13:20",
        id: "dhl005",
        price: 25000,
        status: "Delivered",
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
        name: "Aiden Jackson",
        location: "Atlanta",
        products: [
          { product_name: "Gloves", quantity: 1 },
        ],
        phone_number: ["080110930235", "080749591913"],
        datetime: "2023-08-13 12:05",
        id: "fedex107",
        price: 23000,
        status: "Dispatched",
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
        name: "Mia Thomas",
        location: "Philadelphia",
        products: [
          { product_name: "Belt", quantity: 1 },
        ],
        phone_number: ["080186508788", "080867333324"],
        datetime: "2023-08-10 09:40",
        id: "fedex108",
        price: 32000,
        status: "Rescheduled",
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
];