import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis } from "lucide-react";

const page = () => {
  return (
    <div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-auto">Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Tag</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </TableCell>
            <TableCell className="font-medium">Gardening</TableCell>
            <TableCell className="font-medium">Free</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Ellipsis size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
