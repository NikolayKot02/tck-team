const API_KEY = "ТВОЙ_КЛЮЧ"; // Получи на ://faceit.com

async function loadFaceitLevels() {
    const cards = document.querySelectorAll('.player-card');
    // Прокси для обхода блокировки GitHub -> Faceit
    const proxy = "https://corsproxy.io?"; 

    for (let card of cards) {
        const nick = card.getAttribute('data-faceit');
        const statusDiv = card.querySelector('.faceit-status');

        try {
            const url = `https://faceit.com{nick}&game=cs2`;
            const res = await fetch(proxy + encodeURIComponent(url), {
                headers: { 'Authorization': `Bearer ${API_KEY}` }
            });
            const data = await res.json();
            const lvl = data.games.cs2.skill_level;
            
            statusDiv.innerHTML = `<img src="https://faceit.com{lvl}.png">`;
        } catch (e) {
            console.error(e);
            statusDiv.innerHTML = "N/A";
        }
    }
}
document.addEventListener('DOMContentLoaded', loadFaceitLevels);
