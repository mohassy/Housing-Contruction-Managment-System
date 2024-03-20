## setup process ##
run: git clone https://github.com/mohassy/Housing-Contruction-Managment-System.git

cd into Housing-Contruction-Managment-System directory

make sure you have python on your system by running: python --version

cd into master-microservice

run: python -m venv myenv

if you're on windows run: .\myenv\Scripts\activate

run: pip install -r requirements.txt

run: main.py

server should be up and running

go to http://localhost:8000/docs on a browser to see and test api endpoints
