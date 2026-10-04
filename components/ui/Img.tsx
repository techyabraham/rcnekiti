import type { ImgHTMLAttributes } from "react";

const widths = [480, 768, 1280, 1920] as const;
type ImgProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  responsive?: boolean;
  responsiveWidths?: readonly number[];
  fetchPriority?: "high" | "low" | "auto";
};

function responsiveSet(src: string, extension: "avif" | "webp", widths: readonly number[]) {
  const base = src.replace(/\.(png|jpe?g|webp|avif)$/i, "");
  return widths.map((width) => `${base}-${width}.${extension} ${width}w`).join(", ");
}

export function Img({ src, alt, width, height, responsive = false, responsiveWidths = widths, loading = "lazy", fetchPriority, sizes, className, ...props }: ImgProps) {
  const selectedSizes = sizes ?? "(max-width: 768px) 100vw, 50vw";
  const selectedSrc = responsive ? `${src.replace(/\.(png|jpe?g|webp|avif)$/i, "")}-768.webp` : src;
  return (
    <picture>
      {responsive && <source type="image/avif" srcSet={responsiveSet(src, "avif", responsiveWidths)} sizes={selectedSizes} />}
      {responsive && <source type="image/webp" srcSet={responsiveSet(src, "webp", responsiveWidths)} sizes={selectedSizes} />}
      <img src={selectedSrc} alt={alt} width={width} height={height} loading={loading} fetchPriority={fetchPriority} decoding="async" sizes={selectedSizes} className={className} {...props} />
    </picture>
  );
}
