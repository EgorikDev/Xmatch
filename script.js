// ------------------------------------------------------------
// 1. ДАННЫЕ ТУРНИРОВ
// ------------------------------------------------------------
const tournaments = [
    {
        id: 1,
        title: 'CS2 Cup',
        game: 'CS2',
        date: '15.03.2024',
        participants: 16,
        maxParticipants: 64,
        prize: '300 BYN',
        status: 'past',
        description: 'Открытый турнир по CS2. Победитель — команда "Bobruisk Bears".'
    },
    {
        id: 2,
        title: 'Dota 2 Open',
        game: 'Dota 2',
        date: '20.05.2024',
        participants: 8,
        maxParticipants: 16,
        prize: 'Подписка Steam',
        status: 'past',
        description: 'Командный турнир по Dota 2. Победитель — "Xmatch eSports".'
    },
    {
        id: 3,
        title: 'Ночной марафон',
        game: 'CS2 / Dota 2',
        date: '10.06.2024',
        participants: 12,
        maxParticipants: 20,
        prize: 'Месяц бесплатного посещения',
        status: 'past',
        description: '12-часовая игровая сессия. Самый стойкий игрок получил главный приз.'
    },
    {
        id: 4,
        title: 'Летний кубок по CS2',
        game: 'CS2',
        date: '05.07.2024',
        participants: 24,
        maxParticipants: 64,
        prize: '500 BYN',
        status: 'past',
        description: 'Крупный турнир в разгар лета. Участвовало 24 команды.'
    },
    {
        id: 5,
        title: 'Valorant Showdown',
        game: 'Valorant',
        date: '15.08.2024',
        participants: 6,
        maxParticipants: 16,
        prize: 'Игровой мерч',
        status: 'past',
        description: 'Первый турнир по Valorant в нашем клубе.'
    },
    {
        id: 6,
        title: 'Зимний турнир по Dota 2',
        game: 'Dota 2',
        date: '10.12.2024',
        participants: 10,
        maxParticipants: 16,
        prize: '100 BYN + подарки',
        status: 'upcoming',
        description: 'Предновогодний турнир. Регистрация открыта!'
    },
    {
        id: 7,
        title: 'CS2 New Year Cup',
        game: 'CS2',
        date: '05.01.2025',
        participants: 32,
        maxParticipants: 64,
        prize: '1000 BYN',
        status: 'upcoming',
        description: 'Главный турнир нового года. Ожидается много участников.'
    },
    {
        id: 8,
        title: 'Стрим-турнир по Мир Танков',
        game: 'Мир Танков',
        date: '20.02.2025',
        participants: 0,
        maxParticipants: 10,
        prize: '200 BYN',
        status: 'active',
        description: 'Турнир в формате 1v1. Регистрируйся сейчас!'
    }
];

// ------------------------------------------------------------
// 2. ДАННЫЕ РЕЙТИНГА
// ------------------------------------------------------------
const ratingData = [
    { rank: 1, name: 'Bobruisk Bears', points: 1250, matches: 12 },
    { rank: 2, name: 'Xmatch eSports', points: 1100, matches: 10 },
    { rank: 3, name: 'Night Wolves', points: 980, matches: 9 },
    { rank: 4, name: 'Cyber Knights', points: 870, matches: 8 },
    { rank: 5, name: 'Red Fox', points: 760, matches: 7 },
    { rank: 6, name: 'Iron Legion', points: 650, matches: 6 },
    { rank: 7, name: 'Shadow Clan', points: 540, matches: 5 },
    { rank: 8, name: 'Phoenix Rise', points: 430, matches: 4 }
];

// ------------------------------------------------------------
// 3. ФУНКЦИИ ОТОБРАЖЕНИЯ
// ------------------------------------------------------------

// Рендер турниров с фильтром
function renderTournaments(filter = 'all') {
    const container = document.getElementById('tournamentsList');
    const emptyMsg = document.getElementById('emptyTournaments');

    let filtered = tournaments;
    if (filter !== 'all') {
        filtered = tournaments.filter(t => t.status === filter);
    }

    if (filtered.length === 0) {
        container.innerHTML = '';
        emptyMsg.classList.remove('hidden');
        return;
    }
    emptyMsg.classList.add('hidden');

    // Сортируем: active → upcoming → past
    const order = { active: 0, upcoming: 1, past: 2 };
    filtered.sort((a, b) => order[a.status] - order[b.status]);

    let html = '';
    filtered.forEach(t => {
        const statusLabel = {
            active: 'Активный',
            upcoming: 'Предстоящий',
            past: 'Прошедший'
        } [t.status] || t.status;

        const statusClass = 'status-' + t.status;
        const progress = t.maxParticipants > 0 ? Math.round((t.participants / t.maxParticipants) * 100) : 0;

        html += `
            <div class="tournament-card">
                <div class="flex flex-wrap items-start justify-between gap-2">
                    <div>
                        <h3 class="text-white font-bold text-lg">${t.title}</h3>
                        <div class="flex flex-wrap gap-3 text-sm text-gray-400 mt-1">
                            <span><i class="fas fa-gamepad text-[#9C54FF]"></i> ${t.game}</span>
                            <span><i class="far fa-calendar-alt text-[#9C54FF]"></i> ${t.date}</span>
                            <span><i class="fas fa-users text-[#9C54FF]"></i> ${t.participants} / ${t.maxParticipants}</span>
                            <span><i class="fas fa-trophy text-yellow-500"></i> ${t.prize}</span>
                        </div>
                        ${t.description ? `<p class="text-gray-500 text-sm mt-2">${t.description}</p>` : ''}
                    </div>
                    <div class="flex flex-col items-end gap-1">
                        <span class="status-badge ${statusClass}">${statusLabel}</span>
                        <button class="text-xs bg-[#9C54FF] text-black font-bold px-4 py-1 rounded-full hover:bg-[#48F955] transition" onclick="alert('Запись на турнир временно приостановлена. Следите за новостями!')">
                            <i class="fas fa-pen-alt"></i> Записаться
                        </button>
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%;"></div>
                </div>
                <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Заполнено: ${progress}%</span>
                    <span>${t.participants} из ${t.maxParticipants}</span>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Рендер рейтинга
function renderRating() {
    const wrapper = document.getElementById('ratingTableWrapper');
    const emptyMsg = document.getElementById('emptyRating');

    if (ratingData.length === 0) {
        wrapper.innerHTML = '';
        emptyMsg.classList.remove('hidden');
        return;
    }
    emptyMsg.classList.add('hidden');

    let html = `
        <table class="rating-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Команда / Игрок</th>
                    <th>Очки</th>
                    <th>Матчей</th>
                </tr>
            </thead>
            <tbody>
    `;

    ratingData.forEach(item => {
        html += `
            <tr>
                <td class="rank">${item.rank}</td>
                <td><strong class="text-white">${item.name}</strong></td>
                <td>${item.points}</td>
                <td>${item.matches}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    wrapper.innerHTML = html;
}

// ------------------------------------------------------------
// 4. ИНИЦИАЛИЗАЦИЯ И ФИЛЬТРАЦИЯ
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Первоначальный рендер
    renderTournaments('all');
    renderRating();

    // Обработчики фильтров
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            renderTournaments(filter);
        });
    });
});
