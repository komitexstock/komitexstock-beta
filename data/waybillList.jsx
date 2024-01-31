// list of outgoing waybill
export const waybillList = [
    {
        products: [
            { product_name: "Shirt", quantity: 12 },
            { product_name: "Jeans", quantity: 4 },
        ],
        datetime: "2023-03-15 09:30",
        id: "abc123",
        logistics: "Komitex",
        inventory_action: "increment",
        status: "Delivered",
        imageUrl: '../assets/images/komitex..png',
        newMessage: true,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "abc123",
                type: "Waybill",
                order: "Chat Message",
                name: "Komitex",
                imageUrl: '../assets/images/komitex..png',
            })
        },
    },
    {
        products: [
            { product_name: "Shoes", quantity: 10 },
            { product_name: "Socks", quantity: 5 },
        ],
        datetime: "2023-02-22 14:45",
        id: "def456",
        status: "Pending",
        logistics: "Fedex",
        inventory_action: "increment",
        imageUrl: '../assets/images/fedex..png',
        newMessage: false,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "def456",
                type: "Waybill",
                order: "Chat Message",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
            })
        },
    },
    {
        products: [
            { product_name: "Hat", quantity: 8 },
        ],
        datetime: "2023-01-10 12:15",
        id: "ghi789",
        logistics: "Komitex",
        inventory_action: "increment",
        status: "Delivered",
        imageUrl: '../assets/images/komitex..png',
        newMessage: false,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "ghi789",
                type: "Waybill",
                order: "Chat Message",
                name: "Komitex",
                imageUrl: '../assets/images/komitex..png',
            })
        },
    },
    {
        products: [
            { product_name: "Sunglasses", quantity: 4 },
        ],
        datetime: "2023-03-01 11:10",
        id: "mno345",
        logistics: "DHL",
        inventory_action: "increment",
        status: "Pending",
        imageUrl: '../assets/images/dhl..png',
        newMessage: true,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "mno345",
                type: "Waybill",
                order: "Chat Message",
                name: "Dhl",
                imageUrl: '../assets/images/dhl..png',
            })
        },
    },
    {
        products: [
            { product_name: "T-Shirt", quantity: 6 },
        ],
        datetime: "2023-02-14 16:55",
        id: "pqr678",
        status: "Pending",
        logistics: "UPS",
        inventory_action: "increment",
        imageUrl: '../assets/images/ups..png',
        newMessage: false,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "pqr678",
                type: "Waybill",
                order: "Chat Message",
                name: "Ups",
                imageUrl: '../assets/images/ups..png',
            })
        },
    },
    {
        products: [
            { product_name: "Dress", quantity: 3 },
            { product_name: "Handbag", quantity: 2 },
        ],
        datetime: "2023-04-05 15:20",
        id: "stu901",
        status: "Pending",
        logistics: "Fedex",
        inventory_action: "increment",
        imageUrl: '../assets/images/fedex..png',
        newMessage: true,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "stu901",
                type: "Waybill",
                order: "Chat Message",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
            })
        },
    },
    {
        products: [
            { product_name: "Sweater", quantity: 7 },
            { product_name: "Beanie", quantity: 3 },
        ],
        datetime: "2023-05-12 09:55",
        id: "vwx234",
        status: "Delivered",
        logistics: "Komitex",
        inventory_action: "increment",
        imageUrl: '../assets/images/komitex..png',
        newMessage: false,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "vwx234",
                type: "Waybill",
                order: "Chat Message",
                name: "Komitex",
                imageUrl: '../assets/images/komitex..png',
            })
        },
    },
    {
        products: [
            { product_name: "Running Shoes", quantity: 2 },
        ],
        datetime: "2023-06-20 17:30",
        id: "yza567",
        status: "Pending",
        logistics: "DHL",
        inventory_action: "increment",
        imageUrl: '../assets/images/dhl..png',
        newMessage: false,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "yza567",
                type: "Waybill",
                order: "Chat Message",
                name: "Dhl",
                imageUrl: '../assets/images/dhl..png',
            })
        },
    },
    {
        products: [
            { product_name: "Shorts", quantity: 5 },
        ],
        datetime: "2023-07-15 14:10",
        id: "bcd890",
        status: "Delivered",
        logistics: "UPS",
        inventory_action: "increment",
        imageUrl: '../assets/images/ups..png',
        newMessage: true,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "bcd890",
                type: "Waybill",
                order: "Chat Message",
                name: "Ups",
                imageUrl: '../assets/images/ups..png',
            })
        },
    },
    {
        products: [
            { product_name: "Backpack", quantity: 1 },
        ],
        datetime: "2023-08-08 10:45",
        id: "efg123",
        status: "Pending",
        logistics: "Fedex",
        inventory_action: "increment",
        imageUrl: '../assets/images/fedex..png',
        newMessage: false,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "efg123",
                type: "Waybill",
                order: "Chat Message",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
            })
        },
    },
    {
        products: [
            { product_name: "Dress", quantity: 3 },
            { product_name: "Scarf", quantity: 1 },
        ],
        datetime: "2023-05-03 10:20",
        id: "stu961",
        status: "Pending",
        logistics: "Komitex",
        inventory_action: "decrement",
        imageUrl: '../assets/images/komitex..png',
        newMessage: false,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "stu901",
                type: "Waybill",
                order: "Chat Message",
                name: "Komitex",
                imageUrl: '../assets/images/komitex..png',
            })
        },
    },
    {
        products: [
            { product_name: "Pants", quantity: 2 },
        ],
        datetime: "2023-04-01 09:45",
        id: "vwx224",
        status: "Delivered",
        logistics: "Fedex",
        inventory_action: "decrement",
        imageUrl: '../assets/images/fedex..png',
        newMessage: false,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "vwx234",
                type: "Waybill",
                order: "Chat Message",
                name: "Fedex",
                imageUrl: '../assets/images/fedex..png',
            })
        },
    },
    {
        products: [
            { product_name: "Sweater", quantity: 3 },
        ],
        datetime: "2023-05-21 15:30",
        id: "yz0183",
        status: "Pending",
        logistics: "Komitex",
        inventory_action: "decrement",
        imageUrl: '../assets/images/komitex..png',
        newMessage: false,
        navigateToChat: () => {
            navigation.navigate("Chat", {
                id: "yz0123",
                type: "Waybill",
                order: "Chat Message",
                name: "Komitex",
                imageUrl: '../assets/images/komitex..png',
            })
        },
    },
];