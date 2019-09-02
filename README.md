# **Daniel Hayes' Project Submission**
## **Batted all Visualisation - 2017 - AL WEST**

#### **Description**
This is my project submission for consideration for the Blue Jays Analytics/Web Developer position. I have made a spray chart and zone plot of batted balls. The charts appear side-by-side showing the same batted balls - the landing location in the spray chart, and the pitch zone location in the zone chart. Included are date, batter, pitcher, batting team, pitching team, and result type filters to narrow down the visible data on the charts. 

#### **Usage**
The charts load by default all batted balls* between April 2nd and April 5th. In the filter selection dropdowns, items displayed as part of the loaded results will be preselected. 

De selecting a preselected filter item and then applying the results will remove the selected item(s) from the results

Selecting(and then hitting the apply button) one or more unselected items will initially render no new results, as only the first 100 are loaded to save time, and no results with that selected value were in the first 100 results. To see results with the desired items included, either load more results for the given date range, or expand the date range and load more results.

The date range filter is applied as soon as you let go of the mouse

The other filters require you to press their associated apply button to filter the results

You can mouse over individual data points to see more information about each batted ball.

#### **Installation Instructions**
###### Pre-Requisites:
- Python 3.7+
- pip
- pipenv
- node.js
- yarn

#### Setup
1. `cd <working directory>`
2. `git clone https://github.com/imasnyper/batted_ball_dev.git`
3. `cd batted_ball_dev`
4. `pipenv install`
5. `cd frontend`
6. `yarn`

#### Running
(In one terminal)
1. `cd <working directory>/batted_ball_dev`
2. `pipenv shell`
3. `python manage.py runserver`

(in another terminal)
1. `cd <working directory>/batted_ball_dev/frontend`
2. `yarn start`
3. Open browser to `localhost:3000`

