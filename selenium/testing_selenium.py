import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep


class TestSelenium(unittest.TestCase):
    def test_sign_in_out(self) -> None:
        """Sign out"""
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver.get("http://localhost:3000/")
        sleep(2)

        email_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-email')
        email_field.send_keys('test1@santa.com')
        pass_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-password')
        pass_field.send_keys('qwerty')

        sign_in_button = driver.find_element(By.CSS_SELECTOR,
                                             value='#root > main > div > button.MuiButton-root.MuiButton-contained.MuiButton-containedSuccess.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ke5b6m-MuiButtonBase-root-MuiButton-root')
        sign_in_button.click()
        sleep(5)
        self.assertTrue("test1@santa.com" in driver.page_source)

        settings = driver.find_element(By.CSS_SELECTOR, value='#root > div > header > div > div.MuiBox-root.css-2uchni > button > div')
        settings.click()
        logout_button = driver.find_element(By.CSS_SELECTOR, value='#menu-appbar > div.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation1.MuiMenu-paper.MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation8.MuiPopover-paper.css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper > ul > li')
        logout_button.click()
        sleep(2)
        self.assertTrue("test1@santa.com" not in driver.page_source)

        driver.close()

    def test_create_event(self):
        """Create event"""
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver.get("http://localhost:3000/")
        sleep(2)

        email_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-email')
        email_field.send_keys('test1@santa.com')
        pass_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-password')
        pass_field.send_keys('qwerty')

        sign_in_button = driver.find_element(By.CSS_SELECTOR,
                                             value='#root > main > div > button.MuiButton-root.MuiButton-contained.MuiButton-containedSuccess.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ke5b6m-MuiButtonBase-root-MuiButton-root')
        sign_in_button.click()
        sleep(5)

        create_event_button = driver.find_element(By.ID, value="create-event-button")
        create_event_button.click()

        sleep(8)

        event_name_field = driver.find_element(By.CSS_SELECTOR, value="#santa-event-name")
        event_name_field.send_keys('test event')
        event_location_field = driver.find_element(By.CSS_SELECTOR, value='#santa-event-location')
        event_location_field.send_keys('test location')
        event_date_field = driver.find_element(By.CSS_SELECTOR, value='#gift_date')
        event_date_field.click()
        event_date_field.send_keys(Keys.ARROW_LEFT)
        event_date_field.send_keys(Keys.ARROW_LEFT)
        event_date_field.send_keys('01012023')
        borders = driver.find_element(By.CSS_SELECTOR,
                                      value='body > div.MuiModal-root.css-79ws1d-MuiModal-root > div.MuiBox-root.css-1wnsr1i')
        borders.click()
        event_add_email_button = driver.find_element(By.CSS_SELECTOR,
                                                     value='body > div.MuiModal-root.css-79ws1d-MuiModal-root > div.MuiBox-root.css-1wnsr1i > div:nth-child(6) > button:nth-child(1)')
        event_add_email_button.click()
        new_email1_field = driver.find_element(By.CSS_SELECTOR, value='#email0')
        new_email1_field.send_keys('test2@santa.com')

        finish_fill_event_button = driver.find_element(By.CSS_SELECTOR,
                                                       value='body > div.MuiModal-root.css-79ws1d-MuiModal-root > div.MuiBox-root.css-1wnsr1i > button')
        finish_fill_event_button.click()

        sleep(3)

        self.assertTrue("test event" in driver.page_source)
        self.assertTrue("test location" in driver.page_source)
        self.assertTrue("Gift date: 2023-01-01" in driver.page_source)
        driver.close()

    def test_accept_invitation(self):
        """Sign in"""
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver.get("http://localhost:3000/")
        sleep(2)

        email_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-email')
        email_field.send_keys('test2@santa.com')
        pass_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-password')
        pass_field.send_keys('qwerty')

        sign_in_button = driver.find_element(By.CSS_SELECTOR,
                                             value='#root > main > div > button.MuiButton-root.MuiButton-contained.MuiButton-containedSuccess.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ke5b6m-MuiButtonBase-root-MuiButton-root')
        sign_in_button.click()
        sleep(5)

        if "No invitation found" in driver.page_source:
            pass
        else:
            event_name = driver.find_element(By.CSS_SELECTOR,
                                             value='#root > div > main > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.MuiCardContent-root.css-46bh2p-MuiCardContent-root > div').text
            accept_field = driver.find_element(By.CSS_SELECTOR,
                                               value='#root > div > main > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div.MuiCardActions-root.MuiCardActions-spacing.css-129r6tu-MuiCardActions-root > button.MuiButton-root.MuiButton-contained.MuiButton-containedSuccess.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ke5b6m-MuiButtonBase-root-MuiButton-root')
            accept_field.click()
            sleep(5)

            event_name = event_name.split(':')[-1]
            self.assertTrue(event_name in driver.page_source)

        driver.close()

    def test_close_bar(self):
        """Close bar"""
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver.get("http://localhost:3000/")
        sleep(2)

        email_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-email')
        email_field.send_keys('test1@santa.com')
        pass_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-password')
        pass_field.send_keys('qwerty')

        sign_in_button = driver.find_element(By.CSS_SELECTOR,
                                             value='#root > main > div > button.MuiButton-root.MuiButton-contained.MuiButton-containedSuccess.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ke5b6m-MuiButtonBase-root-MuiButton-root')
        sign_in_button.click()
        sleep(5)

        close_bar = driver.find_element(By.CSS_SELECTOR, value='#root > div > div > div > div > button > svg')
        close_bar.click()

        sleep(2)
        open_bar = driver.find_element(By.CSS_SELECTOR, value='#root > div > header > div > button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-edgeStart.MuiIconButton-sizeMedium.css-134qg7o-MuiButtonBase-root-MuiIconButton-root > svg')
        open_bar.click()

        driver.close()

    def test_about_us(self):
        """About us page"""
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver.get("http://localhost:3000/")
        sleep(2)

        email_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-email')
        email_field.send_keys('test1@santa.com')
        pass_field = driver.find_element(By.CSS_SELECTOR, value='#santa-auth-password')
        pass_field.send_keys('qwerty')

        sign_in_button = driver.find_element(By.CSS_SELECTOR,
                                             value='#root > main > div > button.MuiButton-root.MuiButton-contained.MuiButton-containedSuccess.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.css-ke5b6m-MuiButtonBase-root-MuiButton-root')
        sign_in_button.click()
        sleep(5)

        about_us_button = driver.find_element(By.CSS_SELECTOR, value='#root > div > header > div > div.MuiBox-root.css-bnwevt > a:nth-child(2) > button')
        about_us_button.click()
        sleep(2)
        self.assertTrue(driver.current_url == 'http://localhost:3000/about-us')

        driver.close()