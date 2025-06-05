"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent,
     DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuGroup} from "./ui/dropdown-menu";

export default function DropdownCategories({categories} : {categories : string[]}) {

    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost">Categories</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuGroup>
                    
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    )

}
