import { cn } from "../../libs/utils";

import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "../../libs/routes";
import { Sun } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { Moon } from "@phosphor-icons/react";
import useTheme from "../../libs/store/theme-store";

export default function MainHeader({ className }: { className?: string }) {
  const navigate = useNavigate();

  const { theme, setTheme } = useTheme();

  const navbarLinks = [
    {
      title: "Markets",
      href: AppRoutes.MainPage,
    },
  ];

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 bg-neutral-200/70 dark:bg-neutral-800",
        className
      )}
    >
      <div className="flex items-center md:gap-10 gap-4">
        <Link to={AppRoutes.MainPage} className="flex items-center gap-1">
          <img alt="Bit Pin" src="/image/logo.png" width={32} height={32} />
          <h1 className="text-2xl font-semibold hidden md:block text-neutral-500">
            <span className="me-1 text-primary-400 ">Bit Pin</span>
            Project
          </h1>
        </Link>
        <div className="flex items-center gap-4 font-semibold">
          {navbarLinks.map((link) => (
            <Link key={link.title} to={link.href}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      <div>
        {theme === "dark" ? (
          <button onClick={() => setTheme("light")}>
            <Sun weight="duotone" className="shrink-0 size-6" />{" "}
          </button>
        ) : (
          <button onClick={() => setTheme("dark")}>
            <Moon weight="duotone" className="shrink-0 size-6" />
          </button>
        )}
      </div>
    </div>
  );
}
