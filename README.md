# Events API

# Get Request 
## Search Accroding to event id
route: http:localhost:5000/events?id=event_id
<img src="https://cdn.discordapp.com/attachments/709066676800323605/987563980585316373/task1_get_req1.png">

## Search for recent events and paginate the results
route: http:localhost:5000/events?type=latest&limit=limit_size&page=page_no
<img src="https://cdn.discordapp.com/attachments/709066676800323605/987564391790702592/task1_get_req2.png">
<img src="https://cdn.discordapp.com/attachments/709066676800323605/987564392084287498/task1_get_req2_1.png">

# Post Request
route: http:localhost:5000/events
<img src="https://cdn.discordapp.com/attachments/709066676800323605/987564709857329182/task1_post_req.png">

# Update Request 
route: http:localhost:5000/events:id
<img src="https://media.discordapp.net/attachments/709066676800323605/987564921036369920/task1_put_req_1.png">
<img src="https://media.discordapp.net/attachments/709066676800323605/987564920784695326/task1_put_req_2.png">

# Delete Request
route: http:localhost:5000/events:id
<img src="https://cdn.discordapp.com/attachments/709066676800323605/987565218458664980/task1_delete_req_1.png">
<img src="https://media.discordapp.net/attachments/709066676800323605/987565218206982185/task1_delete_req_2.png">


# Installation
Install the dependencies and devDependencies
Fill out the environment variables in .env 
Start the server
```sh
cd DT-Assignment-Task1
yarn install
yarn start
```