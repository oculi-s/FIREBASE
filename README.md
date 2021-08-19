# FIREBASE

## [link](https://oculi-s.github.io/firebase/) Activated by Github Pages

# overview
1) sample internet shopping website that can dynamically interact with [google firebase](https://firebase.google.com/) server
2) No Jquery, only pure js used

# Main Functions
## 1) Admin page
 >- edit user name & password & email & type
 >- delete user and save
<br> <image src=https://user-images.githubusercontent.com/44251667/130019554-6a27659c-c463-4e06-b321-513ed3f0e4b8.png>

<br>

## 2) Create account (main page)
### 1. main page design
> <image src=https://user-images.githubusercontent.com/44251667/130019500-10a8145d-840d-4851-a112-bc21c5529dd1.png>

### 2. some restrictions for creating account
 >- warning messege is automatically viewed below the input box
 >- duplication check is executed
 <br> <image src=https://user-images.githubusercontent.com/44251667/130017633-7f17c9c5-1383-471c-9091-27053c74e633.png>
 >- value in email input box should be formatted as valid email address
 <br> <image src=https://user-images.githubusercontent.com/44251667/130018184-c3b001a6-b823-46db-878d-2a6d5df1ff2f.png>
 >- confirmation of password should be same as the password you created
 <br> <image src=https://user-images.githubusercontent.com/44251667/130018391-0f619d96-dd4c-446d-b3e6-513dde1841b5.png>

<br>

## 3) Login
### 1. main page design
> <image src=https://user-images.githubusercontent.com/44251667/130019582-1c7f345c-aad0-4b89-92ec-77b3840cb523.png>

### 2. if ID is not in database or pw is not correct, login fails
> <image src=https://user-images.githubusercontent.com/44251667/130018769-8f0ad3ec-41f0-41d9-8e75-30ed91a42256.png>

<br>

## 4) Seller page
### 1. main page design
>- you can logout and go to the main page
<br><image src=https://user-images.githubusercontent.com/44251667/130019691-fc61af89-d602-4b28-bc5c-1d6266436052.png>

### 2. some user interaction is added
>- home button takes you to the main page
<br><image src=https://im.ezgif.com/tmp/ezgif-1-5add482b6714.gif>

### 3. See product status
>- only user's product is shown, not other's
>- product's name, price, users who liked, status, biddings from auction market is shown
>- editing is not implemented yet
>- upload product button takes you to the upload page
<br><image src=https://user-images.githubusercontent.com/44251667/130020294-7d06c7bd-67d8-4ac5-8d96-96f5aa6e8fdb.png>

### 4. Upload product
>- if image is uploaded, preview is shown
>- you can choose where to upload your product, flea market or auction
<br><image src=https://user-images.githubusercontent.com/44251667/130020875-0d97a805-8dd0-4b27-b710-5fa90885145c.png>

## 5) Contact page
### 1. main page design
>- you can send message to developer
>- the message is stored to the database
<br><image src=https://user-images.githubusercontent.com/44251667/130021522-f8a0eb98-d947-4e2c-a765-eb6ed709322a.png>

## 6) Buyer's page
### 1. See products on market
>- main page design is same as seller's
>- products are classified by the information from seller page
>- you can filter products by range of price
<br><image src=https://user-images.githubusercontent.com/44251667/130022362-62623596-16e1-4b4b-b1f1-63b6e4c9f87f.png>

### 2. Bid to auction
>- if bidding price is less then current price, warning message is shown
>- else, current price changes
<br><image src=https://im2.ezgif.com/tmp/ezgif-2-f40fd4938dc3.gif>

### 3. Flea market
>- you can add product to cart or buy immediately
<br><image src=https://user-images.githubusercontent.com/44251667/130023894-ae12400d-f6a3-4fcd-b572-2c7c425d90f3.png>



