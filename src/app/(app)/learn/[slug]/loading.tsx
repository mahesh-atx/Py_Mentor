import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingLesson() {
  return (
    <div className="flex-1 overflow-y-auto p-4 pt-[60px] md:p-8 md:pt-[70px] space-y-10 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-12 w-4/5 md:w-3/4" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="pt-6 space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          
          {/* Code block skeleton */}
          <Skeleton className="h-40 w-full mt-6 rounded-xl bg-muted/50" />
          
          <div className="pt-8 space-y-3">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>
        </div>

      </div>
    </div>
  );
}
