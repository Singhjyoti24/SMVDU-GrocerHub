import React, { useState } from 'react';
import bannerOne from '../../assets/banner1.webp';
import { AppleIcon, CloudCog, CloudFog, CloudLightning, MilkIcon, Package, Rainbow, RainbowIcon, Umbrella, UmbrellaIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShopProductTile from '@/components/shopping-view/ShopProductTile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetails from '@/components/shopping-view/ProductDetails';

const categoriesWithIcon = [
  { id: "fruits", label: "Fruits & Vegetables", icon: AppleIcon },
  { id: "dairy", label: "Dairy & Bakery", icon: MilkIcon },
  { id: "snacks", label: "Snacks & Beverages", icon: CloudLightning },
  { id: "meat", label: "Meat & Seafood", icon: UmbrellaIcon },
  { id: "pantry", label: "Pantry Essentials", icon: CloudCog },
];

const brandsWithIcon = [
  { id: "amul", label: "Amul", icon: MilkIcon },
  { id: "nestle", label: "Nestlé", icon: RainbowIcon },
  { id: "britannia", label: "Britannia", icon: Rainbow },
  { id: "parle", label: "Parle", icon: Package },
  { id: "mother-dairy", label: "Mother Dairy", icon: Umbrella },
  { id: "local", label: "Local Brand", icon: CloudFog },
];

function MainHome() {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector(state => state.shopProducts);
  const { user } = useSelector(state => state.auth);
  const [openDetailsDialog, setOpenDetaislDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/list`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    console.log(getCurrentProductId);

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

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetaislDialog(true);
    }
  }, [productDetails]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
  }, [dispatch]);



  console.log(productList, 'product-list');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        <img
          src={bannerOne}
          key="main-home-img"
          className={`absolute top-0 left-0 object-cover transition-opacity duration-1000`}
        />
      </div>

      <section className='py-12 bg-gray-50'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl text-lime-600 font-bold text-center mb-8'>
            Shop by category
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              categoriesWithIcon.map(categoryItem =>
                <Card onClick={() => handleNavigateToListingPage(categoryItem, 'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                    <span className='font-bold'>{categoryItem.label}</span>
                  </CardContent>
                </Card>
              )
            }
          </div>
        </div>
      </section>

      <section className='py-12 bg-gray-50'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl font-bold text-lime-600 text-center mb-8'>
            Shop by Brand
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              brandsWithIcon.map(brandItem =>
                <Card onClick={() => handleNavigateToListingPage(brandItem, 'brand')} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <brandItem.icon className='w-12 h-12 mb-4 text-primary' />
                    <span className='font-bold'>{brandItem.label}</span>
                  </CardContent>
                </Card>
              )
            }
          </div>
        </div>
      </section>

      <section className='py-12'>
        <div className="container mx-auto px-4">
          <h2 className='text-3xl font-bold text-center mb-8'>
            Feature products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              productList && productList.length > 0 ? productList.map(productItem => <ShopProductTile handleGetProductDetails={handleGetProductDetails} product={productItem} handleAddtoCart={handleAddtoCart} />) : null
            }
          </div>
        </div>
      </section>
      <ProductDetails open={openDetailsDialog} setOpen={setOpenDetaislDialog} productDetails={productDetails} />
    </div>
  );
}

export default MainHome