from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("http://localhost:3000/")
# driver.get("https://www.google.com/")
sleep(2)

email_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-email')
email_field.send_keys('test1@santa.com')
pass_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-password')
pass_field.send_keys('qwerty')

sign_in_buttom = driver.find_element(By.CSS_SELECTOR, value='#root > main > div > button.MuiButton-root.MuiButton-contained.MuiButton-containedSuccess.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ke5b6m-MuiButtonBase-root-MuiButton-root')
sign_in_buttom.click()

sleep(5)


driver.close()