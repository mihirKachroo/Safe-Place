Inspiration
Due to the Coronavirus, going grocery shopping has become more dangerous and challenging than ever for the everyday person as it puts the heath and safety of themselves and their families at risk. So, we created the SafePlace which uses hardware, web app and chat bot to make shopping during COVID-19 safer and more efficient.

What It Does
SafePlace uses a combination of hardware, firebase and two types of front end softwares (the web-app and chat bot) to interactively show regular people the locations, open/closing times and most importantly, the danger ratings of all of the stores around them. Our Raspberry Pi hardware uses computer vision to track people entering and leaving through a door. It then feeds that information to our two front end software (web app and Discord chatbot). There front end softwares display a variety of information, the key one being the danger rating of the store (chances of getting Corona) which is rated on a star system out of 10 and calculated using the formula 10-3-(square feet/number of people*3.14/1000). Ultimately, our mission is for you to feel safe during these times of distress.

How We Built It
First, we applied the Raspberry Pi 4, its Camera Module, and OpenCV to create a low-budget potential solution to the CDC’s recommended social distancing. By using a people-counting tracking system that can detect the number of people going into and out of a doorway, we are able to track how many people enter into a particular area. By recording the square footage of the building, we are then able to calculate the safety rating of the store, which basically says how far apart people are. Next, we linked that Raspberry Pi to a firestore that collected information about how many people are in the building, name of the building, location of the building, time and the square footage of the place. By using our web app, users can see the locations we are measuring on them around the map, and can check, based on our ranking system, which places are currently safe to go to and which ones are not. If a web app was not enough, we also created another piece of software, a Discord chat-bot, which provides another user-friendly front-end to our database’s information.

Challenges We Ran Into
We faced many challenges with our computer vision, which ultimately remained limited to the physical space of our Raspberry Pi hacker Justin. While our computer vision can successfully track people entering and leaving in a pre-recorded video, an appropriate viewing angle could not be achieved in-home, but we were are able to clearly demonstrate that the Pi Camera Module can be used, and that it does track humanoid objects like a LEGO figure. Furthermore, we had great difficulty coordinating the back-end server from Firebase with both the Raspberry Pi and the two front-ends. In addition, while creating the web app, one of the main difficulties was that we did not know how to add markers to the google maps that displayed all of the relevant real time firebase information. However, eventually, through a bunch of stack-exchange browsing, some old YouTube videos, and most importantly, sheer persistence to keep trying different solutions as a team, we were finally able to figure out the answers to these obstacles.

Accomplishments that we're proud of
Whether we win or lose this competition, we will surely be proud of ourselves for building such an extremely useful and interactive project from scratch. The feature of our project that we are most proud of is how fluent the interactions between our firebase, hardware, and two front-ends are. It was all of our first times creating such a complicated project and we are proud that we could have accomplished it.

What We Learned
We learned a lot of stuff during this competition including how to build a computer vision program using Raspberry Pi, how to create and connect a realtime database with both hardware and software and how to use Google Maps with React JS.

What's Next For SafePlace
Now that we have created our project's hardware, back-end and front-end, we want to publish our products and start commercialising this project with retail stores, shopping markets and a variety of other retailers to keep everyone safe and secure.

Other links
Google Slideshow - https://docs.google.com/presentation/d/1aMMf4NjnXAXpPu1DIpjDcWKL5gj1YhzZKmU614U9PHA/edit#slide=id.g734a7d9472_1_0%20_
