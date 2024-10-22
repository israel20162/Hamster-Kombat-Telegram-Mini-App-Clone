<div></div>;

import { IconProps } from "../utils/types";

const Invite: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  const svgSize = `${size}px`;
  return (
    <svg
      viewBox="-0.08 0 20.184 20.184"
      className={className}
      height={svgSize}
      width={svgSize}
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      stroke="#ffffff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <g id="add-user-circle" transform="translate(-1.982 -1.979)">
          <path
            id="secondary"
            fill="#ffffff"
            d="M7,19.5a9,9,0,0,0,9.94,0A5,5,0,0,0,7,19.5Z"
          />
        
          <path
            id="primary"
            d="M13,7.13A3.66,3.66,0,0,0,12,7a4,4,0,1,0,3.46,6"
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />    <path
            id="primary-2"
            data-name="primary"
            d="M12,15a5,5,0,0,0-5,4.5,9,9,0,0,0,9.94,0A5,5,0,0,0,12,15Zm5-6h4M19,7v4"
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
         
          <path
            id="primary-3"
            data-name="primary"
            d="M20.48,15a8.86,8.86,0,0,1-2.12,3.36A9,9,0,1,1,16,3.94"
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        
        </g>
      </g>
    </svg>
  );
};

export default Invite;
