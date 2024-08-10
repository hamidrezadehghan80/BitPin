import { SVGProps } from "react";

export function ChartLineDataIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        color="currentColor"
      >
        <path d="M21 21H10c-3.3 0-4.95 0-5.975-1.025S3 17.3 3 14V3"></path>
        <path d="M5 20c.44-3.156 2.676-11.236 5.428-11.236c1.902 0 2.395 3.871 4.258 3.871C17.893 12.635 17.428 4 21 4"></path>
      </g>
    </svg>
  );
}


export function AlignBottomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16.502 10.002c.844 0 1.818-.083 2.299.75c.201.348.201.816.201 1.75v1c0 .935 0 1.402-.201 1.75c-.481.834-1.455.75-2.299.75s-1.818.084-2.3-.75c-.2-.348-.2-.815-.2-1.75v-1c0-.934 0-1.402.2-1.75c.482-.833 1.456-.75 2.3-.75m-9-6c.844 0 1.818-.083 2.299.75c.201.348.201.816.201 1.75v7c0 .935 0 1.402-.201 1.75c-.481.834-1.455.75-2.3.75c-.843 0-1.817.084-2.298-.75c-.201-.348-.201-.815-.201-1.75v-7c0-.934 0-1.402.2-1.75c.482-.833 1.456-.75 2.3-.75M22 20H2"
        color="currentColor"
      ></path>
    </svg>
  );
}

export function ChartDecreaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M21 21H10c-3.3 0-4.95 0-5.975-1.025S3 17.3 3 14V3m3.997 2.999c3.532 0 10.915 1.464 10.7 10.566m-2.208-1.61l1.883 1.897a.497.497 0 0 0 .703.003l1.922-1.9"
        color="currentColor"
      ></path>
    </svg>
  );
}

export function ChartIncreaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        color="currentColor"
      >
        <path d="M21 21H10c-3.3 0-4.95 0-5.975-1.025S3 17.3 3 14V3"></path>
        <path d="M7.997 16.999c3.532 0 10.915-1.464 10.7-10.566m-2.208 1.61l1.883-1.897a.497.497 0 0 1 .703-.003l1.922 1.9"></path>
      </g>
    </svg>
  );
}