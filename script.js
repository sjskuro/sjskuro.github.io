// 명언 목록
const quotes = [
    { text: "시작이 반이다.", author: "아리스토텔레스" },
    { text: "천 리 길도 한 걸음부터.", author: "노자" },
    { text: "배움에는 왕도가 없다.", author: "유클리드" },
    { text: "오늘 할 수 있는 일을 내일로 미루지 마라.", author: "벤자민 프랭클린" },
    { text: "성공은 준비와 기회가 만나는 곳에 있다.", author: "세네카" },
    { text: "가장 큰 위험은 아무 위험도 감수하지 않는 것이다.", author: "마크 저커버그" },
    { text: "꾸준함이 재능을 이긴다.", author: "작자 미상" }
];

// 랜덤 명언 표시
function displayRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote-text').textContent = `"${quote.text}"`;
    document.getElementById('quote-author').textContent = `- ${quote.author}`;
}

// 날씨 코드(WMO) → 아이콘
function weatherIcon(code) {
    if (code === 0) return '☀️';
    if (code <= 2) return '🌤️';
    if (code === 3) return '☁️';
    if (code <= 48) return '🌫️';
    if (code <= 67) return '🌧️';
    if (code <= 77) return '❄️';
    if (code <= 82) return '🌦️';
    if (code <= 86) return '🌨️';
    return '⛈️';
}

// Open-Meteo OpenAPI로 현재 날씨 가져오기
async function fetchWeather(lat, lon, elementId, cityName) {
    const element = document.getElementById(elementId);
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`);
        if (!response.ok) throw new Error('날씨 정보를 가져오는데 실패했습니다.');
        const data = await response.json();
        const weather = data.current_weather;
        element.textContent = `${weatherIcon(weather.weathercode)} ${cityName} ${Math.round(weather.temperature)}°C`;
    } catch (error) {
        console.error(error);
        element.textContent = `${cityName} 날씨 정보 없음`;
    }
}

// 시계
function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hh}:${mm}`;
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    displayRandomQuote();
    updateClock();
    setInterval(updateClock, 1000);

    fetchWeather(37.5665, 126.9780, 'weather-seoul', '서울');
    fetchWeather(33.4996, 126.5312, 'weather-jeju', '제주');

    // 검색어가 비어 있으면 검색하지 않음
    document.getElementById('search-form').addEventListener('submit', (event) => {
        if (!document.getElementById('search-input').value.trim()) event.preventDefault();
    });

    // I'm Feeling Lucky 버튼 이벤트
    document.getElementById('lucky-btn').addEventListener('click', () => {
        window.location.href = "https://www.google.com/doodles";
    });
});
