import { SearchInput } from "@/shared/ui/SearchInput"
import { EmptyIcon } from "./ui/icons/emptyIcon"
import { AddButton } from "@/shared/ui/AddButton"
import { MenuNavigation } from "@/shared/ui/MenuNavigation"
import { AddedService } from "@/shared/ui/AddedService"
const page = () => {
  return (
    <main className="bg-white h-screen flex flex-col">
      <div className="px-4 flex-1 overflow-auto h-full pb-6">
        <header className="h-11 flex items-center justify-center mb-3">
            <h1 className="text-[18px] text-center font-medium leading-[120%]">А-сервисы</h1>
        </header>
        <div className="flex flex-col gap-4 items-center h-full ">
            <SearchInput theme="gray"/>
            <div className="flex flex-col justify-between gap-4 w-full h-full">
              <ul className="w-full">
                <AddedService variant="ads"/>
                <AddedService variant="ads"/>
                <AddedService variant="ads"/>
                <AddedService variant="ads"/>
              </ul>
              <AddButton variant="default" size="lg" />
            </div>
        </div>
      </div>
      <div className="sticky bottom-0">
        <MenuNavigation />
      </div>
    </main>
  )
}

export default page