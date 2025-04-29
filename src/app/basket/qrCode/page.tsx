import QRCodeFile from "@/src/components/basket/QRCode/QRCodeFile";
import InfoBlock from "@/src/components/layout/infoBlock/InfoBlock";

export default function qrCode() {
  return (
    <div>
      <InfoBlock>
        <QRCodeFile />
      </InfoBlock>
    </div>
  );
}
