import { useImages } from "../store/ImageContext";

export default function IndividualImage({img,name}){
    const { images ,setImages} = useImages()

    const handleDelete = (e) => {
        const newimages = Object.fromEntries(
            Object.entries(images).filter(([key, value])=>key!=name));
        setImages(newimages)
        sessionStorage.setItem('images', JSON.stringify(newimages));
    };

  return (
    <div className="flex flex-col justify-center items-center group">
      <div className="relative">
        <img className="h-36 w-40 rounded-md" src={img} alt={name} />
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p className="text-xl mt-2">{name}</p>
    </div>
  );
};