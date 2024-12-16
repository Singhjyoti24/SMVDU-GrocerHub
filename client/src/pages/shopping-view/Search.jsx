import ProductDetails from '@/components/shopping-view/ProductDetails';
import ShopProductTile from '@/components/shopping-view/ShopProductTile';
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { fetchProductDetails } from '@/store/shop/products-slice';
import { getSearchResults, resetSearchResults } from '@/store/shop/search-slice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function Search() {
    const [keyword, setKeyword] = useState("");
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { searchResults } = useSelector((state) => state.shopSearch);
    const { cartItems } = useSelector(state => state.shopCart);
    const { user } = useSelector(state => state.auth);
    const { productDetails } = useSelector(state => state.shopProducts);
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

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    useEffect(() => {
        if (keyword && keyword.trim() !== '' && keyword.length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000);
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    }, [keyword]);

    useEffect(() => {
        if (productDetails !== null) {
            setOpenDetailsDialog(true);
        }
    }, [productDetails]);

    return (
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input
                        name="keyword"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        className="py-6"
                        placeholder="Search Products..."
                    />
                </div>
            </div>
            {
                !searchResults.length ? <h1 className='text-5xl font-extrabold'>No results found!</h1> : null
            }
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {
                    searchResults.map(item => <ShopProductTile product={item} handleAddtoCart={handleAddtoCart} handleGetProductDetails={handleGetProductDetails} />)
                }
            </div>
            <ProductDetails open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
        </div>
    )
}

export default Search