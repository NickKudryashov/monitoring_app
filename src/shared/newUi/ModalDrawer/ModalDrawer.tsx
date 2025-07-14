import { useMobilDeviceDetect } from '@/shared/hooks/useMobileDeviceDetect'
import { Drawer, DrawerProps, Modal, ModalProps } from 'antd'

interface CustomProps {
    minMobileWidth?: string
    minFullsizeWidth?: string
}

type PropsMixin = DrawerProps & ModalProps & CustomProps

export const ModalDrawer = (props: PropsMixin) => {
    const { children, minMobileWidth = '', minFullsizeWidth = '', style, ...rest } = props
    const isMobile = useMobilDeviceDetect()
    if (isMobile)
        return (
            <Drawer style={{ minWidth: minMobileWidth, ...style }} {...rest}>
                {children}
            </Drawer>
        )
    else {
        return (
            <Modal style={{ minWidth: minFullsizeWidth, ...style }} {...rest}>
                {children}
            </Modal>
        )
    }
}
