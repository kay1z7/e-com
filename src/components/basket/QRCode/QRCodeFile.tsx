"use client";

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useQuery } from "@apollo/client";
import QRCode from "qrcode";
import React, { useEffect, useState } from "react";

import { useCart } from "@/src/Context/cartContext";
import { PAYMENT_STATUS_QUERY } from "@/src/lib/mutations/PaymentStatus";

import PaymentFailed from "../notification/PaymentFailed/PaymentFailed";
import PaymentSuccess from "../notification/PaymentSuccess/PaymentSuccess";
import css from "./QRCode.module.scss";
import Button from "../../base/Button/Button";

interface PaymentStatusQueryResponse {
  paymentStatus: string;
}

interface PaymentStatusQueryVariables {
  orderId: number;
}

const QRCodeFile = () => {
  const { deepLink, paymentSuccess, setPaymentSuccess, orderId } = useCart();

  // const hadleToMbank = () => {
  //   window.open(deepLink, "_blank");
  // };
  const qrCodeCanvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (deepLink && qrCodeCanvasRef.current) {
      QRCode.toCanvas(qrCodeCanvasRef.current, deepLink, function (error) {
        if (error) console.error(error);
      });
    }
  }, [deepLink]);

  const [shouldPoll, setShouldPoll] = useState(true);

  const { data, error, refetch } = useQuery<PaymentStatusQueryResponse, PaymentStatusQueryVariables>(
    PAYMENT_STATUS_QUERY,
    {
      variables: { orderId },
      pollInterval: shouldPoll ? 3000 : 0, // Проверяем статус оплаты каждые 4 секунды
      fetchPolicy: "network-only",
    }
  );

  const refreshPaymentStatus = async () => {
    try {
      await refetch();
    } catch (err) {
      console.error('Error fetching payment status:', err);
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setPaymentSuccess(data.paymentStatus);
      if (data.paymentStatus === "Проведение платежа") {
        setShouldPoll(false);
        console.log("Проведение платежа");
      }
    }
    if (error) {
      setPaymentSuccess("null");
      console.log("error: ", error);
    }
  }, [data, error]);

  return (
    <div className={css.qr_code_wrapper}>
      <div className={css.qr_code}>{deepLink && <canvas ref={qrCodeCanvasRef}></canvas>}</div>
      <div className={css.title}>
        Пожалуйста, отсканируйте QR-код для перехода в приложение MBANK и завершения платежа.
      </div>
      <br />
      
      <Button 
        text="Обновить статус оплаты" 
        variant="white"
        width="min(30rem, 100%)" 
        onClick={refreshPaymentStatus} 
      />
      {(paymentSuccess === "Проведение платежа" && <PaymentSuccess />) ||
        (paymentSuccess === "Отмена платежа" && <PaymentFailed />)}
    </div>
  );
};

export default QRCodeFile;
