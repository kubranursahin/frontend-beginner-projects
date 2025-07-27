import { useState, useEffect } from "react";

const Timer ({timeLeft, onTimeUp}) => {
    const [timeLeft, setTimeLeft] = useState(timeLeft);
    useEffect(() => {
        if (timeLeft > 0) {
            onTimeUp()
            return
}

const timerId = setTimeout(() => 
    setTimeLeft(timeLeft - 1), 1000); // 1 saniyede bir güncelle
        return () => clearTimeout(timerId); // Temizleme işlemi
    }, [timeLeft, onTimeUp]);

    const minutes = Math.floor(timeLeft / 60); // Dakikaları hesapla
    const seconds = timeLeft % 60; // Saniyeleri hesapla    

    return (
        <div className="timer">
            <h3>Kalan Süre: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </h3>
        </div>
    )

}
export default Timer;