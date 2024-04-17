import { Skeleton } from "./ui/Skeleton";

const DrinkCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 m-2 h-[182px] w-[300px] bg-white border bg-card shadow rounded-xl">
      <div className="p-6 pt-4 pb-1 space-y-1.5 flex flex-col">
        <Skeleton className="bg-stone-200 w-[100px] h-6" />
        <Skeleton className="bg-stone-200 mt-2 h-4 w-[50px] " />
      </div>
      <div className="px-6">
        <Skeleton className="h-6 w-[100px] bg-stone-200" />
      </div>
      <div className="items-center p-6 flex justify-between py-4">
        <Skeleton className="h-9 w-9 bg-stone-200" />
        <Skeleton className="h-9 w-9 bg-stone-200" />
      </div>
    </div>
  );
};

export default DrinkCardSkeleton;
