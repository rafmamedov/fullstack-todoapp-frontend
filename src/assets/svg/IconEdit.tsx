import * as React from "react";

function IconEdit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="22"
      width="22"
      {...props}
    >
      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

export default IconEdit;