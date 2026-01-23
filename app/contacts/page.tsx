'use client'
import { Button } from "@/shared/ui/Button"
import { ConfirmModal } from "@/shared/ui/ConfirmModal"
import { MenuNavigation } from "@/shared/ui/MenuNavigation"
import { SearchInput } from "@/shared/ui/SearchInput"
import { InviteContactItem } from "@/widgets/ContactListItem/ui/ContactListItem"
import { useState } from "react"
import Snackbar from "./ui/Snackbar"
type Contact = {
  id: string;
  name: string;
  isOnline: boolean;
};

const initialContacts: Contact[] = [
  { id: "1", name: "Varela", isOnline: true },
  { id: "2", name: "Alex", isOnline: false },
  { id: "3", name: "Maria", isOnline: true },
];

const page = () => {
    const [selected,setSelected] = useState<string[]>([]);
    const [showCheckbox,setShowCheckbox] = useState(false)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isOpenSnackbar,setIsOpenSnackbar] = useState<boolean>(false);
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [deleted,setDeleted] = useState<Contact[]>([]);

    function handleSelect(id : string){
      const isSelected = selected.includes(id)
      const newSelects = isSelected ? selected.filter(item => item !=id) : [...selected,id];
      setSelected(newSelects)
    }

    function handleDeleteContact(){
      const updatedContacts = contacts.filter(item => !selected.includes(item.id))
      setContacts(updatedContacts)
      setDeleted(contacts.filter(item => selected.includes(item.id)))
      setSelected([])
      setIsOpen(false)
      setIsOpenSnackbar(true);
      setShowCheckbox(false);
    }
    function handleUndo(){
      setContacts(prev => [...prev,...deleted])
      setDeleted([])
      setIsOpenSnackbar(false);
      setShowCheckbox(false);
    }
  return (
    <>
    <main className="bg-white h-screen flex flex-col">
      <div className="px-4 pt-5 overflow-auto flex-1 flex flex-col gap-5">
        <SearchInput theme="gray" />
        <div>
           <div className="flex items-center justify-between bg-violate-light rounded-2xl px-4 h-11">
            <p className="text-[14px] font-normal">Мои контакты</p>
            <Button variant="transparent" size="sm" type="button" full = {false} onClick={() => setShowCheckbox(prev => !prev)}>Выбрать</Button>
           </div>
           <ul>
            {contacts.map(item => (
              <InviteContactItem showCheckbox = {showCheckbox} key={item.id} onChange={handleSelect} id={item.id} name={item.name} isOnline = {item.isOnline} isSelected = {selected.includes(item.id)} />
            ))}
           </ul>
        </div>
      </div>
      {
        selected.length > 0 ?
        (<div className={`sticky bottom-0 bg-violate-light border-t`}>
        <div className="h-17 flex items-center justify-between px-4">
            <div className="flex items-center gap-[27px]">
                <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#747474"/>
                    </svg>
                </span>
                <span>Выбрано {selected.length} контакта</span>
            </div>
            <div className="flex items-center">
                <button className="w-11 h-11 flex items-center justify-center">
                    <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 11.5H8.00001C6.35963 11.4995 4.7503 11.9473 3.34597 12.795C1.94163 13.6428 0.795693 14.8582 0.0320057 16.31C0.0103953 16.0405 -0.000280159 15.7703 5.58684e-06 15.5C5.58684e-06 9.977 4.47701 5.5 10 5.5V0L20.5 8.5L10 17V11.5ZM8.00001 9.5H12V12.808L17.321 8.5L12 4.192V7.5H10C8.85016 7.4987 7.71361 7.74591 6.66818 8.22469C5.62276 8.70348 4.69314 9.40254 3.94301 10.274C5.23434 9.76216 6.61093 9.49953 8.00001 9.5Z" fill="#7769E1"/>
                    </svg>
                </button>
                <button onClick={() => setIsOpen(true)} className="w-11 h-11 flex items-center justify-center">
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#FF0000"/>
                    </svg>
                </button>
            </div>
        </div>
      </div>) : (<MenuNavigation />)
      }
      <ConfirmModal 
        isOpen = {isOpen} 
        buttons={[
          {
            label: "Отмена",
            onClick: () => setIsOpen(false),
          },
          {
            label: "Удалить",
            onClick: handleDeleteContact
          },
        ]}
        title={`Удалить ${selected.length} контакта?`}
        description="Вы действительно хотите выбранные удалить контакты?" 
        buttonsLayout="row"
        spacing="default"/>
      <Snackbar 
        message={`Удалено ${deleted.length} контакта`} 
        onClose={() => setIsOpenSnackbar(false)} 
        undo={handleUndo} 
        isOpen = {isOpenSnackbar} 
        className="absolute bottom-[84px] right-[50%] translate-x-[50%]" 
      />
    </main>
    </>
  )
}

export default page