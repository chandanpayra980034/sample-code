import { Store } from "@/utils/Store";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TITLES } from "@/config/config";

function Layout({ title, children }) {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const [cardItemsCount, setCardItemsCount] = useState(0);

  useEffect(() => {
    setCardItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const [query, setQuery] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search/?query=${query}`);
  };

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Head>
        <title>{title ? title : TITLES.BRAND_NAME} </title>
        <meta name="description" content="Ong Bong Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer position="top-right" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-14 justify-between shadow-md  items-center px-4">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <span className="text-2xl font-bold">{TITLES.BRAND_NAME}</span>
              </Link>
            </div>

            <form
              className="mx-auto  hidden w-full justify-center md:flex"
              onSubmit={submitHandler}
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1.5 text-sm  focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-blue-400 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>

            <div className="hidden md:flex">
              <Link href="/cart">
                <span className="p-2">Cart</span>
                {cardItemsCount > 0 ? (
                  <span className="rounded-full bg-red-600 p-2 py-1 text-xs font-bold text-white">
                    {cardItemsCount}
                  </span>
                ) : null}
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                type="button"
                className="mobile-menu-button"
                onClick={() => setToggle(!toggle)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </button>
            </div>
          </nav>
          <div
            id="mobile-menu"
            className={`${toggle === false ? "hidden" : ""
              } md:hidden flex flex-col my-3 mx-3 p-2 bg-gray-50 rounded-md  shadow-md`}
          >
            <form
              className="py-4 px-4 text-sm mx-auto flex"
              onSubmit={submitHandler}
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none p-1.5 text-sm  focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-blue-400 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>

            <div className="flex flex-col space-y-3 mx-auto">
              <div>
                <Link href="/cart">
                  <span className="p-2">Cart</span>
                  {cardItemsCount > 0 ? (
                    <span className="rounded-full bg-red-600 p-2 py-1 text-xs font-bold text-white">
                      {cardItemsCount}
                    </span>
                  ) : null}
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="container m-auto mt-4 xl:px-14 md:px-12 px-8">
          {children}
        </main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <p>Made with ❤️</p>
        </footer>
      </div>
    </>
  );
}

export default Layout;
