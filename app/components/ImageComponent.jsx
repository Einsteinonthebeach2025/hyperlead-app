import Image from "next/image";

const ImageComponent = ({ src, alt, className }) => {
  return (
    <div
      className={`primary-border primary-outline overflow-hidden relative w-[80%] lg:w-2/4 ${className}`}
    >
      <div className="hover:scale-[1.02] duration-300">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={900}
          quality={85}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default ImageComponent;
