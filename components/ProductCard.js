import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactStars from "react-rating-stars-component";

export default function ProductCard({ data, onAddToCart }) {
  const ratingChanged = () => { };

  return (
    <div className="card">
      <Link href={`/product/${data?.id}`}>
        <span>
          <Image
            src={data?.image}
            alt={data?.name}
            className="rounded shadow object-cover w-full h-64 object-top"
            height="400"
            width="400"
          />
        </span>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${data?.id}`}>
          <h2 className="text-lg">{data?.name}</h2>
        </Link>
        <p className="mb-2">{data?.brand}</p>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          value={data?.rating}
          edit={false}
        />
        <p>₹ {data?.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => onAddToCart(data)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
