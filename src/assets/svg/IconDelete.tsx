import * as React from "react";

function IconDelete(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="#a80505"
      height="24"
      width="24"
      {...props}
    >
      <path
        fill="none"
        stroke="#a80505"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
      />
      <path
        stroke="#a80505"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M80 112h352"
      />
      <path
        fill="none"
        stroke="#a80505"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
        d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
      />
    </svg>
  );
}

export default IconDelete;

