import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { Store } from "@/utils/Store";
import Link from "next/link";
import { useContext } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";
import { productApi } from "@/api/products/productApi";
import { cartApi } from "@/api/cart/cartApi";
import { ACTIONS, MESSGAGES, TITLES } from "@/config/config";

export default function Home({ carouselProducts, products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const onAddToCart = async (productInfo) => {
    const existItem = cart.cartItems.find((item) => item.id === productInfo.id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const data = await cartApi.addToCart({ "id": productInfo.id })
    if (data) {
      if (data.countInStock < quantity) {
        toast.error(MESSGAGES.PRODUCT_OUT_OF_STOCK);
        return;
      }
      dispatch({
        type: ACTIONS.CART_ADD_ITEM,
        payload: { ...productInfo, quantity: quantity },
      });
      toast.success(MESSGAGES.PRODUCT_ADDED_TO_CART);
    }
  }
  return (
    <Layout title={TITLES.BRAND_NAME}>
      <div className="z-0">
        <Carousel autoPlay={true}>
          {carouselProducts.map((elem) => (
            <div key={elem?.id}>
              <Link href={`/product/${elem?.id}`} passHref>
                <div className="flex">
                  <img src={elem?.banner} alt={elem?.name} />
                </div>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
      <h1 className="h2 my-4">Our Products</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((elem) => (
          <ProductCard
            product={elem}
            key={elem?.id}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const carouselList = await productApi.getCarouselList();
    const productList = await productApi.getAll();
    return {
      props: {
        carouselProducts: carouselList,
        products: productList || [],
      },
    };
  } catch (error) {
    return {
      props: {
        carouselProducts: [],
        products: [],
      },
    };
  }
}