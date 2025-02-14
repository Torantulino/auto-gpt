import { LibraryAgentSortEnum } from "@/lib/autogpt-server-api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Filter } from "lucide-react";
import { useBackendAPI } from "@/lib/autogpt-server-api/context";
import { useLibraryPageContext } from "./providers/LibraryAgentProvider";

const LibraryAgentFilter = ({}: {}) => {
  const api = useBackendAPI();
  const { setAgentLoading, setAgents, setLibrarySort, searchTerm } =
    useLibraryPageContext();
  const handleSortChange = async (value: LibraryAgentSortEnum) => {
    setLibrarySort(value);
    setAgentLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let response = await api.listLibraryAgents({
      search_term: searchTerm,
      sort_by: value,
      page: 1,
    });
    setAgents(response.agents);
    setAgentLoading(false);
  };

  return (
    <div className="flex items-center">
      <span className="hidden sm:inline">sort by</span>
      <Select onValueChange={handleSortChange}>
        <SelectTrigger className="ml-1 w-fit space-x-1 border-none pl-2 shadow-md">
          <Filter className="h-4 w-4 sm:hidden" />
          <SelectValue
            placeholder="Last Modified"
            className={
              "font-sans text-[14px] font-[500] leading-[24px] text-neutral-600"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup
            className={
              "font-sans text-[14px] font-[500] leading-[24px] text-neutral-600"
            }
          >
            <SelectItem value={LibraryAgentSortEnum.CREATED_AT}>
              Creation Date
            </SelectItem>
            <SelectItem value={LibraryAgentSortEnum.UPDATED_AT}>
              Last Modified
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LibraryAgentFilter;
