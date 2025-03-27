# Job Recommendation System 🚀

This is a **Job Recommendation System** built with **Node.js** and **Express.js**, leveraging **MongoDB** for data storage and resumes are stored on AWS S3 bucket. 
AWS for deployment-> AWS EC2 for NodeJs (backend) server.  It uses *machine learning* NLP to extract skills from resumes and recommend relevant jobs.
Perosnal job recommendation system.

## 🌟 Features
- **User Authentication:** JWT-based authentication
- **ReactJs**: Vite react used with tailwind to craft the simple UI and frontend part.
- **Resume Parsing:** Extracts skills using an NLP ML model
- **Flask ML API** : Flask app is built as ML API. It accept the user id and connected with mongo find
  out the user take resume link of s3 bucket and then NLP works to extract data and match Jobs and return json
  formatted job[job id, job title, score] on basis of similarity.  
- **Job Recommendation:** Matches skills with job listings from public APIs. Already stored in MongoDB.
- **AWS S3 Integration:** Stores resumes securely and are publically accessible (used in Flask API).  

## 📂 Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** ReactJs, Tailwind 
- **Machine Learning:** NLP-based skill extraction, spacy
- **Flask App** : Python
- **Deployment:** AWS EC2 t2micro AWS machine.
- **File Storage:** AWS S3

## 🚀 Deployment
This project is deployed on an **AWS EC2 instance**.

### 🔧 Setup Locally
1. Clone the repo:
   ```bash
   git clone https://github.com/daksh931/FullSatck_ML_Job_Resume.git
   cd FullSatck_ML_Job_Resume
2. setup env variables see from .env.local example which env are required in both fronend and backend folder seperately.
3. Run
   - cd backend -
     npm run dev
   - cd frontend -
     npm run dev

For production have to transpile ts code to js -> tsc 
then deploy.
Have to use seperate servers for frontend and backend.
Finally FLASK API on different server --> refer to repo -> https://github.com/daksh931/JobForceMLModel.git 


You can use credentials to login 
email - user@gmail.com
password - user123


You can use the app freely...  
NOTE -
-> Please use signup before uploading your resume, sign up a proper email (eg- user@gmail.com) , proper name atleast of 6 chars long
   and password also atleast 6 chars long. 
-> Render provides very low infrastructure freely and machine running deployed code over it went down when not in use for a while.
       So pe patient and wait while ML model perfoming its task of recommending the jobs.  
-> I sliced the no of jobs to recommend to 12 because of low infrastructure as above this render ran out of memory.
