import discord
from discord.ext import commands
import requests
import base64
import os
from keep_alive import keep_alive

# Настройки из Render (Environment Variables)
TOKEN = os.getenv('DISCORD_TOKEN')
GITHUB_TOKEN = os.getenv('GH_TOKEN')

# Твои данные
REPO_NAME = "NikolayKot02/tck-team" 
FILE_PATH = "logs.txt"
CHANNEL_ID = 1496225381928145166  # Твой ID канала

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

def update_github(content):
    # ПРАВИЛЬНЫЙ API URL
    url = f"https://github.com/{REPO_NAME}/contents/{FILE_PATH}"
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    # 1. Получаем текущую версию файла (SHA)
    r = requests.get(url, headers=headers)
    sha = None
    old_text = ""
    
    if r.status_code == 200:
        data = r.json()
        sha = data.get('sha')
        old_text = base64.b64decode(data['content']).decode('utf-8')
    elif r.status_code == 404:
        print("Файл не найден, будет создан новый.")
    else:
        return r.status_code

    # 2. Формируем новый текст
    new_text = old_text + "\n" + content
    encoded = base64.b64encode(new_text.encode('utf-8')).decode('utf-8')
    
    # 3. Подготовка данных (SHA обязателен для обновления!)
    payload = {
        "message": "Update from Discord Bot",
        "content": encoded
    }
    if sha:
        payload["sha"] = sha

    # 4. Отправка на GitHub
    res = requests.put(url, headers=headers, json=payload)
    return res.status_code

@bot.event
async def on_ready():
    print(f'Бот {bot.user} запущен!')

@bot.event
async def on_message(msg):
    if msg.author == bot.user or msg.channel.id != CHANNEL_ID:
        return

    status = update_github(f"{msg.author}: {msg.content}")
    
    if status in [200, 201]:
        await msg.add_reaction('✅')
    else:
        await msg.channel.send(f"❌ Ошибка GitHub: {status}. Проверь файл logs.txt и токен.")

keep_alive()
bot.run(TOKEN)
