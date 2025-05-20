import {  Card } from "react-bootstrap"
import { useEntityAddressContext } from "../context/EntityAddressContext/EntityAddressProvider"
import { GoLocation } from "react-icons/go"
import { BsTelephone } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { tailwindMerge } from "@lib/tsMerge/tsMerge"

import { MapContainer,TileLayer,Marker } from 'react-leaflet'
import { SettingsButton } from "@components/buttons/SettingsButton/SettingsButton";
import { BottomSheetModalProviderFn } from "@context/BottomSheetModal/BottomSheetModalProviderFn";
import { ActionMenu } from "@components/ActionMenu/ActionMenu";
import { EditLabelButton } from "@components/buttons/EditButton/EditButton";
import { SimpleBottomSheetModal } from "@components/modal/BottomSheetModal/SimpleBottomSheetModal";
import { PaddingView } from "@views/PaddingView";
import { DeleteLabelButton } from "@components/buttons/DeleteButton/DeleteLabelButtont";
import { ModalProvider } from "@context/Modal/ModalProvider";
import { useContext } from "react";
import { BottomSheetModalContext } from "@context/BottomSheetModal/BottomSheetModalContext";
import { EntityAddressForm } from "../components/forms/EntityAddressForm/EntityAddressForm";


export const EntityAddress = ()=>null

interface EntityAddressProps extends React.HTMLAttributes<HTMLElement>{
    children:React.ReactNode
}

EntityAddress.Card = function _Card({children,...attr}:EntityAddressProps){
    return(
        <Card {...attr}>
            {children}
        </Card>
    )
}

EntityAddress.Body = function Body({children,...attr}:EntityAddressProps){
    return(
        <Card.Body {...attr}>
            {children}
        </Card.Body>
    )
}

EntityAddress.Image = function Image({...attr}:Omit<EntityAddressProps,'children'>){
    const {entityAddress} = useEntityAddressContext()
    const coordinate = entityAddress.address.coordinate
    return(
        <div className="w-full">
            <MapContainer center={[coordinate.lat, coordinate.long]} zoom={16} scrollWheelZoom={true} className={tailwindMerge("w-full h-48",attr.className)}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
                <Marker position={[coordinate.lat, coordinate.long]}>
                </Marker>
            </MapContainer>
        </div>
    )
}

EntityAddress.AddressIcon = function AddressIcon({...attr}:Omit<EntityAddressProps,'children'>){
    return(
        <div className={tailwindMerge("w-max text-base text-surface-a30",attr.className)}>
         <GoLocation />
        </div>
    )
}

EntityAddress.Denomination = function Denomination({...attr}:Omit<EntityAddressProps,'children'>){
    const {entityAddress} = useEntityAddressContext()
    return(
        <h1 className={tailwindMerge('text-base font-semibold',attr.className)}>
            {entityAddress.denomination}
        </h1>
    )
}


EntityAddress.Address = function Address({...attr}:Omit<EntityAddressProps,'children'>){
    const {entityAddress} = useEntityAddressContext()
    return(
        <p className={tailwindMerge("text-sm font-light",attr.className)}>
            {entityAddress.address.full_address}
        </p>
    )
}

EntityAddress.PhoneNumber = function PhoneNumber({...attr}:Omit<EntityAddressProps,'children'>){
    const {entityAddress} = useEntityAddressContext()
    return(
        <span className={tailwindMerge("text-sm font-light",attr.className)}>
            {entityAddress.phone_number}
        </span>
    )
}

EntityAddress.PhoneIcon = function PhoneIcon({...attr}:Omit<EntityAddressProps,'children'>){
    return(
        <div className={tailwindMerge("w-max text-base text-surface-a30",attr.className)}>
            <BsTelephone />
        </div>
    )
}

EntityAddress.ExtraInfo = function ExtraInfo({...attr}:Omit<EntityAddressProps,'children'>){
    const {entityAddress} = useEntityAddressContext()
    const extraInfo = entityAddress?.extra_info
    return(
        <p className={tailwindMerge("text-sm font-light",attr.className)}>
            {extraInfo}
        </p>
    )
}

EntityAddress.ExtraInfoIcon = function ExtraInfoIcon({...attr}:Omit<EntityAddressProps,'children'>){
    return(
        <div className={tailwindMerge("w-max text-base text-surface-a30",attr.className)}>
            <BiDetail/>
        </div>
    )
}

EntityAddress.Settings = function Settings({...attr}:Omit<EntityAddressProps,'children'>){
    return(
        <BottomSheetModalProviderFn>
            {
                ({setOpen})=>{
                    return(
                        <>
                            <SettingsButton 
                                {...attr} 
                                className=" z-[1000] top-0 right-0"
                                onClick={(e)=>{
                                    setOpen(true)
                                    attr.onClick?.(e)
                                }}
                            />
                            <EntityAddress.OnSettings/>
                        </>
                    )
                }
            }
        </BottomSheetModalProviderFn>
    )
}

EntityAddress.OnSettings = function OnSettings(){
      const { isOpen, setOpen } = useContext(BottomSheetModalContext);
      
      return (
        <ActionMenu
          isOpen={isOpen}
          setClose={() => setOpen(false)}
          items={[
            {
              action: <EditLabelButton text="EDIT" />,
              render: (onClose) => (
                <SimpleBottomSheetModal isOpen={true} setClose={onClose} detent="content-height">
                  <PaddingView>
                    <EntityAddressForm.Update />
                  </PaddingView>
                </SimpleBottomSheetModal>
              ),
            },
            {
              action: <DeleteLabelButton text="DELETE" />,
              render: (onClose) => (
                <ModalProvider isOpen={true} setOpen={()=>onClose()}>
                  <EntityAddressForm.Delete/>
                </ModalProvider>
              ),
            },
          ]}
        />
      );
}