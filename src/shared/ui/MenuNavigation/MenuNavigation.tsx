import { MenuItem } from "../MenuItem"

const MenuNavigation = () => {
  return (
    <section className="border-t border-t-[#0000005a] py-2 w-full">
            <ul className="flex items-center justify-center gap-3 list-none">
                <MenuItem variant="chats" />
                <MenuItem variant="contacts" />
                <MenuItem variant="services" />
                <MenuItem variant="settings" />
            </ul>
    </section>
  )
}

export default MenuNavigation
