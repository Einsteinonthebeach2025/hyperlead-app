import FlexBox from 'app/components/containers/FlexBox'
import MotionContainer from 'app/components/containers/MotionContainer'
import Spinner from 'app/components/Spinner'
import { QRCodeSVG } from 'qrcode.react'

const QrCode = ({ qrCode, factor }) => {
  return (
    <>
      {qrCode && qrCode.startsWith("otpauth://") ? (
        <QRCodeSVG value={qrCode} size={200} />
      ) : qrCode.startsWith("data:image") ? (
        <div className='border dark:bg-neutral-200 rounded-lg'>
          <img src={qrCode} alt="2FA QR Code" className="my-2" />
        </div>
      ) : (
        <Spinner />
      )}
      {qrCode && (
        <FlexBox type="center-col" className="my-2">
          <p className="text-[12px] text-neutral-200">
            Can’t scan the QR code? Enter this secret manually:
          </p>
          <h1 className='text-blue-500'>{factor?.totp?.secret}</h1>
        </FlexBox>
      )}
    </>
  )
}

export default QrCode