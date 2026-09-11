# Housing Construction Management System (HCMS)

A microservices-based platform for managing housing construction projects and ranking candidate build locations. A FastAPI gateway handles project/task/stakeholder/post management backed by Firebase, while three independent Python gRPC services score locations on environmental value, commute proximity, and legal/zoning access — the gateway fans a ranking request out to all three, merges the results, and returns a filtered, sorted list of viable locations. A React + TypeScript frontend consumes the gateway over REST.

## Architecture

```
                        ┌─────────────────────────┐
                        │   React/TS Frontend      │
                        │   (hcms_frontend)         │
                        └────────────┬─────────────┘
                                     │ REST (fetch/JSON)
                                     ▼
                        ┌─────────────────────────┐
                        │  Master Microservice      │
                        │  FastAPI gateway           │
                        │  (master-microservice)     │
                        │                            │
                        │  /project /task            │
                        │  /stakeholder /post  ──────┼───▶ Firebase / Firestore
                        │  /rank                     │      (project data)
                        └──────┬──────┬──────┬───────┘
                                │      │      │  gRPC (protobuf)
                    ┌───────────┘      │      └───────────┐
                    ▼                  ▼                  ▼
          ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────────┐
          │ value-microservice│ │ proximity-        │ │ legalMicroservice     │
          │ :50051             │ │ microservice :50053│ │ :50052                │
          │                    │ │                    │ │                       │
          │ environment/walk   │ │ commute/drive-time │ │ zoning & access-type  │
          │ scoring per        │ │ scoring per        │ │ lookup (CSV-backed)   │
          │ location (CSV)     │ │ location (CSV)     │ │                       │
          └──────────────────┘ └──────────────────┘ └──────────────────────┘
```

The gateway's `POST /rank` endpoint is the interesting piece: given a list of candidate locations, it opens three separate gRPC channels (one per microservice, each generated from its own `.proto` contract), collects an environment/walkability ranking from `value-microservice`, a commute/drive ranking from `proximity-microservice`, and a legal-access whitelist from `legalMicroservice`, combines the two numeric rankings, sorts them, and strips out any location the legal service didn't clear. The frontend never talks to the three scoring services directly — only the gateway does.

## Services

**master-microservice** — the API gateway and system of record. A FastAPI app exposing REST routers for `project`, `task`, `stakeholder`, and `post` resources, all persisted to Firebase/Firestore through a `Service` → `ProjectCrud` layer. It also owns the `/rank` orchestration endpoint described above, acting as a gRPC client to the three downstream services.

**value-microservice** — a standalone gRPC server (port 50051) that scores a set of locations on environmental quality and walkability, sourced from a local CSV (`valuems.csv`) and blended by a tunable bias factor. Exposes `getEnv`, `getWalk`, and `getBoth` RPCs defined in `valueMS.proto`.

**proximity-microservice** — a standalone gRPC server (port 50053) that scores locations on commute time and drive time, sourced from `proxCSVData.csv`. Exposes `getCommute`, `getDrive`, and `getCommDrive` RPCs defined in `proximityMicroservice.proto`.

**legalMicroservice** — a standalone gRPC server (port 50052) that checks which candidate locations have "common" (i.e. legally buildable/accessible) zoning status against `LegalMS_data.csv`, and can list all currently available locations. Exposes `getLocations` and `availableLocations` RPCs defined in `legalMicroservice.proto`.

**hcms_frontend** — a React 18 + TypeScript single-page app (Vite, React Router, React-Bootstrap/MDB, MUI) with a dashboard for managing a project's tasks, stakeholders, and posts, plus a Location Ranker view that lets a user queue up to five candidate locations and submit them to the gateway's `/rank` endpoint.

## Tech Stack

| Area | Stack |
|---|---|
| Gateway | Python, FastAPI, Uvicorn, Pydantic, gRPC client |
| Scoring services | Python, gRPC (`grpcio`), Protocol Buffers, pandas (CSV-backed data) |
| Persistence | Firebase / Firestore (project data), CSV (per-service reference data) |
| Frontend | React 18, TypeScript, Vite, React Router, React-Bootstrap, MUI, SCSS |
| Inter-service comms | gRPC (protobuf contracts per service) between gateway and scoring services; REST/JSON between frontend and gateway |

## Getting Started

Each service runs independently. Start the three gRPC scoring services first, then the gateway, then the frontend.

### 1. value-microservice (port 50051)
```
cd value-microservice
pip install grpcio grpcio-tools pandas
python main.py
```

### 2. legalMicroservice (port 50052)
```
cd legalMicroservice
pip install grpcio grpcio-tools
python LegalMS_grpc.py
```

### 3. proximity-microservice (port 50053)
```
cd proximity-microservice
pip install grpcio grpcio-tools pandas python-dotenv requests
python main.py
```

### 4. master-microservice (gateway, port 8000)
```
cd master-microservice
python -m venv myenv
source myenv/bin/activate   # or myenv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py
```
This requires a Firebase service account key referenced from `app/services/Service.py` and a `.env` file at `master-microservice/app/config/.env`. Once running, interactive API docs are available at `http://localhost:8000/docs`.

### 5. hcms_frontend
```
cd hcms_frontend
npm install
npm run dev
```
The frontend expects the gateway at `http://localhost:8000`.

## Key Features

- **Multi-service location ranking** — a single gateway endpoint fans out to three independently deployable gRPC services and merges environmental, commute, and legal-access signals into one ranked, filtered result.
- **Protobuf-defined service contracts** — each downstream service ships its own `.proto` file and generated stubs, so the gateway and services can evolve independently as long as the contract holds.
- **Project management API** — full CRUD for projects, tasks, stakeholders, and posts, with budget and status tracking, backed by Firestore.
- **Decoupled frontend** — the React app only ever talks REST to the gateway; it has no knowledge of the gRPC services behind it.

## Preview

### Endpoints
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/3d4b6b1b-be1f-4a41-a55a-f58b3510cb1d)

### Starting Page
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/9e9fb27b-82ea-459a-ab2e-ec848dcd6ae3)

### Project Home Page
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/33d4b218-cbec-4b52-96bd-9d302c5bbbca)

### Tasks Tab
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/2d9c6406-705d-4681-a352-70fd25594c27)

### Stakeholders Tab
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/90b3d2ee-1647-4a89-ae9c-d202cae22ebd)

### Posts Tab
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/c705ed00-128c-4a0f-a7b8-d7dac7581a67)

### Location Ranker Tab
![image](https://github.com/mohassy/Housing-Contruction-Managment-System/assets/118586460/0a87f7d8-2db3-4a2d-989f-6773f9a3c022)

## Final Report

[FINAL REPORT_ COE892_Group25.pdf](https://github.com/mohassy/Housing-Contruction-Managment-System/files/15225560/FINAL.REPORT_.COE892_Group25.pdf)
