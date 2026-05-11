from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from bs4 import BeautifulSoup
import requests

app = FastAPI()

origins = [
    "http://localhost:5174",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Quotes API running"}


@app.get("/quotes")
def get_quotes():

    url = "https://quotes.toscrape.com/"

    response = requests.get(url)

    soup = BeautifulSoup(response.text, "lxml")

    quotes = soup.find_all("div", class_="quote")

    all_quotes = []

    for quote in quotes:

        quote_author = quote.find(
            "small",
            class_="author"
        ).text

        quote_text = quote.find(
            "span",
            class_="text"
        ).text

        all_quotes.append({
            "quote_author": quote_author,
            "quote_description": quote_text
        })

    return {
        "quotes": all_quotes
    }