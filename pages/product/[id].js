import Layout from "@/components/Layout";
import { Store } from "@/utils/Store";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import { productApi } from "@/api/products/productApi";
import { cartApi } from "@/api/cart/cartApi";
import { ACTIONS, MESSGAGES, TITLES } from "@/config/config";

export default function ProductDetails(props) {
  const { product } = props;

  const { state, dispatch } = useContext(Store);

  const router = useRouter();

  if (!product) {
    return (
      <Layout title={TITLES.PRODUCT_IS_NOT_FOUND}>
        <div>Product is not found</div>
      </Layout>
    );
  }

  const onAddToCart = async () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.id === product.id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const data = await cartApi.addToCart({ "id": product.id })
    if (data) {
      if (data.countInStock < quantity) {
        toast.error(MESSGAGES.PRODUCT_OUT_OF_STOCK);
        return;
      }
      dispatch({
        type: ACTIONS.CART_ADD_ITEM,
        payload: { ...product, quantity: quantity },
      });
      router.push("/cart");
    } else {
      toast.error(MESSGAGES.TRY_AGAIN);
    }
  };

  return (
    <Layout title={product.name}>
      <div className="grid md:grid-cols-4 md:gap-3 my-2">
        <div className="md:col-span-2 items-center">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-md"
          ></Image>
        </div>
        <div>
          <ul className="leading-9">
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li className="whitespace-nowrap">
              <div className="flex items-center space-x-6">
                <ReactStars
                  count={5}
                  size={26}
                  activeColor="#ffd700"
                  value={product.rating}
                  edit={false}
                />
                {product.totalRatings} Ratings
              </div>
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5 my-2">
            <div className="mb-2 flex  justify-between">
              <div>Price</div>
              <div>₹ {product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={onAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  try {
    const product = await productApi.getDetails({ "id": id });
    return {
      props: {
        product: product || null,
      },
    };
  } catch (error) {
    return {
      props: {
        product: null,
      },
    };
  }
}