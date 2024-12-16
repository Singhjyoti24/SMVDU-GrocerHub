import React from 'react'
import { Dialog, DialogContent } from '../ui/dialog';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { StarIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/shop/cart-slice';
import { fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import { setProductDetails } from '@/store/shop/products-slice';

function ProductDetails({ open, setOpen, productDetails }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { toast } = useToast();

    function handleAddtoCart(getCurrentProductId, getTotalStock) {
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === getCurrentProductId);
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} can be added for this item`,
                        variant: 'destructive'
                    })
                    return;
                }
            }
        }

        dispatch(
            addToCart({
                userId: user?.id,
                productId: getCurrentProductId,
                quantity: 1,
            })
        ).then((data) => {
            console.log(data)
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast({
                    title: 'Product is added to cart!'
                })
            }
        });
    }

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
    }

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="aspect-square w-full object-cover"
                    />
                </div>
                <div>
                    <div>
                        <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-4">
                            {productDetails?.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p
                            className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? "line-through" : ""
                                }`}
                        >
                            ${productDetails?.price}
                        </p>
                        {productDetails?.salePrice > 0 ? (
                            <p className="text-2xl font-bold text-muted-foreground">
                                ${productDetails?.salePrice}
                            </p>
                        ) : null}
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className="flex items-center gap-0.5">
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                            <StarIcon className='w-5 h-5 fill-primary' />
                        </div>
                        <span className='text-muted-foreground'>(4.5)</span>
                    </div>
                    <div className='mt-5 mb-5'>
                        {productDetails?.totalStock === 0 ? (
                            <Button className="w-full bg-yellow-500 hover:bg-green-600 opacity-60 cursor-not-allowed">
                                Out of Stock
                            </Button>
                        ) : (
                            <Button onClick={() => handleAddtoCart(productDetails?._id, productDetails.totalStock)} className="w-full bg-yellow-500 hover:bg-green-600">Add</Button>
                        )}
                    </div>
                    <Separator />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetails