import React from 'react';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import CartItemsContent from './CartItemsContent';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyCBZRFM1lyUHWGo9dUFSZtRDk3LUPs98Uk";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

function CartWrapper({ cartItems, setOpenCartSheet }) {
    const totalCartAmount = cartItems && cartItems.length > 0 ? cartItems.reduce((sum, currentItem) => sum + (currentItem.salePrice > 0 ? currentItem.salePrice : currentItem?.price) * currentItem?.quantity, 0) : 0
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    async function suggestRecipes() {
        try {
            setLoading(true);
            const ingredients = cartItems.map(item => item.title).join(", ");

            const chatSession = model.startChat({
                generationConfig,
                history: [
                    {
                        role: "user",
                        parts: [
                            { text: "You are an expert in suggesting recipes based on ingredients. I will provide a list of ingredients, and I want you to suggest two dinner recipes that are:\n- Easy to make within 30 minutes.\n- Include detailed steps and the necessary cooking time.\n" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Okay, I'm ready! Give me your list of ingredients. I'll put on my chef's hat and get to work creating two easy and delicious 30-minute dinner recipes for you. Let's go!\n" },
                        ],
                    },
                ],
            });

            const result = await chatSession.sendMessage(`Here are the ingredients I have: ${ingredients}`);
            const recipes = result.response.text();

            navigate('/recipes', { state: { recipes } });
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SheetContent className="sm:max-w-md">
            <SheetHeader>
                <SheetTitle>
                    Your cart
                </SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-4">
                {
                    cartItems && cartItems.length > 0 ? cartItems.map((item) => <CartItemsContent cartItem={item} />) : null
                }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className='font-bold'>Total</span>
                    <span className='font-bold'>${totalCartAmount}</span>
                </div>
            </div>
            <Button onClick={() => {
                navigate('/shop/checkout')
                setOpenCartSheet(false);
            }} className="w-full mt-5">Checkout</Button>

            <Button
                onClick={suggestRecipes}
                disabled={loading}
                className="w-full mt-5"
            >
                {loading ? "Loading..." : "Suggest Ideas for Cooking"}
            </Button>
        </SheetContent>
    )
}

export default CartWrapper