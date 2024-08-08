import { ShoppingBagOpen } from "@phosphor-icons/react";
import { cn } from "../../libs/utils";
import { useContext } from "react";
import CartContext from "../../libs/contexts/cart/cart-context";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../libs/routes";

export default function MainHeader({ className }: { className?: string }) {
  const cartContext = useContext(CartContext);
  if (!cartContext)
    throw new Error("CartContext must be used within CartProvider");

  const { state: cart } = cartContext;

  const cartItemsCount = cart.products.reduce(
    (acc, cartItem) => acc + cartItem.orderNum,
    0
  );

  const navigate = useNavigate();

  const navbarLinks = [
    {
      title: "Custom products",
      href: AppRoutes.CustomProduct,
    },
    {
      title: "Add product",
      href: AppRoutes.CreateCustomProduct,
    },
  ];

  return (
    <div
      className={cn("flex items-center justify-between py-6 px-0 md:px-12", className)}
    >
      <div className="flex items-center md:gap-8 gap-4">
        <button
          onClick={() => navigate(AppRoutes.MainPage)}
          className="flex items-center gap-1"
        >
          <img
            alt="E-Commerce"
            src="/image/black-logo.png"
            width={32}
            height={32}
          />
          <h1 className="text-xl font-semibold hidden md:block">BeautyFashion</h1>
        </button>
        <div className="flex items-center gap-4">
          {navbarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-semibold"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      <button className="relative" onClick={() => navigate(AppRoutes.Cart)}>
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -end-1 text-2xs bg-red-600 text-white rounded-full flex items-center justify-center size-4">
            {cartItemsCount}
          </span>
        )}
        <ShoppingBagOpen width={32} height={32} />
      </button>
    </div>
  );
}
