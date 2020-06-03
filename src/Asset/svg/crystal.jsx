import React from "react";

const crystal = (props) => {
  const { color, size } = props;
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <circle cx="64" cy="54.333" fill={color} r="47.833" />
        <path d="m83.967 97.875h-39.934l-5.366 13.125h50.666z" fill="#eaeaf0" />
        <path fill={color} d="m30.333 109.5h67.333v12h-67.333z" />
        <g fill="#7e4bb2">
          <g>
            <path
              fill="white"
              d="m93.154 21.962a1.75 1.75 0 0 0 -2.343 2.6 40.189 40.189 0 0 1 8.76 11.306 1.75 1.75 0 0 0 3.1-1.618 43.667 43.667 0 0 0 -9.517-12.288z"
            />
            <path
              fill="white"
              d="m42.667 39.583h-2.25v-2.25a1.75 1.75 0 0 0 -3.5 0v2.25h-2.25a1.75 1.75 0 0 0 0 3.5h2.25v2.25a1.75 1.75 0 0 0 3.5 0v-2.25h2.25a1.75 1.75 0 0 0 0-3.5z"
            />
            <path
              fill={color}
              d="m113.5 89.75h-2.25v-2.25a1.75 1.75 0 0 0 -3.5 0v2.25h-2.25a1.75 1.75 0 0 0 0 3.5h2.25v2.25a1.75 1.75 0 0 0 3.5 0v-2.25h2.25a1.75 1.75 0 0 0 0-3.5z"
            />
            <path
              fill={color}
              d="m121.5 10.833h-2.25v-2.25a1.75 1.75 0 1 0 -3.5 0v2.25h-2.25a1.75 1.75 0 0 0 0 3.5h2.25v2.25a1.75 1.75 0 0 0 3.5 0v-2.25h2.25a1.75 1.75 0 0 0 0-3.5z"
            />
            <path
              fill={color}
              d="m14.5 18.442h-2.25v-2.25a1.75 1.75 0 0 0 -3.5 0v2.25h-2.25a1.75 1.75 0 0 0 0 3.5h2.25v2.25a1.75 1.75 0 0 0 3.5 0v-2.25h2.25a1.75 1.75 0 0 0 0-3.5z"
            />
          </g>
          <circle fill="white" cx="84.118" cy="65.379" r="4" />
          <circle fill={color} cx="18.5" cy="93.875" r="4" />
          <path
            fill="rgb(234, 234, 240)"
            d="m103.808 123.25h-79.616a1.75 1.75 0 0 1 0-3.5h79.616a1.75 1.75 0 0 1 0 3.5z"
          />
        </g>
      </g>
    </svg>
  );
};

export default crystal;
