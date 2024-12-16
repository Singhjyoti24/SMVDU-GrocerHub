import { LayoutDashboard, ShoppingBasket, BadgeMinus } from "lucide-react"
import React from "react"

export const registerFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'Enter your user name',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
    },
]

export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
    },
]

export const adminSidebarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icons: React.createElement(LayoutDashboard), // Create JSX dynamically
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icons: React.createElement(ShoppingBasket),
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icons: React.createElement(BadgeMinus),
    }
]

export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "fruits", label: "Fruits & Vegetables" },
            { id: "dairy", label: "Dairy & Bakery" },
            { id: "snacks", label: "Snacks & Beverages" },
            { id: "meat", label: "Meat & Seafood" },
            { id: "pantry", label: "Pantry Essentials" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "amul", label: "Amul" },
            { id: "nestle", label: "Nestlé" },
            { id: "britannia", label: "Britannia" },
            { id: "parle", label: "Parle" },
            { id: "mother-dairy", label: "Mother Dairy" },
            { id: "local", label: "Local Brand" },
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price",
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)",
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
];

export const shoppingViewHeaderMenuItems = [
    {
        id: "home",
        label: "Home",
        path: "/shop/home",
    },

    {
        id: "fruits",
        label: "Fruits",
        path: "/shop/list",
    },
    {
        id: "dairy",
        label: "Dairy",
        path: "/shop/list",
    },
    {
        id: "snacks",
        label: "Snacks",
        path: "/shop/list",
    }, {
        id: "meat",
        label: "Meat",
        path: "/shop/list",
    },
    {
        id: "pantry",
        label: "Pantry Essentials",
        path: "/shop/list",
    },

    {
        id: "products",
        label: "All",
        path: "/shop/list",
    },
    {
        id: "feedback",
        label: "Feedback",
        path: "/shop/feedback",
    },
    {
        id: "search",
        label: "Search",
        path: "/shop/search",
    }
];

export const categoryOptionsMap = {
    fruits: "Fruits & Vegetables",
    dairy: "Dairy & Bakery",
    snacks: "Snacks & Beverages",
    meat: "Meat & Seafood",
    pantry: "Pantry Essentials",
};

export const brandOptionsMap = {
    "amul": "Amul",
    "nestle": "Nestlé",
    "britannia": "Britannia",
    "parle": "Parle",
    "mother-dairy": "Mother Dairy",
    "local": "Local Brand",
};

export const filterOptions = {
    category: [
        { id: "fruits", label: "Fruits & Vegetables" },
        { id: "dairy", label: "Dairy & Bakery" },
        { id: "snacks", label: "Snacks & Beverages" },
        { id: "meat", label: "Meat & Seafood" },
        { id: "pantry", label: "Pantry Essentials" },
    ],
    brand: [
        { id: "amul", label: "Amul" },
        { id: "nestle", label: "Nestlé" },
        { id: "britannia", label: "Britannia" },
        { id: "parle", label: "Parle" },
        { id: "mother-dairy", label: "Mother Dairy" },
        { id: "local", label: "Local Brand" },
    ],
};

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
    {
        label: "Address",
        name: "address",
        componentType: "input",
        type: "text",
        placeholder: "Enter your address",
    },
    {
        label: "City",
        name: "city",
        componentType: "input",
        type: "text",
        placeholder: "Enter your city",
    },
    {
        label: "Pincode",
        name: "pincode",
        componentType: "input",
        type: "text",
        placeholder: "Enter your pincode",
    },
    {
        label: "Phone",
        name: "phone",
        componentType: "input",
        type: "text",
        placeholder: "Enter your phone number",
    },
    {
        label: "Notes",
        name: "notes",
        componentType: "textarea",
        placeholder: "Enter any additional notes",
    },
];