import Image from 'next/image';

export default function ProductImageGallery({ images }: { images: string[] }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {images.slice(0, 2).map((image, index) => (
          <div key={index} className="relative h-auto w-full">
            <Image
              src={image}
              layout="responsive"
              width={500}
              height={500}
              objectFit="cover"
              alt={`Product image ${index + 1}`}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {images.slice(2, 4).map((image, index) => (
          <div key={index} className="relative h-auto w-full">
            <Image
              src={image}
              layout="responsive"
              width={500}
              height={500}
              objectFit="cover"
              alt={`Product image ${index + 3}`}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {images.slice(4, 5).map((image, index) => (
          <div key={index} className="relative h-auto w-full">
            <Image
              src={image}
              layout="responsive"
              width={500}
              height={500}
              objectFit="cover"
              alt={`Product image ${index + 5}`}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
