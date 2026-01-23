import { MenuNavigation } from "@/shared/ui/MenuNavigation"
import { SearchInput } from "@/shared/ui/SearchInput"
import { ServiceCard } from "@/shared/ui/ServiceCard/ServiceCard"
import { ChevronLeft } from "app/signup/about-me/ui/icons/ChevronLeft"

const page = () => {
  return (
    <main className="bg-white h-screen flex flex-col">
      <div className="px-4 overflow-auto flex-1 pb-6">
        <header className="h-11 flex items-center mb-3">
            <ChevronLeft />
        </header>
        <div className="flex flex-col items-center py-6 px-4 gap-4 rounded-lg bg-gradient-main">
            <SearchInput theme="gray" />
            <div className=" grid grid-cols-2  gap-4 ">
                <ServiceCard variant="ads" variantButton="default"/>
                <ServiceCard variant="ads" variantButton="default"/>
                <ServiceCard variant="apartment" variantButton="default"/>
                <ServiceCard variant="apartment" variantButton="default"/>
                <ServiceCard variant="apartment" variantButton="default"/>
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