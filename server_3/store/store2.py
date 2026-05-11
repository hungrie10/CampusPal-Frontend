from fastapi import FastAPI
from bs4 import BeautifulSoup
import requests

url = 'https://quotes.toscrape.com/'
html_text = requests.get(url)

soup = BeautifulSoup(html_text.text, 'lxml')
quotes = soup.find_all('div', class_='quote')

all_quotes = []

for quote in quotes:
    all_quotes.append({
    "quote_author" : quote.find('small', class_='author').text,
    "quote_text" : quote.find('span', class_='text').text
    })
# print(collection.find_one({"full_name": "Richard"}))
# for doc in collection.find():
#     print(doc)

# # print("Connected to MongoDB")
# # print("Database: ", db)
# print("Collection: ", collection)

# # app = FastAPI()

# @app.get("/")
# def home():
#     return {"message": "Hello World"}