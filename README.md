# Installation process
run: git clone https://github.com/mohassy/Housing-Contruction-Managment-System.git

cd into Housing-Contruction-Managment-System directory

make sure you have python on your system by running: python --version

cd into master-microservice

run: python -m venv myenv

if you're on windows run: .\myenv\Scripts\activate

run: pip install -r requirements.txt

run: python main.py

server should be up and running

go to http://localhost:8000/docs on a browser to see and test api endpoints

# Technologies
### Frontend (React + Bootstrap + SCSS)
The frontend is developed using React to communicate with the backend 
module. React will enable the frontend to trigger HTTP requests to specific endpoints exposed by the backend’s RESTful APIs, facilitating efficient data retrieval and UI updates. This includes data related to proximity, value, policy/legal considerations, and other housing construction parameters.  

### Backend (Master Microservice)
The master microservice includes seamless integration with both gRPC and RESTful APIs, ensuring that microservices written in Python can effectively communicate using these protocols. In the microservices architecture of the HCMS, each microservice is implemented to communicate efficiently with others, employing a dual communication mechanism consisting of gRPC and REST APIs. 

### Database (Firebase) 
Each microservice will manage its own data via CSV, however project information will be stored on Firebase by the master microservice. This will make CRUD operations as efficient as possible since it will require the least amount of data consistency and integrity management

# Architecture
Microservices architecture
	The microservices within HCMS seamlessly communicate with each other using gRPC. gRPC facilitates efficient and high-performance communication. This approach ensures a flexible and responsive backend that can adapt to the evolving needs of housing construction projects.

Client-Server architecture
  The frontend module acts as a client for the backend module, establishing a client-server relationship. This interaction is facilitated through a combination of Remote Procedure Call (RPC) and Representational State Transfer (RESTful) APIs. The frontend, developed using React, initiates communication with the backend master microservice. Through RPC, the modules engage in direct and efficient interactions, while RESTful APIs serve as a standardized communication protocol, enabling seamless data exchange and supporting various functionalities between the frontend and backend components. 


# Preview
## End points
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/3d4b6b1b-be1f-4a41-a55a-f58b3510cb1d)

## Starting Page
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/9e9fb27b-82ea-459a-ab2e-ec848dcd6ae3)

## Project Home Page
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/33d4b218-cbec-4b52-96bd-9d302c5bbbca)

## Tasks Tab
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/2d9c6406-705d-4681-a352-70fd25594c27)

## Stakeholds Tab
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/90b3d2ee-1647-4a89-ae9c-d202cae22ebd)

## Posts Tab
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/c705ed00-128c-4a0f-a7b8-d7dac7581a67)

## Location Ranker Tab
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/0a87f7d8-2db3-4a2d-989f-6773f9a3c022)


# Final Report PDF
[FINAL REPORT_ COE892_Group25.pdf](https://github.com/mohassy/Housing-Contruction-Managment-System/files/15225560/FINAL.REPORT_.COE892_Group25.pdf)

