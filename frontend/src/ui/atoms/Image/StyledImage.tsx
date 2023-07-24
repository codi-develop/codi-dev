import Image from "next/image";

export const StyledImage = ({
  width,
  height,
  src,
  alt,
  onClick,
  ...restProps
}: {
  width: string;
  height: string;
  src: string;
  alt: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick!}
    style={{ width: width, height: height, position: "relative", ...restProps }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "contain" }}
      unoptimized={true}
    />
  </div>
);