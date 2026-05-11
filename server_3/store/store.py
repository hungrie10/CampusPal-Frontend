from bs4 import BeautifulSoup
import requests

# TODO: Add the URL of the website you want to scrape
url = 'https://quotes.toscrape.com/'
html_text = requests.get(url)

soup = BeautifulSoup(html_text.text, 'lxml')
quotes = soup.find_all('div', class_='quote')

print("Quotes of the year:\n")
for quote in quotes:
    quote_author = quote.find('small', class_='author').text
    quote_text = quote.find('span', class_='text').text
    print(f"""
    {quote_text}
    - {quote_author}
""")