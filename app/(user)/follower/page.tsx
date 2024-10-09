import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="grid grid-cols-12 items-start gap-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div
          key={i}
          className="col-span-3 flex items-center gap-5 border border-slate-100 rounded-md p-2.5"
        >
          <Avatar className="rounded-md size-20 border-2 border-slate-50">
            <AvatarImage
              src={`https://randomuser.me/api/portraits/men/${i}.jpg`}
            />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
          <div className="space-y-2.5">
            <p>Tom Holland</p>
            <Button size="sm" variant={"outline"}>
              Following
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default page;
