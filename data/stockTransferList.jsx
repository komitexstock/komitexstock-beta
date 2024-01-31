// stock transfer dummy data
export const stockTransferList = [
    {
        id: 1,
        onPress: () => navigation.navigate("Chat", {id: "1"}),
        origin_warehouse: "Warri",
        destination_warehouse: "Asaba",
        datetime: "12/12/2022",
        products: [
            {
                product_name: "Shirt",
                quantity: 2
            },
            {
                product_name: "Shoe",
                quantity: 5
            },
            {
                product_name: "Maybach Sunglasses",
                quantity: 3
            },
        ],
        newMessage: false,
        status: "Delivered",
    },
    {
        id: 2,
        onPress: () => navigation.navigate("Chat", {id: "1"}),
        origin_warehouse: "Warri",
        destination_warehouse: "Benin",
        datetime: "12/12/2022",
        products: [
            {
                product_name: "Shirt",
                quantity: 2
            },
            {
                product_name: "Shoe",
                quantity: 1
            },
            {
                product_name: "Maybach Sunglasses",
                quantity: 3
            }
        ],
        newMessage: false,
        status: "Pending",
    },
    {
        id: 3,
        onPress: () => navigation.navigate("Chat", {id: "1"}),
        origin_warehouse: "Warri",
        destination_warehouse: "Agbor",
        datetime: "12/13/2022",
        products: [
            {
                product_name: "Laptop",
                quantity: 1
            },
            {
                product_name: "Tablet",
                quantity: 2
            }
        ],
        newMessage: true,
        status: "Pending",
    },
    {
        id: 4,
        onPress: () => navigation.navigate("Chat", {id: "1"}),
        origin_warehouse: "Asaba",
        destination_warehouse: "Kwale",
        datetime: "12/14/2022",
        products: [
            {
                product_name: "Phone",
                quantity: 3
            }
        ],
        newMessage: false,
        status: "Delivered",
    },
    {
        id: 5,
        onPress: () => navigation.navigate("Chat", {id: "1"}),
        origin_warehouse: "Agbor",
        destination_warehouse: "Isoko",
        datetime: "12/15/2022",
        products: [
            {
                product_name: "Headphones",
                quantity: 2
            }
        ],
        newMessage: true,
        status: "Delivered",
    },
    {
        id: 6,
        onPress: () => navigation.navigate("Chat", {id: "1"}),
        origin_warehouse: "Kwale",
        destination_warehouse: "Warri",
        datetime: "12/16/2022",
        products: [
            {
                product_name: "TV",
                quantity: 1
            }
        ],
        newMessage: false,
        status: "Pending",
    },
    {
        id: 7,
        onPress: () => navigation.navigate("Chat", {id: "1"}),
        origin_warehouse: "Isoko",
        destination_warehouse: "Asaba",
        datetime: "12/17/2022",
        products: [
            {
                product_name: "Camera",
                quantity: 1
            },
            {
                product_name: "Tripod",
                quantity: 1
            }
        ],
        newMessage: false,
        status: "Delivered",
    }
]
